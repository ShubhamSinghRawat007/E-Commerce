import random
import time
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from pathlib import Path
from database import get_client
from faker import Faker

# Connect to MongoDB

env_path = Path(__file__).resolve().parent.parent / "backend" / ".env"
load_dotenv(dotenv_path=env_path)
db = get_client(os.getenv("MONGODB_URI"))


# Collections
user_collection = db.test.users
order_collection = db.test.orders
product_collection = db.test.products

# States and UTs of India
indian_states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
    "Ladakh", "Lakshadweep", "Puducherry"
]

fake = Faker()

def current_time_ms():
    return int(time.time() * 1000)

def generate_users_and_orders(user_count=50):
    products = list(product_collection.find({}, {"_id": 1}))
    if not products:
        print("No products found in the product collection. Add products first.")
        return

    for i in range(user_count):
        state = indian_states[i % len(indian_states)]
        user = {
            "name": fake.name(),
            "email": fake.unique.email(),
            "password": fake.password(),
            "cartData": {},
        }
        user_id = user_collection.insert_one(user).inserted_id

        # Create 1–3 orders per user
        for _ in range(random.randint(1, 3)):
            selected_products = random.sample(products, random.randint(1, 4))
            items = [{"productId": str(p["_id"]), "quantity": random.randint(1, 5)} for p in selected_products]
            amount = sum(item["quantity"] * random.randint(100, 2000) for item in items)

            order = {
                "userId": str(user_id),
                "items": items,
                "ammount": amount,
                "address": {
                    "street": fake.street_address(),
                    "city": fake.city(),
                    "state": state,
                    "country": "India",
                    "postalCode": fake.postcode()
                },
                "status": random.choice(["Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"]),
                "paymentMethod": random.choice(["COD", "UPI", "NetBanking", "Card"]),
                "payment": random.choice([True, False]),
                "date": current_time_ms() - random.randint(0, 30 * 24 * 60 * 60 * 1000)  # Past 30 days
            }
            order_collection.insert_one(order)

    print(f"Inserted {user_count} users and their orders.")

# Run the generator
generate_users_and_orders(user_count=50)
