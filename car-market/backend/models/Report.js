const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true
    },

    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    reason: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "reviewed", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Report", reportSchema)
