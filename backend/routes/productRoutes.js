const express = require('express')
const router = express.Router({mergeParams: true})

//controllers
const { getProducts, createProduct, getProduct, updateProduct, deleteProduct, upload } = require('../controllers/productController')



router.route('/').get(getProducts).post(upload, createProduct)

router
  .route('/:id')
  .get(getProduct)
  .post(createProduct)
  .put( updateProduct)
  .delete( deleteProduct)

module.exports = router
