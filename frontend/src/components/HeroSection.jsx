import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import api from '../api'

const HeroSection = ({ pageName, isShopPage }) => {
  const [bannerData, setBannerData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await api.getHomeBanner(pageName)
        const banner = response.data
        
        // Debugging ke liye
        console.log('Banner data received:', banner)
        
        // Image URL fix karein
        if (banner.imageUrl) {
          // Agar backend se 'img/' se start ho raha hai
          if (banner.imageUrl.startsWith('img/')) {
            // Frontend ke liye '/img/' bana dein
            banner.imageUrl = '/' + banner.imageUrl
          }
          // Agar '/img/' nahi hai to add karein
          else if (!banner.imageUrl.startsWith('/') && !banner.imageUrl.startsWith('http')) {
            banner.imageUrl = '/img/' + banner.imageUrl
          }
        }
        
        console.log('Fixed image URL:', banner.imageUrl)
        setBannerData(banner)
      } catch (error) {
        console.error('Error fetching banner data:', error)
        // Fallback data
        const fallbackData = {
          title: pageName === 'home' ? 'New Collection' : 
                 pageName === 'about' ? 'About Us' :
                 pageName === 'shop' ? 'Shop' :
                 pageName === 'blog' ? 'Blog' :
                 pageName === 'contact' ? 'Contact Us' :
                 pageName === 'account' ? 'Login' :
                 pageName === 'cart' ? 'Cart' :
                 pageName === 'wishlist' ? 'Wishlist' :
                 pageName === 'product' ? 'Product Details' : pageName,
          
          subtitle: pageName === 'home' ? 'FIND WHAT BEST OPTIONS FOR YOU' : '',
          
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          
          buttonText: pageName !== 'shop' ? 'Shop Now' : '',
          buttonLink: pageName !== 'shop' ? '/shop' : '',
          
          imageUrl: '/img/img_banner_shop.png' // Direct public folder path
        }
        setBannerData(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    if (pageName) {
      fetchBannerData()
    }
  }, [pageName])

  if (loading) {
    return null
  }

  if (!bannerData) {
    return null
  }

  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="hero-content-col">
            <div className="hero-content">
              <p>VISIT ALL OF OUR PRODUCTS</p>
              <h1>
                <span>{bannerData.title}</span>
              </h1>
              {bannerData.subtitle && <h5>{bannerData.subtitle}</h5>}
              <p>{bannerData.description}</p>
              {!isShopPage && bannerData.buttonText && bannerData.buttonLink && (
                <Link to={bannerData.buttonLink}>
                  <button className="btn-read-more">{bannerData.buttonText}</button>
                </Link>
              )}
            </div>
          </Col>
          <Col lg={6} className="text-lg-end">
            <div className="hero-image float-lg-end">
              <img 
                src={bannerData.imageUrl} 
                className="my-img img-fluid" 
                alt="Hero Banner" 
                onError={(e) => {
                  console.error('Image failed to load:', bannerData.imageUrl)
                  e.target.src = '/img/img_banner_shop.png' // Fallback image
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default HeroSection