import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import CategoryCard from "./components/CategoryCard";
import Cart from "./components/Cart";
import { filterProducts } from "./utils/recommendationEngine";

const products = [
  {
    id: 1,
    category: "HEALTH & FITNESS",
    subcategory: "Protein",
    name: "Plant Protein Powder",
    brand: "FitFuel",
    description: "High-protein vegetarian formula for everyday fitness.",
    price: 1499,
    rating: 4.4,
    ingredients: ["Pea Protein", "Brown Rice Protein", "Cocoa"],
    dietaryTags: ["Vegetarian", "Vegan", "High Protein"],
    allergens: [],
    image: null,
  },

  {
    id: 2,
    category: "HEALTH & FITNESS",
    subcategory: "Protein",
    name: "Whey Protein Chocolate",
    brand: "MusclePro",
    description: "Whey protein supplement designed for post-workout recovery.",
    price: 1899,
    rating: 4.5,
    ingredients: ["Whey Protein Concentrate", "Cocoa", "Milk Solids"],
    dietaryTags: ["High Protein"],
    allergens: ["Milk"],
    image: null,
  },

  {
    id: 3,
    category: "HEALTH & FITNESS",
    subcategory: "Snacks",
    name: "Protein Energy Bars",
    brand: "NutriGo",
    description: "Convenient protein-rich snack for active lifestyles.",
    price: 699,
    rating: 4.2,
    ingredients: ["Peanuts", "Oats", "Dates", "Protein Blend"],
    dietaryTags: ["Vegetarian", "High Protein"],
    allergens: ["Peanuts"],
    image: null,
  },

  {
    id: 4,
    category: "ELECTRONICS",
    subcategory: "Audio",
    name: "Wireless Headphones",
    brand: "SoundMax",
    description: "Comfortable everyday headphones with wireless connectivity.",
    price: 1999,
    rating: 4.3,
    ingredients: [],
    dietaryTags: [],
    allergens: [],
    image: null,
  },

  {
    id: 5,
    category: "ELECTRONICS",
    subcategory: "Accessories",
    name: "Wireless Mouse",
    brand: "TechFlow",
    description: "Compact wireless mouse for work, study and everyday use.",
    price: 799,
    rating: 4.1,
    ingredients: [],
    dietaryTags: [],
    allergens: [],
    image: null,
  },

  {
    id: 6,
    category: "LIFESTYLE",
    subcategory: "Workspace",
    name: "Minimal Desk Organizer",
    brand: "WorkSpace",
    description: "Keep your workspace clean and organized.",
    price: 799,
    rating: 4.6,
    ingredients: [],
    dietaryTags: [],
    allergens: [],
    image: null,
  },

  {
    id: 7,
    category: "LIFESTYLE",
    subcategory: "Stationery",
    name: "Premium Notebook",
    brand: "PaperCraft",
    description: "Minimal hardcover notebook for notes, planning and journaling.",
    price: 499,
    rating: 4.5,
    ingredients: [],
    dietaryTags: [],
    allergens: [],
    image: null,
  },

  {
    id: 8,
    category: "GIFTS",
    subcategory: "Lifestyle",
    name: "Self Care Gift Set",
    brand: "GlowBox",
    description: "A simple self-care collection suitable for gifting.",
    price: 1299,
    rating: 4.4,
    ingredients: [],
    dietaryTags: [],
    allergens: [],
    image: null,
  },
];

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

  const handleAssistantQuery = async (userQuery) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: userQuery,
      }),
    });

    const data = await response.json();

    console.log("Backend response:", data);

  } catch (error) {
    console.error("Error connecting to backend:", error);
  }
};

  const filteredProducts = products.filter((product) => {
  const query = searchQuery.toLowerCase();

  const matchesSearch =
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query);

  const matchesCategory =
    selectedCategory === "ALL" ||
    product.category === selectedCategory;

  return matchesSearch && matchesCategory;
});
const handleAddToCart = (product) => {
  setCartItems((currentItems) => {

    const existingProduct = currentItems.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      return currentItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
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

const handleRemoveFromCart = (indexToRemove) => {
  setCartItems((currentItems) =>
    currentItems.filter((_, index) => index !== indexToRemove)
  );
};

const handleIncreaseQuantity = (productId) => {
  setCartItems((currentItems) =>
    currentItems.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )
  );
};

const handleDecreaseQuantity = (productId) => {
  setCartItems((currentItems) =>
    currentItems
      .map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

   <Navbar
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  cartCount={cartItems.length}
  onCartClick={() => setCartOpen(true)}
/>

{cartOpen && (
  <Cart
  cartItems={cartItems}
  onRemove={handleRemoveFromCart}
  onIncrease={handleIncreaseQuantity}
  onDecrease={handleDecreaseQuantity}
  onClose={() => setCartOpen(false)}
/>
)}

      {/* ================= HERO ================= */}

      <main>

      <Hero onQuerySubmit={handleAssistantQuery} />
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
       


{/* ================= CATEGORIES ================= */}

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
    onClick={() => setSelectedCategory(category.name.toUpperCase())}
  />
))}

  </div>

</section>


{/* ================= RECOMMENDATIONS ================= */}

<section className="recommendations section">

          <div className="section-heading">

            <div>
              <p className="section-label">PERSONALIZED FOR YOU</p>
              <h2>Recommended products</h2>
            </div>

            <button className="view-button">
              See more
            </button>

          </div>


          <div className="product-grid">
{filteredProducts.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    onAddToCart={handleAddToCart}
  />
))}

            

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

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

