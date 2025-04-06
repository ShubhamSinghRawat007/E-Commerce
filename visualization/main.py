from typing import Union
from dotenv import load_dotenv
from fastapi import FastAPI, requests, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pathlib import Path
import os
import jwt
from database import get_client
from visualization import Visualize
import base64
from bson import ObjectId
import pandas as pd

get_graph = Visualize()

env_path = Path(__file__).resolve().parent.parent / "backend" / ".env"
load_dotenv(dotenv_path=env_path)
conn = get_client(os.getenv("MONGODB_URI"))

# os.getenv("SECRET_KEY")
app = FastAPI()

# Allow requests from your frontend running on port 5174
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5174", "http://localhost:5174"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.post("/visualize")
def visualize(request: requests.Request, data: dict):
    # token authentication process
    token = request.headers.get("Authorization")

    if not token or not token.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token missing or invalid")
    
    token = token.split(" ")[1]
    try:
        token_decode = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms= [os.getenv("JWT_ALGORITHM")])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception:
        raise HTTPException(status_code=401, detail="Not Authorized")

    data = {"_id": ObjectId(data["_id"])}# convert the id to ObjectId
    
    match(conn.test.charts.find_one(data)['name']):
        case "Order Status":
            statuses = conn.test.orders.distinct("status")
            values = []
            for status in statuses:
                values.append(conn.test.orders.count_documents({"status": status}))
            graph = get_graph.generate_order_status_graph(statuses, values)

            graph.seek(0)

            # Extract bytes
            img_bytes = graph.getvalue()

            # Convert to Base64 string
            img_base64 = base64.b64encode(img_bytes).decode("utf-8")

            return JSONResponse(content={"success": True, "message": "loading", "image": img_base64, "data": {"statuses": statuses, "values": values}})
        case "Geographical Distribution":

            states = conn.test.orders.aggregate([
                {"$group": {
                    "_id": {"$toLower":"$address.state"},
                    "totalOrders": {"$sum": 1}
                }},
                {"$project": {
                    "_id": 0,
                    "state": "$_id",
                    "totalOrders": 1
                }}
            ])

            states = pd.DataFrame(states.to_list())

            values = states["totalOrders"]
            states = states["state"]

            graph = get_graph.generate_state_order_distribution_graph(states, values)

            graph.seek(0)

            img_bytes = graph.getvalue()

            img_base64 = base64.b64encode(img_bytes).decode("utf-8")

            return JSONResponse(content={"success": True, "message": "loading", "image": img_base64, "data": {"states": states.to_list(), "count": values.to_list()}})
        
        case "Revenue Over Time":

            revenue = conn.test.orders.aggregate([
                {"$group": {
                    "_id": "$date",
                    "totalRevenue": {"$sum": "$ammount"}
                }},
                {"$addFields": {
                    "date": {"$toDate": "$_id"}
                }},
                {"$sort": {
                    "date": 1
                }},
                {"$project": {
                    "date": {"$dateToString": {"format": "%Y-%m-%d", "date": "$date"}},
                    "totalRevenue": 1
                }}
                ])

            revenue = pd.DataFrame(revenue.to_list())
            dates = revenue["date"]
            total = revenue["totalRevenue"]
            
            print(dates, total)
            graph = get_graph.generate_revenue_overtime_graph(dates, total)

            graph.seek(0)

            img_bytes = graph.getvalue()

            img_base64 = base64.b64encode(img_bytes).decode("utf-8")

            return JSONResponse(content={"success": True, "message": "loading", "image": img_base64, "data": {"dates": list(dates), "revenue": list(total)}})
        
        case _:
            return {"success": False, "message": "Invalid Visualization Type"+"-"+conn.test.charts.find_one(data)['name']}
        
@app.post("/addchart")
def add_chart(request: requests.Request, data: dict):
    conn.test.charts.insert_one(data)
    return {"success": True, "message": "Chart added successfully"}

@app.delete("/deletechart")
def delete_chart(request: requests.Request, data: dict):
    conn.test.charts.delete_one(data)
    return {"success": True, "message": "Chart deleted successfully"}

