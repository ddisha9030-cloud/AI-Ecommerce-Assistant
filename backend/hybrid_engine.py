
from recommendation_engine import recommend_products
from collaborative_engine import collaborative_recommendations


def hybrid_recommendations(products, interactions, user_id, query):

    content_results = recommend_products(products, query)

    collaborative_results = collaborative_recommendations(
        interactions,
        products,
        user_id
    )

    scores = {}

    # Content-based ranking: 70%
    for rank, product in enumerate(content_results):
        scores[product.product_id] = (
            scores.get(product.product_id, 0) + 0.7 / (rank + 1)
        )

    # Collaborative ranking: 30%
    for rank, product in enumerate(collaborative_results):
        scores[product.product_id] = (
            scores.get(product.product_id, 0) + 0.3 / (rank + 1)
        )

    product_lookup = {
        product.product_id: product
        for product in products
    }

    ranked_ids = sorted(
        scores,
        key=lambda product_id: scores[product_id],
        reverse=True
    )

    return [
        product_lookup[product_id]
        for product_id in ranked_ids[:5]
        if product_id in product_lookup
    ]
