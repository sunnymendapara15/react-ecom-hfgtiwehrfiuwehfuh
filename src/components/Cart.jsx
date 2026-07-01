const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export default function Cart({ items, total, onRemove }) {
  return (
    <aside className="cart-panel">
      <div className="cart-header">
        <h2>Cart</h2>
        <p className="cart-subhead">
          {items.length ? `${items.length} item${items.length > 1 ? 's' : ''}` : 'Empty'}
        </p>
      </div>

      {items.length === 0 ? (
        <p className="empty-cart">Add a product to start building your bag.</p>
      ) : (
        <ul className="cart-items">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <div>
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-quantity">
                  <span>Qty</span>
                  <strong>{item.quantity}</strong>
                </p>
              </div>
              <div className="cart-item-actions">
                <p className="cart-item-price">
                  {currencyFormatter.format(item.price * item.quantity)}
                </p>
                <button type="button" onClick={() => onRemove(item.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-total">
        <span>Total</span>
        <strong>{currencyFormatter.format(total)}</strong>
      </div>
      <button
        type="button"
        className="checkout-button"
        disabled={!items.length}
      >
        Checkout securely
      </button>
      <p className="cart-hint">No payment required — this is a demo storefront.</p>
    </aside>
  );
}
