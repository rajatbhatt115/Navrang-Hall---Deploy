import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import { FaRupeeSign, FaThLarge, FaRuler, FaSort, FaHeart, FaShoppingCart, FaStar, FaStarHalfAlt } from 'react-icons/fa'

const Shop = () => {
  const [filters, setFilters] = useState({
    price: [],
    category: [],
    size: [],
    sort: 'popularity'
  })
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showMenu, setShowMenu] = useState('')
  const productsPerPage = 6

  // Sample product data
  const allProducts = [
    {
      id: 1,
      title: "Elegant Evening Dress",
      price: 2000,
      category: "Female",
      sizes: ["S", "M", "L"],
      rating: 4.9,
      image: "img/western.png",
      isNew: true
    },
    {
      id: 2,
      title: "Floral Summer Dress",
      price: 2500,
      category: "Female",
      sizes: ["M", "L", "XL"],
      rating: 4.8,
      image: "img/img_dress.png",
      isNew: false
    },
    {
      id: 3,
      title: "Casual Party Wear",
      price: 2000,
      category: "Female",
      sizes: ["S", "M"],
      rating: 4.9,
      image: "img/img_western.png",
      isNew: true
    },
    {
      id: 4,
      title: "Designer Saree",
      price: 3500,
      category: "Female",
      sizes: ["M", "L", "XL"],
      rating: 4.9,
      image: "img/saree.png",
      isNew: false
    },
    {
      id: 5,
      title: "Traditional Lehenga",
      price: 4500,
      category: "Female",
      sizes: ["S", "M", "L"],
      rating: 4.8,
      image: "img/navratri.png",
      isNew: true
    },
    {
      id: 6,
      title: "Modern Ethnic Wear",
      price: 2800,
      category: "Female",
      sizes: ["M", "L", "XL"],
      rating: 4.9,
      image: "img/gown.png",
      isNew: false
    },
    {
      id: 7,
      title: "Bridal Lehenga",
      price: 5500,
      category: "Female",
      sizes: ["S", "M"],
      rating: 5.0,
      image: "img/fe1.png",
      isNew: true
    },
    {
      id: 8,
      title: "Office Formal Suit",
      price: 3200,
      category: "Male",
      sizes: ["M", "L", "XL"],
      rating: 4.7,
      image: "img/img_ankit.png",
      isNew: false
    },
    {
      id: 9,
      title: "Silk Saree",
      price: 4200,
      category: "Female",
      sizes: ["S", "M", "L"],
      rating: 4.9,
      image: "img/fe6.png",
      isNew: true
    },
    {
      id: 10,
      title: "Kids Casual Dress",
      price: 1500,
      category: "Kids",
      sizes: ["S", "M"],
      rating: 4.5,
      image: "img/kids_dress.jpg",
      isNew: true
    },
    {
      id: 11,
      title: "Gold Necklace Set",
      price: 8000,
      category: "Jewellery",
      sizes: ["One Size"],
      rating: 4.9,
      image: "img/jewellery1.jpg",
      isNew: false
    },
    {
      id: 12,
      title: "Men's Formal Suit",
      price: 3800,
      category: "Male",
      sizes: ["M", "L", "XL"],
      rating: 4.6,
      image: "img/me2.png",
      isNew: true
    }
  ]

  useEffect(() => {
    setProducts(allProducts)
    setFilteredProducts(allProducts)
  }, [])

  useEffect(() => {
    filterProducts()
  }, [filters])

  const toggleMenu = (menu) => {
    setShowMenu(showMenu === menu ? '' : menu)
  }

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      if (type === 'sort') {
        newFilters[type] = value
      } else {
        if (newFilters[type].includes(value)) {
          newFilters[type] = newFilters[type].filter(item => item !== value)
        } else {
          newFilters[type] = [...newFilters[type], value]
        }
      }
      return newFilters
    })
    setCurrentPage(1)
  }

  const filterProducts = () => {
    let filtered = [...allProducts]

    // Price filter
    if (filters.price.length > 0) {
      filtered = filtered.filter(product => {
        return filters.price.some(filter => {
          switch(filter) {
            case 'under-1000': return product.price < 1000
            case '1000-2000': return product.price >= 1000 && product.price <= 2000
            case '2000-3000': return product.price >= 2000 && product.price <= 3000
            case 'above-3000': return product.price > 3000
            default: return true
          }
        })
      })
    }

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(product => 
        filters.category.includes(product.category)
      )
    }

    // Size filter
    if (filters.size.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => filters.size.includes(size))
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      switch(filters.sort) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'newest':
          return b.isNew - a.isNew
        case 'popularity':
        default:
          return b.rating - a.rating
      }
    })

    setFilteredProducts(filtered)
  }

  const clearAllFilters = () => {
    setFilters({
      price: [],
      category: [],
      size: [],
      sort: 'popularity'
    })
    setCurrentPage(1)
  }

  const removeFilter = (type, value) => {
    handleFilterChange(type, value)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} />)
      } else {
        stars.push(<FaStar key={i} style={{ color: '#ddd' }} />)
      }
    }
    return stars
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  return (
    <>
      <HeroSection
  title="Shop"
  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  imageUrl="img/img_banner_shop.png"
  isShopPage={true}  // Yaha se button hide hoga
/>

      {/* Products Filter & Display Section */}
      <section className="filter-section">
        <Container>
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Browse and filter our exclusive collection</p>
          
          <div className="filter-container">
            {/* Price Filter */}
            <div className="filter-dropdown price-filter">
              <button className="filter-btn" onClick={() => toggleMenu('price')}>
                <span><FaRupeeSign /> Price</span>
                <i className={`fas fa-chevron-${showMenu === 'price' ? 'up' : 'down'}`}></i>
              </button>
              {showMenu === 'price' && (
                <div className="filter-menu show">
                  {['under-1000', '1000-2000', '2000-3000', 'above-3000'].map(option => (
                    <div className="filter-option" key={option}>
                      <input
                        type="checkbox"
                        id={option}
                        checked={filters.price.includes(option)}
                        onChange={() => handleFilterChange('price', option)}
                      />
                      <label htmlFor={option}>
                        {option === 'under-1000' ? 'Under ₹1000' :
                         option === '1000-2000' ? '₹1000 - ₹2000' :
                         option === '2000-3000' ? '₹2000 - ₹3000' : 'Above ₹3000'}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Categories Filter */}
            <div className="filter-dropdown">
              <button className="filter-btn" onClick={() => toggleMenu('category')}>
                <span><FaThLarge /> Categories</span>
                <i className={`fas fa-chevron-${showMenu === 'category' ? 'up' : 'down'}`}></i>
              </button>
              {showMenu === 'category' && (
                <div className="filter-menu show">
                  {['Female', 'Kids', 'Male', 'Jewellery'].map(category => (
                    <div className="filter-option" key={category}>
                      <input
                        type="checkbox"
                        id={`cat-${category}`}
                        checked={filters.category.includes(category)}
                        onChange={() => handleFilterChange('category', category)}
                      />
                      <label htmlFor={`cat-${category}`}>{category}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sizes Filter */}
            <div className="filter-dropdown">
              <button className="filter-btn" onClick={() => toggleMenu('size')}>
                <span><FaRuler /> Sizes</span>
                <i className={`fas fa-chevron-${showMenu === 'size' ? 'up' : 'down'}`}></i>
              </button>
              {showMenu === 'size' && (
                <div className="filter-menu show">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <div className="filter-option" key={size}>
                      <input
                        type="checkbox"
                        id={`size-${size}`}
                        checked={filters.size.includes(size)}
                        onChange={() => handleFilterChange('size', size)}
                      />
                      <label htmlFor={`size-${size}`}>{size}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Order Filter */}
            <div className="filter-dropdown">
              <button className="filter-btn" onClick={() => toggleMenu('sort')}>
                <span><FaSort /> Sort Order</span>
                <i className={`fas fa-chevron-${showMenu === 'sort' ? 'up' : 'down'}`}></i>
              </button>
              {showMenu === 'sort' && (
                <div className="filter-menu show">
                  {[
                    { value: 'popularity', label: 'Popularity' },
                    { value: 'price-low', label: 'Price: Low to High' },
                    { value: 'price-high', label: 'Price: High to Low' },
                    { value: 'newest', label: 'Newest First' }
                  ].map(sortOption => (
                    <div className="filter-option" key={sortOption.value}>
                      <input
                        type="radio"
                        name="sort"
                        id={`sort-${sortOption.value}`}
                        checked={filters.sort === sortOption.value}
                        onChange={() => handleFilterChange('sort', sortOption.value)}
                      />
                      <label htmlFor={`sort-${sortOption.value}`}>{sortOption.label}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(filters.price.length > 0 || filters.category.length > 0 || filters.size.length > 0) && (
            <div className="filter-status active" id="filterStatus">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-muted">Active Filters:</small>
                <button className="btn btn-sm btn-link text-danger p-0" onClick={clearAllFilters}>
                  Clear All
                </button>
              </div>
              <div className="active-filters" id="activeFilters">
                {filters.price.map(filter => (
                  <div className="active-filter" key={`price-${filter}`}>
                    {filter === 'under-1000' ? 'Under ₹1000' :
                     filter === '1000-2000' ? '₹1000 - ₹2000' :
                     filter === '2000-3000' ? '₹2000 - ₹3000' : 'Above ₹3000'}
                    <span className="remove-filter" onClick={() => removeFilter('price', filter)}>
                      &times;
                    </span>
                  </div>
                ))}
                {filters.category.map(category => (
                  <div className="active-filter" key={`category-${category}`}>
                    {category}
                    <span className="remove-filter" onClick={() => removeFilter('category', category)}>
                      &times;
                    </span>
                  </div>
                ))}
                {filters.size.map(size => (
                  <div className="active-filter" key={`size-${size}`}>
                    {size}
                    <span className="remove-filter" onClick={() => removeFilter('size', size)}>
                      &times;
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Products Display Section */}
      <section className="products-section">
        <Container>
          {currentProducts.length > 0 ? (
            <>
              <Row id="productsContainer">
                {currentProducts.map(product => (
                  <Col lg={4} md={6} key={product.id}>
                    <Link to={`/product/${product.id}`} className="product-link">
                      <div className="product-card">
                        <div 
                          className="product-image" 
                          style={{ backgroundImage: `url(${product.image})` }}
                        >
                          {product.isNew && (
                            <div className="badge-new">NEW</div>
                          )}
                          <div className="product-actions">
                            <button className="action-btn" onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              alert(`Added ${product.title} to wishlist`)
                            }}>
                              <FaHeart />
                            </button>
                            <button className="action-btn" onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              alert(`Added ${product.title} to cart`)
                            }}>
                              <FaShoppingCart />
                            </button>
                          </div>
                        </div>
                        <div className="product-info">
                          <h3 className="product-title">{product.title}</h3>
                          <div className="size-options">
                            {product.sizes.map(size => (
                              <span className="size-option" key={size}>{size}</span>
                            ))}
                          </div>
                          <div className="product-footer">
                            <div className="product-price">
                              <span className="price-tag">₹ {product.price}</span>
                            </div>
                            <div className="product-rating">
                              <span className="rating-value">{product.rating}</span>
                              <div className="stars">
                                {renderStars(product.rating)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="products-pagination" id="productsPagination">
                  {[...Array(totalPages)].map((_, index) => (
                    <div
                      key={index}
                      className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="no-results show" id="noResults">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h4>No products found</h4>
              <p className="text-muted">Try adjusting your filters to find what you're looking for.</p>
              <button className="btn-read-more mt-3" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

export default Shop