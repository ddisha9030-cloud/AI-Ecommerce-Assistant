import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import CategoryCard from "./components/CategoryCard";

const products = [
  {
    id: 1,
    category: "HEALTH & FITNESS",
    name: "Plant Protein Powder",
    description: "High-protein vegetarian formula.",
    price: 1499,
    image: null,
  },
  {
    id: 2,
    category: "ELECTRONICS",
    name: "Wireless Headphones",
    description: "Comfortable everyday audio.",
    price: 1999,
    image: null,
  },
  {
    id: 3,
    category: "LIFESTYLE",
    name: "Minimal Desk Organizer",
    description: "Keep your workspace clean and organized.",
    price: 799,
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
      const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

     <Navbar
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
/>


      {/* ================= HERO ================= */}

      <main>

       <Hero />


{/* ================= CATEGORIES ================= */}

<section className="section">

  <div className="section-heading">

    <div>
      <p className="section-label">EXPLORE CATEGORIES</p>
      <h2>Shop by category</h2>
    </div>

    <button className="view-button">
      View all
    </button>

  </div>


  <div className="category-grid">

    {categories.map((category) => (
      <CategoryCard
        key={category.id}
        category={category}
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

