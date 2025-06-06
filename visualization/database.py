from pymongo import MongoClient

def get_client(uri: str) -> MongoClient:
    client = MongoClient(uri)
    return client


# client.test.charts.find_one({})