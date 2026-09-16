import { useState } from "react";
function ProductCard({ product }) {
    const [added, setAdded] = useState(false);
  return (
    <div className="product-card">

      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <span>Product Image</span>
        )}
      </div>

      <div className="product-info">

        <p className="product-category">
          {product.category}
        </p>

        <h3>{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-bottom">

          <strong>
            ₹{product.price.toLocaleString("en-IN")}
          </strong>

          <button
  className="add-button"
  onClick={() => setAdded(!added)}
>
  {added ? "Added ✓" : "Add"}
</button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;