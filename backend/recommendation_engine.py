
def recommend_products(products, query):
    query = query.lower()

    keywords = {
        "protein": ["protein", "fitness", "gym", "workout"],
        "fitness": ["fitness", "gym", "exercise", "workout"],
        "food": ["food", "snack", "eat", "butter"],
        "electronics": ["electronics", "headphones", "mouse", "gadgets"],
        "gift": ["gift", "birthday", "present", "surprise"],
        "lifestyle": ["lifestyle", "daily use", "organizer"]
    }

    matched_products = []

    for product in products:
        score = 0

        product_text = " ".join([
            product.name or "",
            product.category or "",
            product.description or "",
            product.brand or ""
        ]).lower()

        if any(word in product_text for word in query.split()):
            score += 2

        for category, words in keywords.items():
            if any(word in query for word in words):
                if category in product_text:
                    score += 3

        if score > 0:
            matched_products.append((score, product))

    matched_products.sort(key=lambda item: item[0], reverse=True)

    return [product for score, product in matched_products[:5]]
