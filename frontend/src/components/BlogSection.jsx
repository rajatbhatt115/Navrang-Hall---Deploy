import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BlogSection = () => {
  const mainBlog = {
    id: 1,
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    author: 'Kiran Patel',
    date: '20 May 2023',
    image: 'img/blog1.png',
    authorImage: 'img/ic_kiran.png'
  }

  const smallBlogs = [
    {
      id: 2,
      title: 'Berbeza dari pendapat umum yang popular, Lorem Ipsum bukan karya text secara rambang.',
      excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      author: 'Neha Bhatt',
      date: '20 May 2023',
      image: 'img/ic_blog3.png',
      authorImage: 'img/ic_neha.png'
    },
    {
      id: 3,
      title: 'Sejumlah text seragam Lorem Ipsum yang digunakan semenjak 1500an di terbitkan di bawah ini untuk mereka yang berminat.',
      excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      author: 'Ankit Patil',
      date: '14 April 2023',
      image: 'img/ic_blog4.png',
      authorImage: 'img/ic_ankit.png'
    }
  ]

  return (
    <section className="blog-section">
      <Container>
        <h2><span>The latest news.</span> <strong>From Our Blog</strong></h2>
        
        <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25px' }}>
          {/* Left Column - Main Blog Post */}
          <Col lg={6} className="mb-4">
            <Link to={`/blog/${mainBlog.id}`} className="blog-post-link">
              <div className="blog-post-card">
                <div 
                  className="blog-post-image" 
                  style={{ backgroundImage: `url(${mainBlog.image})` }}
                ></div>
                <div className="blog-post-content">
                  <h3>{mainBlog.title}</h3>
                  <div className="blog-post-meta">
                    <div 
                      className="author-avatar" 
                      style={{ backgroundImage: `url(${mainBlog.authorImage})` }}
                    ></div>
                    <div className="author-info">
                      <span className="author-name">{mainBlog.author}</span>
                      <span className="post-date">{mainBlog.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Col>

          {/* Right Column - Small Blog Posts */}
          <Col lg={6} style={{ height: '100%' }}>
            {smallBlogs.map(blog => (
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
      </Container>
    </section>
  )
}

export default BlogSection