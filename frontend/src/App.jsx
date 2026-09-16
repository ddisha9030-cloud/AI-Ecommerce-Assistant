import "./App.css";
function App() {
  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <div className="logo">
          <span className="logo-mark"></span>
          ShopAI
        </div>

        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Categories</a>
          <a href="#">For You</a>
          <a href="#">Gifts</a>
        </nav>

        <div className="nav-right">

          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
            />
            <button>Search</button>
          </div>

          <button className="cart-button">
            Cart <span>0</span>
          </button>

        </div>

      </header>


      {/* ================= HERO ================= */}

      <main>

        <section className="hero">

          <div className="hero-content">

            <p className="eyebrow">
              PERSONALIZED SHOPPING, SIMPLIFIED
            </p>

            <h1>
              Shopping that
              <br />
              <span>understands you.</span>
            </h1>

            <p className="hero-description">
              Tell us what you're looking for. ShopAI understands
              your preferences, budget and requirements to help
              you discover products that actually fit your needs.
            </p>

            <div className="hero-actions">

              <button className="primary-button">
                Ask ShopAI
              </button>

              <button className="secondary-button">
                Browse Products
              </button>

            </div>

            <div className="hero-note">
              Personalized recommendations • Smarter decisions
            </div>

          </div>


          {/* AI Assistant Preview */}

          <div className="assistant-preview">

            <div className="assistant-header">
              <div>
                <p>SHOPAI ASSISTANT</p>
                <h3>What are you looking for?</h3>
              </div>

              <span className="status-dot"></span>
            </div>

            <div className="assistant-message">
              I can help you find products based on your
              budget, preferences, dietary needs and more.
            </div>

            <div className="suggestion">
              Vegetarian protein powder under ₹2000
            </div>

            <div className="suggestion">
              A thoughtful birthday gift under ₹1500
            </div>

            <div className="suggestion">
              Something for my home office
            </div>

            <button className="assistant-button">
              Start shopping with AI
            </button>

          </div>

        </section>


        {/* ================= CATEGORIES ================= */}

        <section className="categories section">

          <div className="section-heading">

            <div>
              <p className="section-label">EXPLORE</p>
              <h2>Shop by category</h2>
            </div>

            <button className="view-button">
              View all
            </button>

          </div>


          <div className="category-grid">

            <div className="category-card category-pink">
              <div className="category-number">01</div>
              <h3>Health & Fitness</h3>
              <p>
                Nutrition, supplements and everyday wellness.
              </p>
            </div>

            <div className="category-card category-yellow">
              <div className="category-number">02</div>
              <h3>Electronics</h3>
              <p>
                Technology and useful everyday gadgets.
              </p>
            </div>

            <div className="category-card category-cream">
              <div className="category-number">03</div>
              <h3>Gifts</h3>
              <p>
                Find something meaningful for someone special.
              </p>
            </div>

            <div className="category-card category-dark">
              <div className="category-number">04</div>
              <h3>Everyday Essentials</h3>
              <p>
                Products selected for your everyday needs.
              </p>
            </div>

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

            <div className="product-card">

              <div className="product-image product-pink">
                PRODUCT IMAGE
              </div>

              <div className="product-info">

                <p className="product-category">
                  HEALTH & FITNESS
                </p>

                <h3>Plant Protein Powder</h3>

                <p className="product-description">
                  High-protein vegetarian formula.
                </p>

                <div className="product-bottom">

                  <strong>₹1,499</strong>

                  <button className="add-button">
                    Add
                  </button>

                </div>

              </div>

            </div>


            <div className="product-card">

              <div className="product-image product-yellow">
                PRODUCT IMAGE
              </div>

              <div className="product-info">

                <p className="product-category">
                  ELECTRONICS
                </p>

                <h3>Wireless Headphones</h3>

                <p className="product-description">
                  Comfortable everyday audio.
                </p>

                <div className="product-bottom">

                  <strong>₹1,999</strong>

                  <button className="add-button">
                    Add
                  </button>

                </div>

              </div>

            </div>


            <div className="product-card">

              <div className="product-image product-cream">
                PRODUCT IMAGE
              </div>

              <div className="product-info">

                <p className="product-category">
                  LIFESTYLE
                </p>

                <h3>Minimal Desk Organizer</h3>

                <p className="product-description">
                  Keep your workspace clean and organized.
                </p>

                <div className="product-bottom">

                  <strong>₹799</strong>

                  <button className="add-button">
                    Add
                  </button>

                </div>

              </div>

            </div>

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

