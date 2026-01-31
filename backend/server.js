const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./data/db.json')
const middlewares = jsonServer.defaults()
const cors = require('cors')

server.use(cors())
server.use(middlewares)
server.use(jsonServer.bodyParser)

// ==================== CUSTOM ROUTES ====================

// 1. Home banner by page name (custom mapping)
server.get('/api/homeBanners/page/:pageName', (req, res) => {
  const { pageName } = req.params
  const db = router.db
  
  const pageMapping = {
    'home': 1,
    'about': 2,
    'shop': 3,
    'blog': 4,
    'contact': 5,
    'account': 6,
    'cart': 7,
    'wishlist': 8,
    'product': 9
  }
  
  const bannerId = pageMapping[pageName]
  if (bannerId) {
    const banner = db.get('homeBanners').find({ id: bannerId }).value()
    if (banner) {
      res.json(banner)
    } else {
      res.status(404).json({ error: 'Banner not found' })
    }
  } else {
    res.status(400).json({ error: 'Invalid page name' })
  }
})

// 2. Get about content (single item from array)
server.get('/api/aboutContent/1', (req, res) => {
  const db = router.db
  const aboutContent = db.get('aboutContent').value()
  
  if (aboutContent && aboutContent.length > 0) {
    res.json(aboutContent[0]) // First item in array
  } else {
    res.status(404).json({ error: 'About content not found' })
  }
})

// 3. Get blog home data
server.get('/api/blogHome', (req, res) => {
  const db = router.db
  const blogs = db.get('blogs').value()
  
  if (blogs && blogs.homeBlogs) {
    res.json(blogs.homeBlogs)
  } else {
    res.status(404).json({ error: 'Blog home data not found' })
  }
})

// 4. Get top rating products by category
server.get('/api/topRatingProducts/:category', (req, res) => {
  const { category } = req.params
  const db = router.db
  
  const topRatingProducts = db.get('topRatingProducts').value()
  
  if (topRatingProducts && topRatingProducts[category]) {
    res.json(topRatingProducts[category])
  } else {
    res.status(404).json({ error: `Category '${category}' not found` })
  }
})

// 5. Get blog pages
server.get('/api/blogPages', (req, res) => {
  const db = router.db
  const blogs = db.get('blogs').value()
  
  if (blogs && blogs.blogPages) {
    // Transform object to array
    const blogPagesArray = Object.keys(blogs.blogPages).map(page => ({
      page: parseInt(page),
      ...blogs.blogPages[page]
    }))
    res.json(blogPagesArray)
  } else {
    res.status(404).json({ error: 'Blog pages not found' })
  }
})

// 6. Get specific blog page
server.get('/api/blogPages/:page', (req, res) => {
  const { page } = req.params
  const db = router.db
  const blogs = db.get('blogs').value()
  
  if (blogs && blogs.blogPages && blogs.blogPages[page]) {
    res.json({
      page: parseInt(page),
      ...blogs.blogPages[page]
    })
  } else {
    res.status(404).json({ error: `Blog page ${page} not found` })
  }
})

// 7. Get inner blog
server.get('/api/innerBlog/:id', (req, res) => {
  const { id } = req.params
  const db = router.db
  
  // Try to find in innerBlog array (create if doesn't exist)
  const innerBlogs = db.get('innerBlog').value()
  
  if (innerBlogs) {
    const blog = Array.isArray(innerBlogs) 
      ? innerBlogs.find(b => b.id === parseInt(id))
      : null
    
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).json({ error: 'Inner blog not found' })
    }
  } else {
    // Create default inner blog if doesn't exist
    const defaultInnerBlog = {
      id: 1,
      title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      author: "Kiran Patel",
      date: "20 May 2023",
      authorImage: "img/ic_kiran.png",
      comments: [
        {
          id: 1,
          name: "Priya Sharma",
          date: "25 May 2023",
          text: "Excellent blog post! Very informative and well-written.",
          avatar: "https://i.pravatar.cc/150?img=1"
        },
        {
          id: 2,
          name: "Rahul Verma",
          date: "22 May 2023",
          text: "Thanks for sharing this valuable information. Looking forward to more posts!",
          avatar: "https://i.pravatar.cc/150?img=2"
        }
      ]
    }
    res.json(defaultInnerBlog)
  }
})

// Add to Wishlist endpoint
server.post('/api/wishlistItems', (req, res) => {
  const db = router.db;
  const newItem = req.body;
  
  // Generate ID if not provided
  if (!newItem.id) {
    const wishlistItems = db.get('wishlistItems').value();
    newItem.id = wishlistItems.length > 0 
      ? Math.max(...wishlistItems.map(item => item.id)) + 1 
      : 1;
  }
  
  // Add to wishlist
  db.get('wishlistItems').push(newItem).write();
  res.status(201).json(newItem);
});

// Add to Cart endpoint
server.post('/api/cartItems', (req, res) => {
  const db = router.db;
  const newItem = req.body;
  
  // Generate ID if not provided
  if (!newItem.id) {
    const cartItems = db.get('cartItems').value();
    newItem.id = cartItems.length > 0 
      ? Math.max(...cartItems.map(item => item.id)) + 1 
      : 1;
  }
  
  // Add to cart
  db.get('cartItems').push(newItem).write();
  res.status(201).json(newItem);
});

// Use the router for all other endpoints
server.use('/api', router)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`)
  console.log(`API available at http://localhost:${PORT}/api`)
  console.log('\nAvailable custom endpoints:')
  console.log('GET /api/homeBanners/page/:pageName')
  console.log('GET /api/aboutContent/1')
  console.log('GET /api/blogHome')
  console.log('GET /api/topRatingProducts/:category')
  console.log('GET /api/blogPages')
  console.log('GET /api/blogPages/:page')
  console.log('GET /api/innerBlog/:id')
})