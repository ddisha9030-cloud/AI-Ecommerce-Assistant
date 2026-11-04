from database import SessionLocal
from models import Product, UserInteraction
from recommendation_engine import personalized_recommendations

db = SessionLocal()

try:
    products = db.query(Product).all()
    interactions = db.query(UserInteraction).all()

    user_id = "user_001"

    recommendations = personalized_recommendations(
        products,
        interactions,
        user_id
    )

    print("\nPersonalized recommendations for", user_id)

    for product in recommendations:
        print(
            product.product_id,
            product.name,
            "| Category:",
            product.category
        )

finally:
    db.close()