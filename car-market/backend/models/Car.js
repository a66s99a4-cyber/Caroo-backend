const mongoose = require("mongoose")

const carSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    model: String,
    year: Number,
    price: Number,
    fuelType: String,
    transmission: String,
    mileage: Number,
    color: String,
    location: String,
    description: String,

    images: [String],

    condition: {
      type: String,
      enum: ["new", "used"],
      default: "used"
    },

    status: {
      type: String,
      enum: ["available", "sold", "pending"],
      default: "available"
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Car", carSchema)
