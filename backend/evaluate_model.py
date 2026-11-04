
from recommendation_engine import recommend_products
from collaborative_engine import collaborative_recommendations
from database import SessionLocal
from models import Product, UserInteraction
from hybrid_engine import hybrid_recommendations


db = SessionLocal()

try:
    products = db.query(Product).all()
    interactions = db.query(UserInteraction).all()

    test_users = [
        f"user_{i:03d}"
        for i in range(1, 21)
    ]

    training_interactions = []
    test_interactions = {}

    # Split training and testing data
    for user_id in test_users:
        user_history = sorted(
            [item for item in interactions if item.user_id == user_id],
            key=lambda item: item.created_at
        )

        if len(user_history) < 2:
            continue

        test_product_id = user_history[-1].product_id
        test_interactions[user_id] = test_product_id

        training_interactions.extend(
            item for item in user_history
            if item.product_id != test_product_id
        )

    k = 3

    model_functions = {
        "Content-Based": lambda user_id, query: recommend_products(
            products, query
        ),

        "Collaborative": lambda user_id, query: collaborative_recommendations(
            training_interactions, products, user_id
        ),

        "Hybrid 70:30": lambda user_id, query: hybrid_recommendations(
            products, training_interactions, user_id, query,
            content_weight=0.7,
            collaborative_weight=0.3
        ),

        "Hybrid 80:20": lambda user_id, query: hybrid_recommendations(
            products, training_interactions, user_id, query,
            content_weight=0.8,
            collaborative_weight=0.2
        ),

        "Hybrid 90:10": lambda user_id, query: hybrid_recommendations(
            products, training_interactions, user_id, query,
            content_weight=0.9,
            collaborative_weight=0.1
        ),

        "Hybrid 100:0": lambda user_id, query: hybrid_recommendations(
            products, training_interactions, user_id, query,
            content_weight=1.0,
            collaborative_weight=0.0
        )
    }

    results = {
        model_name: {"hits": 0, "relevant": 0}
        for model_name in model_functions
    }

    # Evaluate each user
    for user_id, actual_product in test_interactions.items():

        user_product_ids = {
            item.product_id
            for item in training_interactions
            if item.user_id == user_id
        }

        user_categories = list(set(
            product.category
            for product in products
            if product.product_id in user_product_ids
        ))

        query = " ".join(user_categories) or "popular products"

        print("\nUser:", user_id)
        print("Training categories:", user_categories)
        print("Search query:", query)
        print("Actual product:", actual_product)

        for model_name, model_function in model_functions.items():

            recommendations = model_function(user_id, query)

            # Exclude products already seen during training
            recommendations = [
                product for product in recommendations
                if product.product_id not in user_product_ids
            ]

            top_recommendations = recommendations[:k]

            recommended_ids = [
                product.product_id for product in top_recommendations
            ]

            hits = int(actual_product in recommended_ids)

            results[model_name]["hits"] += hits
            results[model_name]["relevant"] += 1

            print(model_name, "recommendations:", recommended_ids)
            print("Hit:", hits)

    # Calculate evaluation metrics
    evaluated_users = len(test_interactions)

    print("\nMODEL COMPARISON")
    print("=" * 50)
    print("Evaluated users:", evaluated_users)

    for model_name, metrics in results.items():

        hits = metrics["hits"]
        relevant = metrics["relevant"]

        # Fixed number of recommendation slots
        precision = (
            hits / (evaluated_users * k)
            if evaluated_users else 0
        )

        recall = hits / relevant if relevant else 0

        f1 = (
            2 * precision * recall / (precision + recall)
            if precision + recall else 0
        )

        print("\n", model_name)
        print("Hits:", hits)
        print("Precision@3:", round(precision, 3))
        print("Recall@3:", round(recall, 3))
        print("F1@3:", round(f1, 3))

finally:
    db.close()
