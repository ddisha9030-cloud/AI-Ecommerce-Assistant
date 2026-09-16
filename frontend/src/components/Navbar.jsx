function Navbar({ searchQuery, setSearchQuery }) {
  return (
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
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <button>
            Search
          </button>

        </div>

        <button className="cart-button">
          Cart <span>0</span>
        </button>

      </div>

    </header>
  );
}

export default Navbar;