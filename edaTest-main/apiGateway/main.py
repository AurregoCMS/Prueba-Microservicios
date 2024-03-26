from fastapi import FastAPI, HTTPException
import httpx

app = FastAPI()

CLIENTS_SERVICE_URL = "http://clients:3001"
BILLS_SERVICE_URL = "http://bills:3002"
ORDERS_SERVICE_URL = "http://orders:3003"

http_client = httpx.Client()

@app.get("/api/clients")
async def get_clients():
    try:
        response = http_client.get(f"{CLIENTS_SERVICE_URL}/clients")
        response.raise_for_status()
        return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=str(e))

@app.get("/api/bills/{client_id}")
async def get_bills(client_id: int):
    try:
        response = http_client.get(f"{BILLS_SERVICE_URL}/bills/{client_id}")
        response.raise_for_status()
        return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=str(e))

@app.post("/api/orders")
async def create_order(pedido: dict):
    try:
        response = http_client.post(f"{ORDERS_SERVICE_URL}/orders", json=pedido)
        response.raise_for_status()
        return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=str(e))