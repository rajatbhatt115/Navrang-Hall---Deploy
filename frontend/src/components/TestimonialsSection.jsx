import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Harold Patel',
      text: '"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable."',
      avatarClass: 'testimonial-avatar1'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      text: '"I absolutely love the quality of clothes from Shree Laxmi Mall. The fabrics are premium and the designs are trendy. My friends always ask me where I shop!"',
      avatarClass: 'testimonial-avatar2'
    },
    {
      id: 3,
      name: 'Rahul Verma',
      text: '"The customer service is exceptional. They helped me find the perfect outfit for my sister\'s wedding. The delivery was prompt and the packaging was beautiful."',
      avatarClass: 'testimonial-avatar3'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="testimonials-section">
      <Container>
        <h2>Our Testimonials.</h2>
        
        <div className="testimonial-slider">
          <button className="testimonial-arrow prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          
          <button className="testimonial-arrow next" onClick={nextSlide}>
            <FaChevronRight />
          </button>

          <div 
            className="testimonial-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map(testimonial => (
              <div className="testimonial-slide" key={testimonial.id}>
                <div className="testimonial-card">
                  <div className={testimonial.avatarClass}></div>
                  <p className="fst-italic">{testimonial.text}</p>
                  <h5>{testimonial.name}</h5>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonial-nav">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`testimonial-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default TestimonialsSection