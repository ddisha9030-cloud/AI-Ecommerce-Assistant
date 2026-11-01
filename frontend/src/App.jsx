
import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import CategoryCard from "./components/CategoryCard";
import Cart from "./components/Cart";

const categories = [
  {
    id: 1,
    name: "Health & Fitness",
    description: "Protein, wellness & active lifestyle",
    color: "category-pink",
    icon: "✦",
  },
  {
    id: 2,
    name: "Electronics",
    description: "Everyday tech & smart gadgets",
    color: "category-yellow",
    icon: "◈",
  },
  {
    id: 3,
    name: "Gifts",
    description: "Find something they'll love",
    color: "category-cream",
    icon: "♡",
  },
  {
    id: 4,
    name: "Lifestyle",
    description: "Things that make life better",
    color: "category-lavender",
    icon: "✿",
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [smartRecommendations, setSmartRecommendations] = useState([]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from PostgreSQL through FastAPI
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const formattedProducts = data.map((product) => ({
          id: product.product_id,
          name: product.name,
          brand: product.brand,
          category: ["FITNESS", "FOOD"].includes(
            product.category.toUpperCase()
          )
            ? "HEALTH & FITNESS"
            : product.category.toUpperCase(),
          subcategory: product.category,
          description: product.description || "",
          price: Number(product.price),
          rating: 4.5,
          ingredients: product.ingredients
            ? product.ingredients.split(",").map((item) => item.trim())
            : [],
          dietaryTags: [],
          allergens:
            product.allergens &&
            product.allergens.toLowerCase() !== "none declared"
              ? [product.allergens]
              : [],
          image: null,
        }));

        setProducts(formattedProducts);
        setError("");
      } catch (err) {
        setError("Unable to load products. Please check the backend.");
        console.error("Product loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Send user query to the backend
  const handleAssistantQuery = async (userQuery) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/assistant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: userQuery,
          }),
        }
      );

      const data = await response.json();

      console.log("Backend response:", data);
    } catch (error) {
      console.error("Error connecting to backend:", error);
    }
  };

  // Search and category filtering
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      (product.brand || "").toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "ALL" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Add product to cart
  const handleAddToCart = (product) => {
    setCartItems((currentItems) => {
      const existingProduct = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Remove product from cart
  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems((currentItems) =>
      currentItems.filter((_, index) => index !== indexToRemove)
    );
  };

  // Increase product quantity
  const handleIncreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease product quantity
  const handleDecreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        )}
        onCartClick={() => setCartOpen(true)}
      />

      {/* CART */}
      {cartOpen && (
        <Cart
          cartItems={cartItems}
          onRemove={handleRemoveFromCart}
          onIncrease={handleIncreaseQuantity}
          onDecrease={handleDecreaseQuantity}
          onClose={() => setCartOpen(false)}
        />
      )}

      <main>
        {/* HERO */}
        <Hero onQuerySubmit={handleAssistantQuery} />

        {/* SMART RECOMMENDATIONS */}
        {smartRecommendations.length > 0 && (
          <section className="products-section">
            <div className="section-heading">
              <div>
                <p className="section-label">SHOPAI RESULTS</p>
                <h2>Recommended for you</h2>
              </div>
            </div>

            <div className="product-grid">
              {smartRecommendations.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </section>
        )}

        {/* CATEGORIES */}
        <section className="section">
          <div className="section-heading">
            <div>
              <p className="section-label">EXPLORE CATEGORIES</p>
              <h2>Shop by category</h2>
            </div>

            <button
              className="view-button"
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
            >
              View all
            </button>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() =>
                  setSelectedCategory(category.name.toUpperCase())
                }
              />
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="recommendations section">
          <div className="section-heading">
            <div>
              <p className="section-label">PERSONALIZED FOR YOU</p>
              <h2>Recommended products</h2>
            </div>

            <button
              className="view-button"
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
            >
              See more
            </button>
          </div>

          <div className="product-grid">
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p>{error}</p>
            ) : filteredProducts.length === 0 ? (
              <p>No products found.</p>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="logo footer-logo">
          <span className="logo-mark"></span>
          ShopAI
        </div>

        <p>
          Personalized shopping powered by intelligent recommendations.
        </p>
      </footer>
    </div>
  );
}

export default App;