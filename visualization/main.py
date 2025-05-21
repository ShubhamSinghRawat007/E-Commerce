from typing import Union
from dotenv import load_dotenv
from fastapi import FastAPI, requests, HTTPException, Depends
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
from bson.objectid import ObjectId
from authentication import verify_token

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
def visualize(data: dict, user_data: dict = Depends(verify_token)):
    """
    Visualize the data based on the type of chart requested.
    """

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
            
            graph = get_graph.generate_revenue_overtime_graph(dates, total)

            graph.seek(0)

            img_bytes = graph.getvalue()

            img_base64 = base64.b64encode(img_bytes).decode("utf-8")

            return JSONResponse(content={"success": True, "message": "loading", "image": img_base64, "data": {"dates": list(dates), "revenue": list(total)}})
        
        case "Payment Method Breakdown":

            payment_methods = conn.test.orders.aggregate([
                {"$group": {
                    "_id": "$paymentMethod",
                    "totalOrders": {"$sum": 1}
                }},
                {"$project": {
                    "_id": 0,
                    "payment_method": "$_id",
                    "totalOrders": 1
                }}
            ])

            payment_methods = pd.DataFrame(payment_methods.to_list())

            print(payment_methods)
            values = payment_methods["totalOrders"]
            payment_methods = payment_methods["payment_method"]


            graph = get_graph.payment_method_breakdown_graph(payment_methods, values)
            graph.seek(0)
            
            img_bytes = graph.getvalue()
            img_base64 =  base64.b64encode(img_bytes).decode("utf-8")

            return JSONResponse(content={"success": True, "message": "loading", "image": img_base64, "data": {"payment_method": list(payment_methods), "count": list(values)}})

        case _:
            return {"success": False, "message": "Invalid Visualization Type"+"-"+conn.test.charts.find_one(data)['name']}

@app.post("/insights")
def insights(data: dict, user_data: dict = Depends(verify_token)):

    total_revenue = conn.test.orders.aggregate([
        {"$group": {
            "_id": None,
            "totalRevenue": {"$sum": "$ammount"}
        }}
    ])
    total_revenue = list(total_revenue)[0]["totalRevenue"] if total_revenue else 0

    total_orders = conn.test.orders.count_documents({})
    total_orders = total_orders if total_orders else 0

    total_users = conn.test.users.count_documents({})
    total_users = total_users if total_users else 0

    avg_order_value = total_revenue/total_orders if total_orders > 0 else 0
    avg_order_value = round(avg_order_value, 2)

    repert_customers = conn.test.orders.aggregate([
        {"$group": {
            "_id": "$userId",
            "totalOrders": {"$sum": 1}
        }},
        {"$match": {
            "totalOrders": {"$gt": 1}
        }}
    ])
    repert_customers = len(list(repert_customers))

    pending_orders = conn.test.orders.count_documents({"status": "Order Placed"})
    pending_orders = pending_orders if pending_orders else 0

    data_insights = [{"emoji_decimal": "💸", "title": "Total Revenue", "value": f"$ {total_revenue}"},
                     {"emoji_decimal": "📦", "title": "Total Orders", "value": total_orders},
                     {"emoji_decimal": "🦸‍♂️", "title": "Total Users", "value": total_users},
                     {"emoji_decimal": "🛒", "title": "Average Order Value", "value": f"$ {avg_order_value}"},
                     {"emoji_decimal": "🔁", "title": "Repetitive Customers", "value": repert_customers},{"emoji_decimal": "🚚", "title": "Pending Orders", "value": pending_orders}
    ]

    return {"success": True, "insights":data_insights, "message": "Insights loaded successfully"}

