import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaShoppingBag, FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { useState } from 'react'

const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false)

  const handleNavClick = () => {
    if (window.innerWidth <= 991.98) {
      setExpanded(false)
    }
  }

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <Container>
          <div className="row align-items-center ps-2 pe-3">

            {/* Left */}
            <div className="col-md-4 top-bar-item d-flex align-items-center">
              <div className="top-bar-icon">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <div className="top-bar-text">Free Shipping</div>
            </div>

            {/* Center */}
            <div className="col-md-4 top-bar-item d-flex align-items-center justify-content-center">
              <div className="top-bar-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="top-bar-text">+123 456 789</div>
            </div>

            {/* Right */}
            <div className="col-md-4 top-bar-item d-flex align-items-center justify-content-end">
              <div className="top-bar-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="top-bar-text">support@mail.com</div>
            </div>

          </div>
        </Container>
      </div>

      {/* Navbar */}
      <Navbar
        expand="lg"
        bg="white"
        className="sticky-top"
        collapseOnSelect
        expanded={expanded}
        onToggle={(isExpanded) => setExpanded(isExpanded)}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>
            <div className="logo-circle">
              <FaShoppingBag />
            </div>
            <div>
              <strong>SHREE LAXMI</strong><br />
              <small>MALL</small>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              <Nav.Link 
                as={NavLink} 
                to="/" 
                end 
                className="nav-item"
                onClick={handleNavClick}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                as={NavLink} 
                to="/about" 
                className="nav-item"
                onClick={handleNavClick}
              >
                About Us
              </Nav.Link>
              <Nav.Link 
                as={NavLink} 
                to="/shop" 
                className="nav-item"
                onClick={handleNavClick}
              >
                Shop
              </Nav.Link>
              <Nav.Link 
                as={NavLink} 
                to="/blog" 
                className="nav-item"
                onClick={handleNavClick}
              >
                Blog
              </Nav.Link>
              <Nav.Link 
                as={NavLink} 
                to="/contact" 
                className="nav-item"
                onClick={handleNavClick}
              >
                Contact
              </Nav.Link>
            </Nav>

            <div className="d-flex ms-lg-3 icons-mob">
              <Nav.Link 
                as={Link} 
                to="/account" 
                className="nav-icon"
                onClick={handleNavClick}
              >
                <FaUser />
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/wishlist" 
                className="nav-icon"
                onClick={handleNavClick}
              >
                <FaHeart className="heart-icon" />
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/cart" 
                className="nav-icon"
                onClick={handleNavClick}
              >
                <FaShoppingCart />
              </Nav.Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Styles */}
      <style jsx global>{`
        /* Top Bar */
        .top-bar {
          background: #FF7E00;
          color: #fff;
          padding: 10px 0;
          font-size: 14px;
        }

        .top-bar-icon {
          margin-right: 8px;
        }

        .top-bar i {
          color: #fff;
          font-size: 16px;
        }

        /* Desktop */
        @media (min-width: 768px) {
          .top-bar-item {
            flex-direction: row;
          }
        }

        /* Mobile */
        @media (max-width: 767.98px) {
          .top-bar-item {
            flex-direction: column;
            text-align: center;
            margin-bottom: 8px;
          }

          .top-bar-icon {
            margin-right: 0;
            margin-bottom: 4px;
          }

          .top-bar-text {
            font-size: 12px;
          }
        }

        /* Navbar mobile dropdown */
        @media (max-width: 991.98px) {
          .navbar-collapse {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #fff;
            padding: 1rem;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border-radius: 0 0 15px 15px;
          }

          /* Optional: Add animation for closing */
          .navbar-collapse.collapsing {
            transition: height 0.35s ease;
          }
        }

        /* Logo */
        .logo-circle {
          width: 40px;
          height: 40px;
          background: #FF7E00;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
        }

        .logo-circle svg {
          color: #fff;
          font-size: 20px;
        }

        .nav-link {
          text-align: center;
        }

        .icons-mob {
          justify-content: center;
        }

        /* Optional: Add smooth transition for nav items */
        .nav-item, .nav-icon {
          transition: all 0.3s ease;
        }

        .nav-item:hover, .nav-icon:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </>
  )
}

export default NavigationBar