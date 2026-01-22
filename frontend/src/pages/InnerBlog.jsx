import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import HeroSection from '../components/HeroSection'
import { FaUser, FaEnvelope } from 'react-icons/fa'

const InnerBlog = () => {
  const [commentForm, setCommentForm] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    message: ''
  })

  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Neha Yadav',
      date: '20 May 2023',
      text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 2,
      name: 'Aakash Modi',
      date: '11 April 2023',
      text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    {
      id: 3,
      name: 'Amit Solanki',
      date: '28 March 2023',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      avatar: 'https://i.pravatar.cc/150?img=12'
    }
  ])

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

  return (
    <>
      <HeroSection
        title="Blog"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        buttonText="Shop Now"
        buttonLink="/shop"
        imageUrl={window.location.origin + "/img/img_banner_shop.png"}
      />

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
                <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>

                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                  suffered alteration in some form, by injected humour, or randomised words which don't look
                  even slightly believable.</p>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.</p>

                <p>Curabitur ac urna ac nibh volutpat finibus vitae eget diam. Mauris vitae quam egestas,
                  finibus sem eget, maximus turpis. Nulla facilisi. Nulla quam id dapibus risus vehicula
                  aliquet. Etiam hendrerit leo quis neque tristique aliquet.</p>

                <p>Aliquam convallis massa vitae nisi, dictum lacus, viverra tellus. Nulla facilisi. Aliquam
                  eget dictum erat, vitae elementum tortor. Sed efficitur tortor mi, sed suscipit elit
                  tincidunt sit amet. Nulla porta leo sed eleifend dignissim.</p>

                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                  voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                  cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
                  est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
                  libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
                  maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                  Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut
                  et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a
                  sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis
                  doloribus asperiores repellat.</p>

                <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled
                  and demoralized by the charms of pleasure of the moment, so blinded by desire, that they
                  cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to
                  those who fail in their duty through weakness of will, which is the same as saying through
                  shrinking from toil and pain.</p>

                <p>On okamassa monita eri versiota Lorem Ipsum kappaleita, mutta suurin osa on kärsinyt
                  muokkasta joisain muodossa, joko huumorin tai satunnamaraisesti asetetuin sanoin jotka eivät
                  näytä edes vähän uskottavalta. Jos aiot käyttää kappaleita Lorem Ipsumista, sinun pitää
                  tarkastaa ettei tekstin seassa ole mitään nolatuttavaa. Kaikki Lorem Ipsum-generaattorit
                  Internetissä turivovat toistavan ennalta määritettyjä palasia tarpeen mukaan, tehden tästä
                  ensimmäisen oikean generaattorin Internetissä. Se käyttää 200 latinalaisen sanaa sanakirjaa,
                  joka on yhdisteffy kouralliseen mallilauseen rakenteita luoden Lorem Ipsumia, joka näyttää
                  järkellästä. Generoitu Lorem Ipsum on aina aina vapos toistoista, humorista jne.</p>

                {/* Author Info */}
                <div className="blog-post-meta">
                  <div
                    className="author-avatar"
                    style={{
                      backgroundImage: 'url(https://i.pravatar.cc/150?img=1)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="author-info">
                    <div className="author-name">Kiran Patel</div>
                    <div className="post-date">20 May 2023</div>
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