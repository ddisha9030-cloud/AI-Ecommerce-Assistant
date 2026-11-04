import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def recommend_products(products, query):
    if not products or not query.strip():
        return []

    product_descriptions = []

    for product in products: 
        description = " ".join([
            product.name or "",
            product.brand or "",
            product.category or "",
            product.description or "",
            product.ingredients or ""
        ])

        product_descriptions.append(description)

    vectorizer = TfidfVectorizer(stop_words="english")

    product_vectors = vectorizer.fit_transform(
        product_descriptions
    )

    query_vector = vectorizer.transform([query])

    similarity_scores = cosine_similarity(
        query_vector,
        product_vectors
    ).flatten()

    ranked_indices = similarity_scores.argsort()[::-1]

    recommendations = []

    for index in ranked_indices:
        if similarity_scores[index] > 0:
            recommendations.append(products[index])

        if len(recommendations) == 5:
            break

    return recommendations



def personalized_recommendations(products, interactions, user_id):

    if not products or not interactions:
        return []

    weights = {
        "view": 1,
        "cart": 3,
        "purchase": 5
    }

    product_lookup = {
        product.product_id: product
        for product in products
    }

    user_preferences = {}

    for interaction in interactions:

        if interaction.user_id != user_id:
            continue

        weight = weights.get(interaction.interaction_type, 0)

        if weight <= 0:
            continue

        if interaction.product_id in product_lookup:
            user_preferences[interaction.product_id] = (
                user_preferences.get(interaction.product_id, 0) + weight
            )

    if not user_preferences:
        return []

    product_descriptions = []

    for product in products:
        description = " ".join([
            product.name or "",
            product.brand or "",
            product.category or "",
            product.description or "",
            product.ingredients or ""
        ])

        product_descriptions.append(description)

    vectorizer = TfidfVectorizer(stop_words="english")

    product_vectors = vectorizer.fit_transform(product_descriptions)

    product_indices = {
        product.product_id: index
        for index, product in enumerate(products)
    }

    preference_indices = [
        product_indices[product_id]
        for product_id in user_preferences
    ]

    preference_weights = np.array([
        user_preferences[product_id]
        for product_id in user_preferences
    ])

    preference_vectors = product_vectors[preference_indices]

    user_profile = preference_vectors.multiply(
        preference_weights.reshape(-1, 1)
    ).sum(axis=0) / preference_weights.sum()

    user_profile = np.asarray(user_profile)

    candidate_indices = [
        index
        for index, product in enumerate(products)
        if product.product_id not in user_preferences
    ]

    if not candidate_indices:
        return []

    candidate_vectors = product_vectors[candidate_indices]

    similarity_scores = cosine_similarity(
        user_profile,
        candidate_vectors
    ).flatten()

    ranked_indices = similarity_scores.argsort()[::-1]

    recommendations = []

    for index in ranked_indices:

        if similarity_scores[index] > 0:
            recommendations.append(products[candidate_indices[index]])

        if len(recommendations) == 5:
            break

    return recommendations
