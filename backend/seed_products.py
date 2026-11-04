
from database import SessionLocal
from models import Product


products = [
    {
        "name": "Whey Protein Powder",
        "brand": "MuscleCore",
        "category": "Fitness",
        "price": 1899,
        "description": "Protein supplement for muscle recovery and fitness training.",
        "stock": 25,
        "ingredients": "Whey protein concentrate, cocoa, sweetener",
        "allergens": "Milk"
    },
    {
        "name": "Peanut Butter",
        "brand": "NutriChoice",
        "category": "Food",
        "price": 349,
        "description": "Creamy peanut butter for breakfast and protein-rich snacks.",
        "stock": 30,
        "ingredients": "Roasted peanuts, salt",
        "allergens": "Peanuts"
    },
    {
        "name": "Protein Energy Bar",
        "brand": "FitBite",
        "category": "Food",
        "price": 99,
        "description": "Convenient protein snack for workouts and daily energy.",
        "stock": 50,
        "ingredients": "Oats, soy protein, cocoa, dates",
        "allergens": "Soy"
    },
    {
        "name": "Digital Kitchen Scale",
        "brand": "HomeMeasure",
        "category": "Home",
        "price": 599,
        "description": "Digital weighing scale for measuring food portions.",
        "stock": 15,
        "ingredients": "Electronic components, stainless steel",
        "allergens": "None declared"
    },
    {
        "name": "Wireless Bluetooth Speaker",
        "brand": "SoundMax",
        "category": "Electronics",
        "price": 1499,
        "description": "Portable wireless speaker for music and entertainment.",
        "stock": 20,
        "ingredients": "Plastic casing, electronic components",
        "allergens": "None declared"
    },
    {
        "name": "Smart Fitness Band",
        "brand": "PulseFit",
        "category": "Electronics",
        "price": 2299,
        "description": "Fitness tracker for monitoring activity and daily steps.",
        "stock": 18,
        "ingredients": "Silicone strap, electronic components",
        "allergens": "None declared"
    },
    {
        "name": "Gentle Face Cleanser",
        "brand": "PureGlow",
        "category": "Skincare",
        "price": 299,
        "description": "Gentle daily facial cleanser for basic skincare routines.",
        "stock": 35,
        "ingredients": "Aqua, glycerin, mild cleansing agents",
        "allergens": "Check product label"
    },
    {
        "name": "Moisturizing Face Cream",
        "brand": "SkinNest",
        "category": "Skincare",
        "price": 449,
        "description": "Daily moisturizing cream for skin hydration.",
        "stock": 25,
        "ingredients": "Aqua, glycerin, shea butter",
        "allergens": "Check product label"
    },
    {
        "name": "Cotton Oversized T-Shirt",
        "brand": "UrbanThread",
        "category": "Fashion",
        "price": 699,
        "description": "Comfortable casual cotton t-shirt for everyday wear.",
        "stock": 20,
        "ingredients": "Cotton",
        "allergens": "None declared"
    },
    {
        "name": "Minimalist Backpack",
        "brand": "CarryCraft",
        "category": "Fashion",
        "price": 1199,
        "description": "Everyday backpack for college, travel and work.",
        "stock": 15,
        "ingredients": "Polyester fabric",
        "allergens": "None declared"
    },
    {
        "name": "Desk Organizer",
        "brand": "WorkSpace",
        "category": "Home",
        "price": 399,
        "description": "Desk organizer for stationery and workspace accessories.",
        "stock": 25,
        "ingredients": "Wood, metal",
        "allergens": "None declared"
    },
    {
        "name": "Scented Candle Gift Set",
        "brand": "AuraLiving",
        "category": "Gifts",
        "price": 799,
        "description": "Decorative scented candle set suitable for birthday gifts.",
        "stock": 12,
        "ingredients": "Soy wax, fragrance",
        "allergens": "Check product label"
    }
]


db = SessionLocal()

try:
    added = 0
    skipped = 0

    for item in products:
        existing = db.query(Product).filter(
            Product.name == item["name"]
        ).first()

        if existing:
            skipped += 1
            continue

        new_product = Product(**item)
        db.add(new_product)
        added += 1

    db.commit()

    print("Product seeding completed!")
    print("Products added:", added)
    print("Products skipped:", skipped)

except Exception as error:
    db.rollback()
    print("Error:", error)

finally:
    db.close()