@app.post("/insights-data")
def insights_data(data: dict, user_data: dict = Depends(verify_token)):
    
    data = {"_id": ObjectId(data["_id"])}

    def convertId_tostr(x: dict) -> dict:
                if "_id" in x:
                    x["_id"] = str(x["_id"])
                return x
    
    match(conn.test.insights.find_one(data)['name']):
        case "Top Selling Products":
            products = conn.test.orders.aggregate([
                {"$unwind": "$items"},
                {"$group": {
                    "_id": "$items._id",
                    "productName": {"$first": "$items.name"},
                    "productImage": {"$first": "$items.image"},
                    "productCategory": {"$first": "$items.category"},
                    "productPrice": {"$first": "$items.price"},
                    "productSubCategory": {"$first": "$items.subCategory"},
                    "isBestSeller": {"$first": "$items.bestSeller"},
                    "productDescription": {"$first": "$items.description"},
                    "totalSold": {"$sum": "$items.quantity"},
                    "totalRevenue": {"$sum": {"$multiply": ["$items.price", "$items.quantity"]}}
                }},
                {
                    "$project": {
                        "_id": 0
                    }
                },
                {"$sort": {
                    "totalSold": -1
                }}
            ])

            products = pd.DataFrame(products.to_list())

            return JSONResponse(content={"success": True, "message": "loading", "data": products.to_dict(orient="records")})
        
        case "Top Payment Methods":
            payment_methods = conn.test.orders.aggregate([
                {"$group": {
                    "_id": "$paymentMethod",
                    "totalOrders": {"$sum": 1}
                }},
                {"$project": {
                    "_id": 0,
                    "payment_method": "$_id",
                    "totalOrders": 1
                }},
                {"$sort": {
                    "totalOrders": -1
                }}
            ])

            payment_methods = pd.DataFrame(payment_methods.to_list())
            payment_methods = payment_methods.head(10)

            return JSONResponse(content={"success": True, "message": "loading", "data": payment_methods.to_dict(orient="records")})
        
        case "Top Selling Categories":
            categories = conn.test.orders.aggregate([
                {"$unwind": "$items"},
                {"$group": {"_id": "$items.category", "totalSold": {"$sum": "$items.quantity"}}},
                {"$sort": {
                    "totalSold": -1
                }}
            ])

            categories = pd.DataFrame(categories.to_list())
            categories = categories.head(10)
            print(categories)
            return JSONResponse(content={"success": True, "message": "loading", "data": categories.to_dict(orient="records")})
        
        case "Customer Lifetime Value":
            customers = conn.test.orders.aggregate([
                {"$group": {
                    "_id": { "$toObjectId": "$userId" },
                    "totalSpent": {"$sum": "$ammount"}
                }},
                {"$lookup": {
                    "from": "users",
                    "localField": "_id",
                    "foreignField": "_id",
                    "as": "user"
                }},
                {"$unwind": "$user"},
                {"$project": {
                    "_id": 0,
                    "customerName": "$user.name",
                    "customerEmail": "$user.email",

                    "totalSpent": 1
                }},
                {"$sort": {
                    "totalSpent": -1
                }}
            ])

            customers = pd.DataFrame(customers.to_list())
            customers = customers.head(10)
            return JSONResponse(content={"success": True, "message": "loading", "data": customers.to_dict(orient="records")})
        
        case "Customer Retention Rate":
            returning_customers = conn.test.orders.aggregate([
                {"$group": {
                    "_id": "$userId",
                    "totalOrders": {"$sum": 1}
                }},
                {"$match": {
                    "totalOrders": {"$gt": 1}
                }}
            ])

            returning_customers_count = len(list(returning_customers))
            total_customers = conn.test.users.count_documents({})
            retention_rate = (returning_customers_count / total_customers) * 100 if total_customers > 0 else 0
            retention_rate = round(retention_rate, 2)
            data = {"retention_rate": f"{retention_rate}%", "total_customers": total_customers, "returning_customers": returning_customers_count}
            
            return JSONResponse(content={"success": True, "message": "loading", "data": [data]})
        
        case "_":
            return JSONResponse(content={"success": False, "message": "Invalid Type"})

@app.post("/addchart")
def add_chart(request: requests.Request, data: dict):
    conn.test.charts.insert_one(data)
    return {"success": True, "message": "Chart added successfully"}

@app.delete("/deletechart")
def delete_chart(request: requests.Request, data: dict):
    conn.test.charts.delete_one(data)
    return {"success": True, "message": "Chart deleted successfully"}

@app.post("/addinsights")
def add_insights(request: requests.Request, data: dict):
    conn.test.insights.insert_one(data)
    return {"success": True, "message": "Insights added successfully"}

@app.delete("/deleteinsights")
def delete_insights(request: requests.Request, data: dict):
    conn.test.insights.delete_one(data)
    return {"success": True, "message": "Insights deleted successfully"}