import { useState } from 'react';
import products from './data/products';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';

const categories = ['all', ...new Set(products.map((product) => product.category))];

const heroStats = [
  { label: 'Curated pieces', value: '24 styles' },
  { label: 'Fast delivery', value: '3 hr city drops' },
  { label: 'Support', value: '24/7' }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState({});

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.category === activeCategory);

  const cartItems = Object.values(cart);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addToCart = (product) => {
    setCart((previous) => {
      const current = previous[product.id];

      return {
        ...previous,
        [product.id]: {
          ...product,
          quantity: current ? current.quantity + 1 : 1
        }
      };
    });
  };

  const removeFromCart = (productId) => {
    setCart((previous) => {
      const current = previous[productId];

      if (!current) {
        return previous;
      }

      const updated = { ...previous };

      if (current.quantity === 1) {
        delete updated[productId];
      } else {
        updated[productId] = {
          ...current,
          quantity: current.quantity - 1
        };
      }

      return updated;
    });
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Limited drop</p>
          <h1>Everyday essentials, reimagined</h1>
          <p className="subhead">
            Browse a compact edit of fitness-ready apparel, travel gear, and
            multi-purpose home upgrades that keep your routine lean.
          </p>
          <div className="hero-actions">
            <button type="button">Shop the drop</button>
            <button type="button" className="secondary">
              View lookbook
            </button>
          </div>
        </div>
        <div className="hero-stats">
          {heroStats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </header>

      <section className="category-bar">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={category === activeCategory ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category === 'all' ? 'All products' : category}
          </button>
        ))}
      </section>

      <section className="products-layout">
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
            />
          ))}
        </div>
        <Cart items={cartItems} onRemove={removeFromCart} total={cartTotal} />
      </section>
    </div>
  );
}
