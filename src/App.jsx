import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

const teas = [
  {
    id: 1,
    name: 'Dragon Well (Longjing)',
    description: 'Premium green tea from Hangzhou with a smooth, nutty flavor and elegant chestnut aroma.',
    price: 28,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop',
    category: 'Green Tea'
  },
  {
    id: 2,
    name: 'Tie Guan Yin',
    description: 'Iron Goddess oolong with floral notes and a lingering sweet aftertaste.',
    price: 35,
    image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=400&h=400&fit=crop',
    category: 'Oolong Tea'
  },
  {
    id: 3,
    name: 'Pu-erh Vintage 2015',
    description: 'Aged fermented tea with earthy, rich notes and smooth complexity.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop',
    category: 'Pu-erh Tea'
  },
  {
    id: 4,
    name: 'Jasmine Pearl',
    description: 'Hand-rolled green tea infused with jasmine blossoms for a fragrant experience.',
    price: 32,
    image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&h=400&fit=crop',
    category: 'Scented Tea'
  },
  {
    id: 5,
    name: 'Da Hong Pao',
    description: 'Big Red Robe - a legendary rock oolong with mineral complexity and roasted notes.',
    price: 55,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
    category: 'Oolong Tea'
  },
  {
    id: 6,
    name: 'Silver Needle (Bai Hao)',
    description: 'Delicate white tea made from tender buds with subtle sweetness.',
    price: 42,
    image: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=400&h=400&fit=crop',
    category: 'White Tea'
  }
]

function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [notification, setNotification] = useState(null)

  const addToCart = (tea) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === tea.id)
      if (existing) {
        return prev.map(item =>
          item.id === tea.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...tea, quantity: 1 }]
    })
    setNotification(`${tea.name} added to cart!`)
    setTimeout(() => setNotification(null), 2000)
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="app">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className="notification"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="nav-content">
          <motion.div
            className="logo"
            whileHover={{ scale: 1.05 }}
          >
            <span className="logo-icon">茶</span>
            <span className="logo-text">Medieval Chinese Tea</span>
          </motion.div>
          <div className="nav-links">
            <a href="#products">Our Teas</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <motion.button
              className="cart-btn"
              onClick={() => setShowCart(!showCart)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="cart-icon">🛒</span>
              {totalItems > 0 && (
                <motion.span
                  className="cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={totalItems}
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Discover the Art of <span className="highlight">Chinese Tea</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Premium hand-picked teas from ancient gardens,
            bringing centuries of tradition to your cup.
          </motion.p>
          <motion.a
            href="#products"
            className="cta-btn"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(139, 90, 43, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            Explore Collection
          </motion.a>
        </motion.div>
        <div className="hero-decoration">
          <motion.div
            className="floating-leaf leaf-1"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >🍃</motion.div>
          <motion.div
            className="floating-leaf leaf-2"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -15, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >🍵</motion.div>
          <motion.div
            className="floating-leaf leaf-3"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 20, 0]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >🌿</motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Premium Collection
        </motion.h2>
        <div className="products-grid">
          {teas.map((tea, index) => (
            <motion.div
              key={tea.id}
              className="product-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="product-image-container">
                <motion.img
                  src={tea.image}
                  alt={tea.name}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="category-badge">{tea.category}</span>
              </div>
              <div className="product-info">
                <h3>{tea.name}</h3>
                <p>{tea.description}</p>
                <div className="product-footer">
                  <span className="price">${tea.price}</span>
                  <motion.button
                    className="add-btn"
                    onClick={() => addToCart(tea)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <motion.div
          className="about-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Our Story</h2>
          <div className="about-grid">
            <motion.div
              className="about-text"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p>
                For over three generations, our family has cultivated relationships
                with the finest tea gardens across China's most prestigious growing regions.
              </p>
              <p>
                From the misty mountains of Fujian to the serene valleys of Hangzhou,
                we source only the highest quality leaves, hand-picked at their peak.
              </p>
              <div className="features">
                <div className="feature">
                  <span className="feature-icon">🌱</span>
                  <span>Organic Sourcing</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✨</span>
                  <span>Premium Quality</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🚚</span>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="about-image"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop"
                alt="Tea ceremony"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Get in Touch</h2>
          <p>Have questions about our teas? We'd love to hear from you.</p>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="4" required></textarea>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-icon">茶</span>
            <span>Medieval Chinese Tea</span>
          </div>
          <p>© 2024 Medieval Chinese Tea. All rights reserved.</p>
          <p className="mock-notice">This is a mock website for educational purposes.</p>
          <div className="powered-by">
            <span>Powered by</span>
            <img src="/Loop8 logo-full.png" alt="Loop8" className="loop8-logo" />
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              className="cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
            />
            <motion.div
              className="cart-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="cart-header">
                <h3>Your Cart</h3>
                <button className="close-btn" onClick={() => setShowCart(false)}>×</button>
              </div>

              {cart.length === 0 ? (
                <div className="cart-empty">
                  <span>🍵</span>
                  <p>Your cart is empty</p>
                  <p className="cart-empty-sub">Add some delicious tea!</p>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <motion.div
                        key={item.id}
                        className="cart-item"
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <p>${item.price}</p>
                          <div className="quantity-controls">
                            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                          </div>
                        </div>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          🗑️
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  <div className="cart-footer">
                    <div className="cart-total">
                      <span>Total:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <motion.button
                      className="checkout-btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Checkout
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
