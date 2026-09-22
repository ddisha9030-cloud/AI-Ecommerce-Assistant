function Cart({
  cartItems,
  onRemove,
  onIncrease,
  onDecrease,
  onClose,
}) {

  const total = cartItems.reduce(
  (sum, product) =>
    sum + product.price * product.quantity,
  0
);
  return (
    <div className="cart-panel">

      <div className="cart-header">

        <div>
          <p className="section-label">SHOPPING CART</p>
          <h2>Your Cart</h2>
        </div>

        <button
          className="cart-close"
          onClick={onClose}
        >
          ×
        </button>

      </div>


      {cartItems.length === 0 ? (

        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <span>Add some products to get started.</span>
        </div>

      ) : (

        <div className="cart-items">

          {cartItems.map((product, index) => (

            <div
              className="cart-item"
              key={`${product.id}-${index}`}
            >
<div>
  <h3>{product.name}</h3>

  <p>
    ₹{product.price.toLocaleString("en-IN")}
  </p>

  <div className="quantity-controls">

  <button
    className="quantity-button"
    onClick={() => onDecrease(product.id)}
  >
    −
  </button>

  <span className="quantity-value">
    {product.quantity}
  </span>

  <button
    className="quantity-button"
    onClick={() => onIncrease(product.id)}
  >
    +
  </button>

</div>
</div>

<button
  className="remove-button"
  onClick={() => onRemove(index)}
>
  Remove
</button>


            </div>

          ))}

        </div>

      )}


      {cartItems.length > 0 && (

        <div className="cart-footer">

          <div className="cart-total">
            <span>Total</span>

            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>
          </div>

          <button className="checkout-button">
            Checkout
          </button>

        </div>

      )}

    </div>
  );
}

export default Cart;