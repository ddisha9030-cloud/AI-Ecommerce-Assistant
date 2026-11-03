
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity


def collaborative_recommendations(interactions, products, user_id):

    if not interactions or not products:
        return []

    weights = {
        "view": 1,
        "cart": 3,
        "purchase": 5
    }

    records = []

    for interaction in interactions:
        weight = weights.get(interaction.interaction_type, 0)

        if weight > 0:
            records.append({
                "user_id": interaction.user_id,
                "product_id": interaction.product_id,
                "weight": weight
            })

    if not records:
        return []

    df = pd.DataFrame(records)

    user_item_matrix = df.pivot_table(
        index="user_id",
        columns="product_id",
        values="weight",
        aggfunc="sum",
        fill_value=0
    )

    if user_id not in user_item_matrix.index:
        return []

    if len(user_item_matrix) < 2:
        return []

    similarity = cosine_similarity(user_item_matrix)

    similarity_df = pd.DataFrame(
        similarity,
        index=user_item_matrix.index,
        columns=user_item_matrix.index
    )

    similar_users = similarity_df[user_id].drop(user_id)

    # Select interaction data of similar users
    similar_user_interactions = user_item_matrix.loc[
        similar_users.index
    ]

    # Calculate recommendation scores
    scores = similar_user_interactions.T.dot(similar_users)

    # Remove products already interacted with by the current user
    user_products = user_item_matrix.loc[user_id]
    scores = scores.drop(
        labels=user_products[user_products > 0].index,
        errors="ignore"
    )

    scores = scores.sort_values(ascending=False)

    product_lookup = {
        product.product_id: product
        for product in products
    }

    recommendations = []

    for product_id, score in scores.items():
        if score > 0 and product_id in product_lookup:
            recommendations.append(product_lookup[product_id])

        if len(recommendations) == 5:
            break

    return recommendations
