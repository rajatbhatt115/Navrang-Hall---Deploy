import { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import HeroSection from '../components/HeroSection'
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaExclamationCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Dress Name',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
      color: 'Orange',
      size: 'XS',
      price: 4000,
      quantity: 1,
      inStock: true
    },
    {
      id: 2,
      name: 'Dress Name',
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500',
      color: 'Orange',
      size: 'XS',
      price: 4000,
      quantity: 2,
      inStock: true
    },
    {
      id: 3,
      name: 'Jewellery Name',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500',
      color: 'Orange',
      size: 'XS',
      price: 4000,
      quantity: 2,
      inStock: true
    },
    {
      id: 4,
      name: 'Dress Name',
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500',
      color: 'Orange',
      size: 'XS',
      price: 4000,
      quantity: 1,
      inStock: false
    },
    {
      id: 5,
      name: 'Dress Name',
      image: 'https://images.unsplash.com/photo-1724139139873-57572c120322?w=500',
      color: 'Orange',
      size: 'XS',
      price: 4000,
      quantity: 2,
      inStock: true
    }
  ])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  // Navbar के cart icon को orange करें
  useEffect(() => {
    const cartLinks = document.querySelectorAll('a[href*="cart"], a[href="/cart"]');
    
    cartLinks.forEach(link => {
      link.style.color = '#FF7E00';
      
      const icon = link.querySelector('i, svg');
      if (icon) {
        icon.style.color = '#FF7E00';
      }
    });

    return () => {
      cartLinks.forEach(link => {
        link.style.color = '';
        const icon = link.querySelector('i, svg');
        if (icon) {
          icon.style.color = '';
        }
      });
    };
  }, []);

  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
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
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemToDelete))
    }
    closeDeleteModal()
  }

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = cartItems.length > 0 ? 5 : 0
    const tax = subtotal * 0.10
    const total = subtotal + shipping + tax

    return { subtotal, shipping, tax, total }
  }

  const { subtotal, shipping, tax, total } = calculateTotals()

  return (
    <>
      <HeroSection
        title="Cart"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        buttonText="Shop Now"
        buttonLink="/shop"
        imageUrl="img/Rectangle_img_edit.png"
      />

      {/* Cart Section */}
      <section style={{ 
        padding: '60px 0',
        background: 'white'
      }}>
        <Container>
          <Row>
            {/* Cart Items */}
            <Col lg={8}>
              {cartItems.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  display: 'block'
                }}>
                  <FaShoppingCart size={80} style={{ color: '#FF7E00', marginBottom: '20px' }} />
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#2D2D2D',
                    marginBottom: '15px'
                  }}>Your Cart is Empty</h3>
                  <p style={{ color: '#666', marginBottom: '30px' }}>
                    Looks like you haven't added anything to your cart yet.
                  </p>
                  <a href="/shop" style={{
                    background: '#FF7E00',
                    color: 'white',
                    padding: '12px 40px',
                    borderRadius: '25px',
                    border: 'none',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}>Start Shopping</a>
                </div>
              ) : (
                <div>
                  {cartItems.map(item => (
                    <div key={item.id} style={{
                      background: 'white',
                      borderRadius: '15px',
                      padding: '20px',
                      marginBottom: '25px',
                      boxShadow: '0 2px 15px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      position: 'relative'
                    }}>
                      <button 
                        style={{
                          position: 'absolute',
                          top: '15px',
                          right: '15px',
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          background: 'white',
                          color: '#FF7E00',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          fontSize: '16px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#FF7E00';
                          e.target.style.color = 'white';
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'white';
                          e.target.style.color = '#FF7E00';
                          e.target.style.transform = 'scale(1)';
                        }}
                        onClick={() => openDeleteModal(item.id)}
                      >
                        <FaTrash />
                      </button>

                      <div style={{
                        width: '130px',
                        height: '130px',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}>
                        <img 
                          src={item.image} 
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>

                      <div style={{ flex: 1 }}>
                        <h5 style={{
                          fontSize: '20px',
                          fontWeight: '700',
                          color: '#2D2D2D',
                          marginBottom: '10px'
                        }}>{item.name}</h5>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '8px',
                          fontSize: '14px'
                        }}>
                          <span style={{
                            fontWeight: '600',
                            color: '#2D2D2D',
                            marginRight: '5px'
                          }}>Color :</span>
                          <span style={{ color: '#666' }}>{item.color}</span>
                        </div>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '8px',
                          fontSize: '14px'
                        }}>
                          <span style={{
                            fontWeight: '600',
                            color: '#2D2D2D',
                            marginRight: '5px'
                          }}>Size :</span>
                          <span style={{ color: '#666' }}>{item.size}</span>
                        </div>
                        
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '5px 12px',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: '600',
                          backgroundColor: item.inStock ? '#d4edda' : '#f8d7da',
                          color: item.inStock ? '#155724' : '#721c24'
                        }}>
                          {item.inStock ? <FaCheckCircle /> : <FaTimesCircle />}
                          {item.inStock ? 'In Stock' : 'Sold Out'}
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '0px'
                        }}>
                          <button 
                            style={{
                              width: '35px',
                              height: '35px',
                              borderRadius: '5px',
                              background: 'white',
                              border: '2px solid #e0e0e0',
                              color: '#2D2D2D',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: item.inStock ? 'pointer' : 'not-allowed',
                              transition: 'all 0.3s',
                              fontSize: '16px',
                              fontWeight: '600',
                              opacity: item.inStock ? 1 : 0.5
                            }}
                            onMouseEnter={(e) => {
                              if (item.inStock) {
                                e.target.style.borderColor = '#FF7E00';
                                e.target.style.color = '#FF7E00';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (item.inStock) {
                                e.target.style.borderColor = '#e0e0e0';
                                e.target.style.color = '#2D2D2D';
                              }
                            }}
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={!item.inStock}
                          >
                            <FaMinus />
                          </button>
                          
                          <span style={{
                            minWidth: '30px',
                            textAlign: 'center',
                            fontWeight: '600',
                            color: '#2D2D2D'
                          }}>{item.quantity}</span>
                          
                          <button 
                            style={{
                              width: '35px',
                              height: '35px',
                              borderRadius: '5px',
                              background: 'white',
                              border: '2px solid #e0e0e0',
                              color: '#2D2D2D',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: item.inStock ? 'pointer' : 'not-allowed',
                              transition: 'all 0.3s',
                              fontSize: '16px',
                              fontWeight: '600',
                              opacity: item.inStock ? 1 : 0.5
                            }}
                            onMouseEnter={(e) => {
                              if (item.inStock) {
                                e.target.style.borderColor = '#FF7E00';
                                e.target.style.color = '#FF7E00';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (item.inStock) {
                                e.target.style.borderColor = '#e0e0e0';
                                e.target.style.color = '#2D2D2D';
                              }
                            }}
                            onClick={() => updateQuantity(item.id, 1)}
                            disabled={!item.inStock}
                          >
                            <FaPlus />
                          </button>
                        </div>
                        
                        <div style={{
                          fontSize: '20px',
                          fontWeight: '700',
                          color: '#2D2D2D',
                          minWidth: '80px',
                          textAlign: 'right'
                        }}>
                          ₹ {(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Col>

            {/* Order Summary */}
            <Col lg={4}>
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 5px 25px rgba(0, 0, 0, 0.1)',
                position: 'sticky',
                top: '20px'
              }}>
                <h4 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#2D2D2D',
                  marginBottom: '25px',
                  paddingBottom: '15px',
                  borderBottom: '2px solid #f0f0f0'
                }}>Order Summary</h4>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  fontSize: '16px'
                }}>
                  <span style={{ color: '#666' }}>Subtotal</span>
                  <span style={{ fontWeight: '600', color: '#2D2D2D' }}>₹ {subtotal.toFixed(2)}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  fontSize: '16px'
                }}>
                  <span style={{ color: '#666' }}>Shipping estimate</span>
                  <span style={{ fontWeight: '600', color: '#2D2D2D' }}>₹ {shipping.toFixed(2)}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  fontSize: '16px'
                }}>
                  <span style={{ color: '#666' }}>Tax estimate</span>
                  <span style={{ fontWeight: '600', color: '#2D2D2D' }}>₹ {tax.toFixed(2)}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '2px solid #f0f0f0'
                }}>
                  <span style={{ fontSize: '18px', fontWeight: '700', color: '#2D2D2D' }}>Order Total</span>
                  <span style={{ fontSize: '22px', fontWeight: '700', color: '#FF7E00' }}>₹ {total.toFixed(2)}</span>
                </div>
                
                <Button 
                  style={{
                    width: '100%',
                    background: '#FF7E00',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '30px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    marginTop: '20px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#E38B50';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 5px 20px rgba(255, 126, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#FF7E00';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Check Out
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={{
          display: 'flex',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            animation: 'modalSlideIn 0.3s ease'
          }}>
            <FaExclamationCircle size={60} style={{ color: '#FF7E00', marginBottom: '20px' }} />
            <h4 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2D2D2D',
              marginBottom: '15px'
            }}>Remove Item?</h4>
            <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
              Are you sure you want to remove this item from your cart?
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button 
                style={{
                  padding: '12px 30px',
                  borderRadius: '25px',
                  background: 'white',
                  color: '#2D2D2D',
                  border: '2px solid #e0e0e0',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontSize: '16px'
                }}
                onClick={closeDeleteModal}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f8f9fa';
                  e.target.style.borderColor = '#2D2D2D';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.borderColor = '#e0e0e0';
                }}
              >
                Cancel
              </button>
              <button 
                style={{
                  padding: '12px 30px',
                  borderRadius: '25px',
                  background: '#FF7E00',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontSize: '16px'
                }}
                onClick={confirmDelete}
                onMouseEnter={(e) => {
                  e.target.style.background = '#E38B50';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#FF7E00';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @media (max-width: 768px) {
          .cart-item {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .cart-image {
            width: 100%;
            height: 200px;
            margin-bottom: 15px;
          }
          
          .cart-actions {
            width: 100%;
            justify-content: space-between;
            margin-top: 15px;
          }
          
          .delete-btn {
            position: relative;
            top: 0;
            right: 0;
            margin-left: auto;
          }
          
          .order-summary {
            position: relative;
            top: 0;
            margin-top: 30px;
          }
        }
        
        @media (max-width: 576px) {
          .cart-details h5 {
            font-size: 18px;
          }
          
          .price-tag {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  )
}

export default Cart