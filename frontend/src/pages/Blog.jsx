import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const blogPages = {
    1: {
      mainBlogs: [
        {
          id: 1,
          title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          author: 'Kiran Patel',
          date: '20 May 2023',
          image: 'img/blog1.png',
          authorImage: 'img/ic_kiran.png'
        },
        {
          id: 2,
          title: 'The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
          author: 'Kishan Patel',
          date: '30 May 2023',
          image: 'img/blog2.png',
          authorImage: 'img/ic_kishan.png'
        }
      ],
      smallBlogs: [
        {
          id: 3,
          title: 'Berbeza dari pendapat umum yang popular, Lorem Ipsum bukan karya text secara rambang.',
          excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          author: 'Neha Bhatt',
          date: '20 May 2023',
          image: 'img/ic_blog3.png',
          authorImage: 'img/ic_neha.png'
        },
        {
          id: 4,
          title: 'Sejumlah text seragam Lorem Ipsum yang digunakan semenjak 1500an di terbitkan di bawah ini untuk mereka yang berminat.',
          excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          author: 'Ankit Patil',
          date: '14 April 2023',
          image: 'img/ic_blog4.png',
          authorImage: 'img/ic_ankit.png'
        },
        {
          id: 5,
          title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          author: 'Parth Patel',
          date: '10 March 2023',
          image: 'img/ic_blog5.png',
          authorImage: 'img/ic_parth.png'
        },
        {
          id: 6,
          title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          author: 'Nupur Shah',
          date: '10 March 2023',
          image: 'img/ic_blog6.png',
          authorImage: 'img/ic_nupur.jpg'
        }
      ]
    },
    2: {
      mainBlogs: [
        {
          id: 7,
          title: 'Summer Fashion Trends 2023: Latest Styles and Designs',
          author: 'Kiran Patel',
          date: '15 June 2023',
          image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600',
          authorImage: 'https://i.pravatar.cc/150?img=1'
        },
        {
          id: 8,
          title: 'Eco-Friendly Fabrics: Sustainable Choices for Modern Wardrobe',
          author: 'Kiyara Patel',
          date: '28 June 2023',
          image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600',
          authorImage: 'https://i.pravatar.cc/150?img=5'
        }
      ],
      smallBlogs: [
        {
          id: 9,
          title: 'Traditional Saree Collection: Timeless Elegance for Modern Women',
          excerpt: 'Explore our exclusive collection of traditional sarees for every occasion.',
          author: 'Neha Bhatt',
          date: '10 June 2023',
          image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
          authorImage: 'https://i.pravatar.cc/150?img=10'
        },
        {
          id: 10,
          title: 'Casual Kurtis: Perfect for Office and Everyday Wear',
          excerpt: 'Comfortable and stylish kurtis that blend tradition with contemporary fashion.',
          author: 'Ankit Patil',
          date: '5 July 2023',
          image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
          authorImage: 'https://i.pravatar.cc/150?img=20'
        },
        {
          id: 11,
          title: 'Lehenga Choli Designs: Perfect for Wedding Season',
          excerpt: 'Stunning lehenga choli designs that make you stand out at every celebration.',
          author: 'Parth Patel',
          date: '22 June 2023',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
          authorImage: 'https://i.pravatar.cc/150?img=25'
        },
        {
          id: 12,
          title: 'Designer Blouses: Elevate Your Saree Game',
          excerpt: 'Latest designer blouse patterns to complement your traditional outfits.',
          author: 'Nupur Shah',
          date: '18 July 2023',
          image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
          authorImage: 'https://i.pravatar.cc/150?img=30'
        }
      ]
    },
    3: {
      mainBlogs: [
        {
          id: 13,
          title: 'Winter Collection 2023: Stay Warm in Style',
          author: 'Kiran Patel',
          date: '5 September 2023',
          image: 'img/blog2.png',
          authorImage: 'img/ic_kiran.png'
        },
        {
          id: 14,
          title: 'Festive Season Shopping Guide: Diwali Special Collection',
          author: 'Kiran Patel',
          date: '12 October 2023',
          image: 'img/blog1.png',
          authorImage: 'https://i.pravatar.cc/150?img=1'
        }
      ],
      smallBlogs: [
        {
          id: 15,
          title: 'Anarkali Suits: Royal Look for Special Occasions',
          excerpt: 'Graceful Anarkali suits that make you feel like royalty at every event.',
          author: 'Neha Bhatt',
          date: '8 September 2023',
          image: 'img/ic_blog3.png',
          authorImage: 'img/ic_neha.png'
        },
        {
          id: 16,
          title: 'Silk Sarees: Luxury Fabrics for Grand Celebrations',
          excerpt: 'Explore our exclusive collection of pure silk sarees for weddings and festivals.',
          author: 'Ankit Patil',
          date: '20 September 2023',
          image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
          authorImage: 'https://i.pravatar.cc/150?img=20'
        },
        {
          id: 17,
          title: 'Indo-Western Fusion: Modern Twist to Traditional Outfits',
          excerpt: 'Combine traditional elegance with contemporary style in these fusion outfits.',
          author: 'Parth Patel',
          date: '15 October 2023',
          image: 'img/ic_blog5.png',
          authorImage: 'img/ic_parth.png'
        },
        {
          id: 18,
          title: 'Accessories to Complete Your Ethnic Look',
          excerpt: 'Jewelry, handbags, and footwear that perfectly complement your ethnic outfits.',
          author: 'Nupur Shah',
          date: '25 October 2023',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
          authorImage: 'https://i.pravatar.cc/150?img=25'
        }
      ]
    }
  }

  const currentBlogs = blogPages[currentPage]

  return (
    <>
      <HeroSection
        title="Blog"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        buttonText="Shop Now"
        buttonLink="/shop"
        imageUrl="img/img_blog_banner.png"
      />

      {/* Blog Content Section */}
      <section className="blog-content-section">
        <Container>
          {/* Current Page Content */}
          <div className="blog-page">
            <Row>
              {/* Left Column - Main Blog Posts */}
              <Col lg={6} className="mb-4">
                {currentBlogs.mainBlogs.map(blog => (
                  <Link to={`/blog/${blog.id}`} className="blog-post-link" key={blog.id}>
                    <div className="blog-post-card">
                      <div 
                        className="blog-post-image" 
                        style={{ backgroundImage: `url(${blog.image})` }}
                      ></div>
                      <div className="blog-post-content">
                        <h3>{blog.title}</h3>
                        <div className="blog-post-meta">
                          <div 
                            className="author-avatar" 
                            style={{ backgroundImage: `url(${blog.authorImage})` }}
                          ></div>
                          <div className="author-info">
                            <span className="author-name">{blog.author}</span>
                            <span className="post-date">{blog.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </Col>

              {/* Right Column - Small Blog Posts */}
              <Col lg={6} style={{ height: '100%' }}>
                {currentBlogs.smallBlogs.map(blog => (
                  <Link to={`/blog/${blog.id}`} className="small-blog-link" key={blog.id}>
                    <div className="small-blog-card">
                      <div 
                        className="small-blog-image" 
                        style={{ backgroundImage: `url(${blog.image})` }}
                      ></div>
                      <div className="small-blog-content">
                        <h4>{blog.title}</h4>
                        <p>{blog.excerpt}</p>
                        <div className="blog-post-meta">
                          <div 
                            className="author-avatar" 
                            style={{ backgroundImage: `url(${blog.authorImage})` }}
                          ></div>
                          <div className="author-info">
                            <span className="author-name">{blog.author}</span>
                            <span className="post-date">{blog.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </Col>
            </Row>
          </div>

          {/* Pagination Section */}
          <div className="blog-pagination">
            {[1, 2, 3].map(page => (
              <div
                key={page}
                className={`page-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export default Blog