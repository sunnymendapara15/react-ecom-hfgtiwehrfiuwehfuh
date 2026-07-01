const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div
        className="product-image"
        style={{ backgroundImage: `url(${product.image})` }}
      >
        {product.badge && <span className="product-badge">{product.badge}</span>}
      </div>
      <div className="product-content">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-cta">
          <strong>{currencyFormatter.format(product.price)}</strong>
          <button type="button" onClick={() => onAdd(product)}>
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}
