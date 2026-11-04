
import random

from database import SessionLocal
from models import Product, UserInteraction


random.seed(42)

# Different shopping preferences for different users
user_preferences = {
    "user_001": ["Fitness", "Food"],
    "user_002": ["Fitness", "Food"],
    "user_003": ["Electronics", "Home"],
    "user_004": ["Electronics", "Home"],
    "user_005": ["Skincare", "Fashion"],
    "user_006": ["Skincare", "Fashion"],
    "user_007": ["Fitness", "Electronics"],
    "user_008": ["Food", "Home"],
    "user_009": ["Fashion", "Gifts"],
    "user_010": ["Fashion", "Gifts"],
    "user_011": ["Fitness", "Food"],
    "user_012": ["Electronics", "Home"],
    "user_013": ["Skincare", "Fashion"],
    "user_014": ["Fitness", "Electronics"],
    "user_015": ["Food", "Gifts"],
    "user_016": ["Home", "Fashion"],
    "user_017": ["Skincare", "Gifts"],
    "user_018": ["Fitness", "Home"],
    "user_019": ["Electronics", "Fashion"],
    "user_020": ["Food", "Skincare"]
}

db = SessionLocal()

try:
    products = db.query(Product).all()

    category_products = {}

    for product in products:
        category_products.setdefault(
            product.category, []
        ).append(product)

    interactions_added = 0
    interactions_skipped = 0

    for user_id, preferences in user_preferences.items():

        preferred_products = []

        for category in preferences:
            preferred_products.extend(
                category_products.get(category, [])
            )

        # Each user interacts with 4 different preferred products
        selected_products = random.sample(
            preferred_products,
            min(4, len(preferred_products))
        )

        for product in selected_products:

            interaction_type = random.choices(
                ["view", "cart", "purchase"],
                weights=[0.50, 0.30, 0.20]
            )[0]

            existing = db.query(UserInteraction).filter(
                UserInteraction.user_id == user_id,
                UserInteraction.product_id == product.product_id,
                UserInteraction.interaction_type == interaction_type
            ).first()

            if existing:
                interactions_skipped += 1
                continue

            interaction = UserInteraction(
                user_id=user_id,
                product_id=product.product_id,
                interaction_type=interaction_type
            )

            db.add(interaction)
            interactions_added += 1

    db.commit()

    print("Interaction seeding completed!")
    print("Users processed:", len(user_preferences))
    print("Interactions added:", interactions_added)
    print("Interactions skipped:", interactions_skipped)

except Exception as error:
    db.rollback()
    print("Error:", error)

finally:
    db.close()
