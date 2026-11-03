
from database import SessionLocal
from models import Product, UserInteraction
from hybrid_engine import hybrid_recommendations

db = SessionLocal()

try:
    products = db.query(Product).all()
    interactions = db.query(UserInteraction).all()

    test_users = ["user_001", "user_002", "user_003"]

    training_interactions = []
    test_interactions = {}

    # Split training and testing interactions
    for user_id in test_users:
        user_history = sorted(
            [
                item for item in interactions
                if item.user_id == user_id
            ],
            key=lambda item: item.created_at
        )

        if len(user_history) < 2:
            continue

        test_item = user_history[-1]
        test_interactions[user_id] = test_item.product_id

        training_interactions.extend(user_history[:-1])

    # Evaluate top 3 recommendations
    k = 3
    total_hits = 0
    total_recommended = 0
    total_relevant = 0

    for user_id, actual_product in test_interactions.items():

        user_product_ids = {
            item.product_id
            for item in training_interactions
            if item.user_id == user_id
        }

        user_categories = [
            product.category
            for product in products
            if product.product_id in user_product_ids
        ]

        query = " ".join(user_categories) or "popular products"

        recommendations = hybrid_recommendations(
            products,
            training_interactions,
            user_id,
            query
        )

        # Keep only the top K products
        top_recommendations = recommendations[:k]

        recommended_ids = {
            product.product_id
            for product in top_recommendations
        }

        hits = int(actual_product in recommended_ids)

        total_hits += hits
        total_recommended += len(top_recommendations)
        total_relevant += 1

        print("\nUser:", user_id)
        print("Actual product:", actual_product)
        print("Top 3 recommendations:", recommended_ids)
        print("Relevant hit:", hits)

    precision_at_k = (
        total_hits / total_recommended
        if total_recommended else 0
    )

    recall_at_k = (
        total_hits / total_relevant
        if total_relevant else 0
    )

    print("\nRecommendation Evaluation")
    print("-------------------------")
    print("K:", k)
    print("Test users:", total_relevant)
    print("Correct recommendations:", total_hits)
    print("Precision@3:", round(precision_at_k, 2))
    print("Recall@3:", round(recall_at_k, 2))

finally:
    db.close()
