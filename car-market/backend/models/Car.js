const mongoose = require("mongoose")

const carSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, default: 0 },
    description: { type: String, default: "" },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ["Available", "Sold"],
      default: "Available"
    },
    images: {
      type: [String],
      default: []
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Car", carSchema)
