// ==== Dependances
const asyncHandler = require('express-async-handler')

// image Upload dependence

const multer = require("multer");
// const path = require("path");

// ==== Models
const Product = require('../models/productModel');



// @ description GET all orders
//@routes  GET /api/v1/orders
//@access   Public

const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find(req.query)
  res
    .status(200)
    .json({ success: true, count: products.length, data: products })
})

// @ description GET single bootcamps
//@routes  GET /api/v1/bootcamps/:id
//@access   Public

const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  res.status(200).json({ success: true, data: product })
  if (!product) {
    return next(
      new ErrorResponse(`Order not found with id of ${req.params.id}`, 404),
    )
  }
})

// @ description  create new bootcamp
//@routes  POST /api/v1/bootcamps/:id
//@access   Private

const createProduct = asyncHandler(async (req, res, next) => {
  const { refference, designation, name } = req.body
  const product = await Product.create({
    // image : req.file.path,
    name: name,
    refference: refference,
    designation: designation,
  })
  res.status(201).json({
    success: true,
    data: product,
  })
})

// @ description  update kanban
//@routes  PUT /api/v1/kanbans/:id
//@access   Private

const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!product) {
    return next(
      new ErrorResponse(`order not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({ success: true, data: product })
})

// @ description  delete  new kanban
//@routes  DELETE /api/v1/kanbans/:id
//@access   Private

const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) {
    return next(
      new ErrorResponse(`order not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({ success: true, data: {} })
})



// // =========================== UPLOAD IMAGE CONTROLLER ========================================

const im = "product_";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, im + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Le fichier doit être au format JPG , JPEG , PNG ou GIF");
  },
}).single("image");


module.exports = {
   getProduct,
   upload,
   getProducts,
   createProduct, 
   deleteProduct,
   updateProduct
    
  }
  