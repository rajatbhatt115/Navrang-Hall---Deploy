import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import HeroSection from '../components/HeroSection'
import { FaSignInAlt, FaUserPlus, FaEnvelope, FaKey } from 'react-icons/fa'

const Account = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loginAlert, setLoginAlert] = useState({ show: false, type: '', message: '' })
  const [registerAlert, setRegisterAlert] = useState({ show: false, type: '', message: '' })

  // Navbar के account icon को orange करें
  useEffect(() => {
    const accountLinks = document.querySelectorAll('a[href*="account"], a[href="/account"]');
    
    accountLinks.forEach(link => {
      link.style.color = '#FF7E00';
      const icon = link.querySelector('i, svg');
      if (icon) {
        icon.style.color = '#FF7E00';
      }
    });

    return () => {
      accountLinks.forEach(link => {
        link.style.color = '';
        const icon = link.querySelector('i, svg');
        if (icon) {
          icon.style.color = '';
        }
      });
    };
  }, []);

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
    if (loginAlert.show) setLoginAlert({ show: false, type: '', message: '' })
  }

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    })
    if (registerAlert.show) setRegisterAlert({ show: false, type: '', message: '' })
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (loginData.email && loginData.password) {
      setLoginAlert({ show: true, type: 'success', message: 'Login successful! Redirecting...' })
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    } else {
      setLoginAlert({ show: true, type: 'error', message: 'Please fill in all fields.' })
    }
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    if (!registerData.email || !registerData.password || !registerData.confirmPassword) {
      setRegisterAlert({ show: true, type: 'error', message: 'Please fill in all fields.' })
      return
    }
    if (registerData.password.length < 6) {
      setRegisterAlert({ show: true, type: 'error', message: 'Password must be at least 6 characters.' })
      return
    }
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterAlert({ show: true, type: 'error', message: 'Passwords do not match.' })
      return
    }
    setRegisterAlert({ show: true, type: 'success', message: 'Registration successful! You can now log in.' })
    setRegisterData({ email: '', password: '', confirmPassword: '' })
    
    setTimeout(() => {
      setRegisterAlert({ show: false, type: '', message: '' })
    }, 3000)
  }

  const handleForgotPassword = () => {
    setLoginAlert({ show: true, type: 'success', message: 'Password reset link has been sent to your email.' })
    setTimeout(() => {
      setLoginAlert({ show: false, type: '', message: '' })
    }, 3000)
  }

  return (
    <>
      <HeroSection pageName="account" />

      {/* Auth Section */}
      <section style={{ 
        padding: '80px 0',
        background: '#fff'
      }}>
        <Container>
          <Row className="align-items-stretch">
            {/* Login Card */}
            <Col lg={6} md={6} className="mb-4 mb-lg-0">
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 5px 25px rgba(0, 0, 0, 0.08)',
                border: '2px solid #f0f0f0',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  textAlign: 'center',
                  marginBottom: '30px',
                  paddingBottom: '20px',
                  borderBottom: '3px solid #FF7E00'
                }}>
                  <div style={{ 
                    fontSize: '40px', 
                    color: '#FF7E00',
                    marginBottom: '15px'
                  }}>
                    <FaSignInAlt />
                  </div>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#2D2D2D',
                    margin: 0
                  }}>Log In.</h3>
                </div>

                {loginAlert.show && (
                  <div style={{
                    display: 'block',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    fontSize: '14px',
                    animation: 'slideDown 0.3s ease',
                    backgroundColor: loginAlert.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: loginAlert.type === 'success' ? '#155724' : '#721c24',
                    border: loginAlert.type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb'
                  }}>
                    {loginAlert.message}
                  </div>
                )}

                <Form id="loginForm" onSubmit={handleLoginSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '25px', position: 'relative' }}>
                      <Form.Control
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                        style={{
                          border: '2px solid #e9ecef',
                          padding: '12px 45px 12px 20px',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease',
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: '16px'
                        }}
                      />
                      <FaEnvelope style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#2D2D2D',
                        fontSize: '18px'
                      }} />
                    </div>

                    <div style={{ marginBottom: '25px', position: 'relative' }}>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                        style={{
                          border: '2px solid #e9ecef',
                          padding: '12px 45px 12px 20px',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease',
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: '16px'
                        }}
                      />
                      <FaKey style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#2D2D2D',
                        fontSize: '18px'
                      }} />
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '25px',
                      fontSize: '14px'
                    }}>
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); handleForgotPassword() }}
                        style={{
                          color: '#2D2D2D',
                          textDecoration: 'none',
                          fontWeight: '500',
                          transition: 'color 0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#FF7E00'}
                        onMouseLeave={(e) => e.target.style.color = '#2D2D2D'}
                      >
                        Forgot Password?
                      </a>
                      <a 
                        href="#registerCard"
                        style={{
                          color: '#2D2D2D',
                          textDecoration: 'none',
                          fontWeight: '500',
                          transition: 'color 0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#FF7E00'}
                        onMouseLeave={(e) => e.target.style.color = '#2D2D2D'}
                      >
                        Register an account?
                      </a>
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                    <Button 
                      type="submit" 
                      style={{
                        width: '100%',
                        background: '#FF7E00',
                        color: 'white',
                        padding: '14px',
                        borderRadius: '30px',
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#E38B50'
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 5px 20px rgba(255, 126, 0, 0.3)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#FF7E00'
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      Log In
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>

            {/* Register Card */}
            <Col lg={6} md={6} id="registerCard">
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 5px 25px rgba(0, 0, 0, 0.08)',
                border: '2px solid #f0f0f0',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  textAlign: 'center',
                  marginBottom: '30px',
                  paddingBottom: '20px',
                  borderBottom: '3px solid #FF7E00'
                }}>
                  <div style={{ 
                    fontSize: '40px', 
                    color: '#FF7E00',
                    marginBottom: '15px'
                  }}>
                    <FaUserPlus />
                  </div>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#2D2D2D',
                    margin: 0
                  }}>Register.</h3>
                </div>

                {registerAlert.show && (
                  <div style={{
                    display: 'block',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    fontSize: '14px',
                    animation: 'slideDown 0.3s ease',
                    backgroundColor: registerAlert.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: registerAlert.type === 'success' ? '#155724' : '#721c24',
                    border: registerAlert.type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb'
                  }}>
                    {registerAlert.message}
                  </div>
                )}

                <Form id="registerForm" onSubmit={handleRegisterSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '25px', position: 'relative' }}>
                      <Form.Control
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        required
                        style={{
                          border: '2px solid #e9ecef',
                          padding: '12px 45px 12px 20px',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease',
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: '16px'
                        }}
                      />
                      <FaEnvelope style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#2D2D2D',
                        fontSize: '18px'
                      }} />
                    </div>

                    <div style={{ marginBottom: '25px', position: 'relative' }}>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        required
                        minLength={6}
                        style={{
                          border: '2px solid #e9ecef',
                          padding: '12px 45px 12px 20px',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease',
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: '16px'
                        }}
                      />
                      <FaKey style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#2D2D2D',
                        fontSize: '18px'
                      }} />
                    </div>

                    <div style={{ marginBottom: '25px', position: 'relative' }}>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        required
                        style={{
                          border: '2px solid #e9ecef',
                          padding: '12px 45px 12px 20px',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease',
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: '16px'
                        }}
                      />
                      <FaKey style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#2D2D2D',
                        fontSize: '18px'
                      }} />
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                    <Button 
                      type="submit" 
                      style={{
                        width: '100%',
                        background: '#FF7E00',
                        color: 'white',
                        padding: '14px',
                        borderRadius: '30px',
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#E38B50'
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 5px 20px rgba(255, 126, 0, 0.3)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#FF7E00'
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      Register
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
        
        <style jsx>{`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @media (max-width: 768px) {
            .auth-card {
              padding: 30px 20px;
              margin-bottom: 30px;
            }
          }
          
          @media (max-width: 576px) {
            .auth-header h3 {
              font-size: 24px;
            }
          }
        `}</style>
      </section>
    </>
  )
}

export default Account