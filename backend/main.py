from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "ShopAI backend is running"
    }


@app.post("/api/assistant")
def assistant(request: dict):
    user_query = request.get("query", "")

    return {
        "message": f"Backend received: {user_query}"
    }