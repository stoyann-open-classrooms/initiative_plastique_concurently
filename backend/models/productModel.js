const mongoose = require('mongoose')
const slugify = require('slugify')

const ProductSchema = new mongoose.Schema(
  {
    slug: String,
    image: {
      type: String,
      required: [
        true,
        'Vous devez charger une photo pour ajouter un produit en base de donées',
      ],
    },
    name: {
      type: String,
      required: [true, "Merci d'entrer un nom de produit"],
      trim: true,
      maxlength: [20, 'Le nom doit contenir au maximum 20 caractères'],
    },
    designation: {
      type: String,
      required: [true, "Merci d'entrer un nom de produit"],
      trim: true,
      maxlength: [100, 'Le nom doit contenir au maximum 50 caractères'],
    },
    refference: {
      type: String,
      required: [true, "Merci d'entrer une refference"],
      unique: true,
      trim: true,
      maxlength: [10, 'La refference doit contenir au maximum 10 caractères'],
    },
    rupture: {
      Boolean,
      default: false,
    },

    stock: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
)

// Create  order slug from the order number
ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.refference, { lower: true })
  next()
})
// Create boolean rupture stock
ProductSchema.pre('save', function (next) {
  if (this.stock === 0) {
    this.rupture = true
  } else {
    this.rupture = false
  }
  next()
})

module.exports = mongoose.model('Product', ProductSchema)
