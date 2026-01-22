import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import HeroSection from '../components/HeroSection'
import api from '../api'
import { FaUser, FaEnvelope } from 'react-icons/fa'

const InnerBlog = () => {
  const [blogData, setBlogData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [commentForm, setCommentForm] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    message: ''
  })
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await api.getInnerBlog(1)
        setBlogData(response.data)
        setComments(response.data.comments || [])
      } catch (error) {
        console.error('Error fetching blog data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogData()
  }, [])

  const handleCommentChange = (e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value
    })
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()

    const newComment = {
      id: comments.length + 1,
      name: `${commentForm.firstName} ${commentForm.lastName}`,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      text: commentForm.message,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`
    }

    setComments([newComment, ...comments])

    // Show success message
    alert('Your comment has been posted successfully!')

    // Reset form
    setCommentForm({
      firstName: '',
      lastName: '',
      contact: '',
      email: '',
      message: ''
    })
  }

  if (loading) {
    return <div>Loading blog...</div>
  }

  if (!blogData) {
    return <div>Blog not found</div>
  }

  return (
    <>
      <HeroSection pageName="blog" />

      {/* Blog Content Section */}
      <section className="blog-content-section">
        <Container>
          <Row>
            <Col xs={12}>
              {/* Blog Post Image */}
              <div
                className="blog-post-image"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2071)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '400px',
                  borderRadius: '15px',
                  marginBottom: '30px'
                }}
              ></div>

              {/* Blog Post Content */}
              <div className="blog-post-content">
                <h3>{blogData.title}</h3>

                <p>{blogData.content}</p>

                {/* Author Info */}
                <div className="blog-post-meta">
                  <div
                    className="author-avatar"
                    style={{
                      backgroundImage: `url(${blogData.authorImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="author-info">
                    <div className="author-name">{blogData.author}</div>
                    <div className="post-date">{blogData.date}</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Comment Section */}
      <section className="comment-section">
        <Container>
          <Row>
            {/* Leave Comment Form */}
            <Col lg={6} className="mb-4 mb-lg-0 comment-column">
              <h3 className="section-title">Leave A Comment</h3>
              <div className="comment-form-container">
                <div className="comment-form">
                  <Form id="commentForm" onSubmit={handleCommentSubmit}>
                    <Row className="mb-3">
                      <Col md={6} className="mb-3 mb-md-0">
                        <Form.Control
                          type="text"
                          id="firstName"
                          placeholder="First Name"
                          name="firstName"
                          value={commentForm.firstName}
                          onChange={handleCommentChange}
                          required
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          type="text"
                          id="lastName"
                          placeholder="Last Name"
                          name="lastName"
                          value={commentForm.lastName}
                          onChange={handleCommentChange}
                          required
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6} className="mb-3 mb-md-0">
                        <Form.Control
                          type="tel"
                          id="contact"
                          placeholder="Contact Number"
                          name="contact"
                          value={commentForm.contact}
                          onChange={handleCommentChange}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          type="email"
                          id="email"
                          placeholder="Email"
                          name="email"
                          value={commentForm.email}
                          onChange={handleCommentChange}
                          required
                        />
                      </Col>
                    </Row>
                    <div className="mb-4">
                      <Form.Control
                        as="textarea"
                        style={{ height: '230px' }}
                        id="message"
                        placeholder="Your Comment"
                        rows={4}
                        name="message"
                        value={commentForm.message}
                        onChange={handleCommentChange}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="btn-post-comment w-100"
                      style={{ backgroundColor: '#ff7e00', borderColor: '#ff7e00' }}
                    >
                      Post Comment
                    </Button>
                </Form>
              </div>
            </div>
          </Col>

          {/* Posted Comments */}
          <Col lg={6} className="comment-column">
            <h3 className="section-title">Comments</h3>
            <div className="comments-container">
              <div className="comments-list-wrapper">
                <div className="comments-list" id="commentsList">
                  {comments.map(comment => (
                    <div className="comment-item" key={comment.id}>
                      <div className="comment-header">
                        <div
                          className="comment-avatar"
                          style={{ backgroundImage: `url(${comment.avatar})` }}
                        ></div>
                        <div className="comment-author">
                          <h5>{comment.name}</h5>
                          <span className="comment-date">{comment.date}</span>
                        </div>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-center">
                  <small className="text-muted">Scroll to see more comments</small>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section >
    </>
  )
}

export default InnerBlog