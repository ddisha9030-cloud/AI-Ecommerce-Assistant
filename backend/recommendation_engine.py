
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

    product_vectors = vectorizer.fit_transform(product_descriptions)
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
