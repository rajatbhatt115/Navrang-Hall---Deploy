import { useState } from 'react'
import { Container } from 'react-bootstrap'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you for subscribing with email: ${email}`)
    setEmail('')
  }

  return (
    <section className="newsletter-section" style={sectionStyle}>
      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Our Newsletter.</h2>
        <div style={formContainerStyle}>
          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="email"
              placeholder="Your email address"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" style={buttonStyle}>Subscribe</button>
          </form>
        </div>
      </Container>
    </section>
  )
}

// Inline styles
const sectionStyle = {
  padding: '60px 0',
  backgroundColor: '#f8f9fa'
}

const formContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const formStyle = {
  display: 'flex',
  maxWidth: '600px',
  width: '100%',
  gap: '15px'
}

const inputStyle = {
  flex: 1,
  padding: '12px 20px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '16px',
  transition: 'border-color 0.3s ease'
}

const buttonStyle = {
  padding: '12px 30px',
  backgroundColor: '#FF7E00',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
}

export default Newsletter