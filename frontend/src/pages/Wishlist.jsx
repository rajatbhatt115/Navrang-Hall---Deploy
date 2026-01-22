import { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import HeroSection from '../components/HeroSection'
import { FaTrashAlt, FaShoppingCart, FaMinus, FaPlus, FaCheckCircle, FaTimesCircle, FaHeartBroken, FaHeart } from 'react-icons/fa'

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Dress Name',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400',
      color: 'Orange',
      size: 'XS',
      unitPrice: 4000,
      quantity: 1,
      inStock: true
    },
    {
      id: 2,
      name: 'Dress Name',
      image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400',
      color: 'Orange',
      size: 'XS',
      unitPrice: 4000,
      quantity: 2,
      inStock: true
    },
    {
      id: 3,
      name: 'Jewellery Name',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
      color: 'Orange',
      size: 'XS',
      unitPrice: 4000,
      quantity: 2,
      inStock: true
    },
    {
      id: 4,
      name: 'Dress Name',
      image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400',
      color: 'Orange',
      size: 'XS',
      unitPrice: 4000,
      quantity: 1,
      inStock: false
    },
    {
      id: 5,
      name: 'Dress Name',
      image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400',
      color: 'Orange',
      size: 'XS',
      unitPrice: 4000,
      quantity: 2,
      inStock: true
    }
  ])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  // Navbar के wishlist icon को orange करें
  useEffect(() => {
    // Wishlist link खोजें
    const wishlistLinks = document.querySelectorAll('a[href*="wishlist"], a[href="/wishlist"]');
    
    wishlistLinks.forEach(link => {
      // Link को orange करें
      link.style.color = '#FF7E00';
      
      // Icon को भी orange करें
      const icon = link.querySelector('i, svg, .heart-icon');
      if (icon) {
        icon.style.color = '#FF7E00';
      }
      
      // Special case for heart-icon class
      const heartIcon = link.querySelector('.heart-icon');
      if (heartIcon) {
        heartIcon.style.color = '#FF7E00';
      }
    });

    // Cleanup function - page छोड़ने पर original color restore करें
    return () => {
      wishlistLinks.forEach(link => {
        link.style.color = '';
        const icon = link.querySelector('i, svg, .heart-icon');
        if (icon) {
          icon.style.color = '';
        }
        
        const heartIcon = link.querySelector('.heart-icon');
        if (heartIcon) {
          heartIcon.style.color = '';
        }
      });
    };
  }, []);

  const updateQuantity = (id, change) => {
    setWishlistItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const calculatePrice = (item) => {
    return item.unitPrice * item.quantity
  }

  const openDeleteModal = (id) => {
    setItemToDelete(id)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setItemToDelete(null)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemToDelete))
    }
    closeDeleteModal()
  }

  const moveToCart = (item) => {
    if (!item.inStock) return
    alert(`${item.name} (Qty: ${item.quantity}) has been moved to your cart!`)
    setWishlistItems(prevItems => prevItems.filter(i => i.id !== item.id))
  }

  return (
    <>
      <HeroSection
        title="Wishlist"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        buttonText="Shop Now"
        buttonLink="/shop"
        imageUrl="img/ic_wishlist_banner.png"
      />

      {/* Wishlist Section */}
      <section className="wishlist-section">
        <Container>
          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist show" id="emptyWishlist">
              <FaHeartBroken size={80} style={{ color: '#FF7E00', marginBottom: '20px' }} />
              <h3>Your Wishlist is Empty</h3>
              <p>Looks like you haven't added any items to your wishlist yet.</p>
              <a href="/shop" className="btn-shop-now">Start Shopping</a>
            </div>
          ) : (
            <div id="wishlistContainer">
              {wishlistItems.map(item => (
                <div className="wishlist-item d-flex" key={item.id}>
                  <div className="wishlist-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="wishlist-details">
                    <h5>{item.name}</h5>
                    <div className="detail-row">
                      <span className="detail-label">Color :</span>
                      <span className="detail-value">{item.color}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Size :</span>
                      <span className="detail-value">{item.size}</span>
                    </div>
                    <div className="stock-status">
                      <span className={`status-badge ${item.inStock ? 'in-stock' : 'sold-out'}`}>
                        {item.inStock ? <FaCheckCircle /> : <FaTimesCircle />}
                        {item.inStock ? 'In Stock' : 'Sold Out'}
                      </span>
                    </div>
                  </div>
                  <div className="wishlist-actions">
                    <div className="action-buttons">
                      <button 
                        className="action-btn delete-btn" 
                        onClick={() => openDeleteModal(item.id)}
                        title="Delete item"
                      >
                        <FaTrashAlt />
                      </button>
                      <button
                        className="action-btn cart-btn"
                        onClick={() => moveToCart(item)}
                        title="Move to cart"
                        disabled={!item.inStock}
                        style={!item.inStock ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                      >
                        <FaShoppingCart />
                      </button>
                    </div>
                    <div className="quantity-section">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={!item.inStock}
                        style={!item.inStock ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                        disabled={!item.inStock}
                        style={!item.inStock ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="price-tag" data-unit-price={item.unitPrice}>
                      ₹ {calculatePrice(item)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="confirmation-modal show" id="deleteConfirmationModal">
          <div className="modal-content-custom">
            <FaTrashAlt size={60} style={{ color: '#FF7E00', marginBottom: '20px' }} />
            <h4>Delete Item?</h4>
            <p>Are you sure you want to delete this item from your wishlist? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button className="modal-btn cancel" onClick={closeDeleteModal}>Cancel</button>
              <button className="modal-btn confirm" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Wishlist