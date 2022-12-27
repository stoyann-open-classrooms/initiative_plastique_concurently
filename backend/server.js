const express = require('express')
const colors = require('colors')
const cors = require('cors')
const dotenv = require('dotenv').config()
const morgan = require('morgan')
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const app = express()


// Connect to database
connectDB()
// middlewares 
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.get('/', (req, res) => {
  res.status(200).json({ message: `Bienvenue sur l'api initiative plastique` })
})


// Enable CORS
app.use(cors())
app.use(
  cors({
    origin: '*',
  }),
)

// ===============================================static Images Folder
app.use('/public/upload', express.static('./public/upload'))
// routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))


// custom error middleware
app.use(errorHandler)


app.listen(PORT, () => console.log(`server starded on port ${PORT}`))
