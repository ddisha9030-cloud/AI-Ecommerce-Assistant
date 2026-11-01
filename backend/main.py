from recommendation_engine import recommend_products
from schemas import ProductCreate, ProductUpdate
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Product

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


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


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


@app.get("/api/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()

    return [
        {
            "product_id": product.product_id,
            "name": product.name,
            "brand": product.brand,
            "category": product.category,
            "price": product.price,
            "description": product.description,
            "stock": product.stock,
            "ingredients": product.ingredients,
            "allergens": product.allergens
        }
        for product in products
    ]

@app.post("/api/products")
def add_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    new_product = Product(**product.model_dump())

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return {
        "message": "Product added successfully",
        "product_id": new_product.product_id,
        "name": new_product.name,
        "price": new_product.price
    }

@app.put("/api/products/{product_id}")
def update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db)
):
    existing_product = db.query(Product).filter(
        Product.product_id == product_id
    ).first()

    if not existing_product:
        return {"message": "Product not found"}

    update_data = product.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(existing_product, key, value)

    db.commit()
    db.refresh(existing_product)

    return {
        "message": "Product updated successfully",
        "product_id": existing_product.product_id
    }


@app.delete("/api/products/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.product_id == product_id
    ).first()

    if not product:
        return {"message": "Product not found"}

    db.delete(product)
    db.commit()

    return {"message": "Product deleted successfully"}

@app.post("/api/recommend")
def get_recommendations(
    request: dict,
    db: Session = Depends(get_db)
):
    user_query = request.get("query", "")

    products = db.query(Product).all()

    recommended = recommend_products(products, user_query)

    return [
        {
            "product_id": product.product_id,
            "name": product.name,
            "brand": product.brand,
            "category": product.category,
            "price": product.price,
            "description": product.description,
            "allergens": product.allergens
        }
        for product in recommended
    ]


@app.post("/api/check-allergens")
def check_allergens(request: dict, db: Session = Depends(get_db)):
    avoided_allergens = request.get("allergens", [])

    products = db.query(Product).all()
    results = []

    for product in products:
        product_allergens = (product.allergens or "").lower()
        ingredients = (product.ingredients or "").lower()

        matched = [
            allergen for allergen in avoided_allergens
            if allergen.lower() in product_allergens
            or allergen.lower() in ingredients
        ]

        results.append({
            "product_id": product.product_id,
            "name": product.name,
            "warning": len(matched) > 0,
            "matched_allergens": matched,
            "message": (
                "Potential allergen match found."
                if matched
                else "No matching allergen was found in the listed information."
            )
        })

    return results
