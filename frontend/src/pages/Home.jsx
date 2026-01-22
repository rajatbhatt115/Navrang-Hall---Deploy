import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import DiscoverSection from '../components/DiscoverSection'
import AboutSection from '../components/AboutSection'
import RatingSection from '../components/RatingSection'
import ExploringSection from '../components/ExploringSection'
import TestimonialsSection from '../components/TestimonialsSection'
import BlogSection from '../components/BlogSection'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <>
      <HeroSection 
        title="New Collection"
        subtitle="FIND WHAT BEST OPTIONS FOR YOU"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        buttonText="Shop Now"
        buttonLink="/shop"
        imageUrl="img/img_banner_home.png"
      />
      
      <DiscoverSection />
      <AboutSection />
      <RatingSection />
      <ExploringSection />
      <TestimonialsSection />
      <BlogSection />
      <Newsletter />
    </>
  )
}

export default Home