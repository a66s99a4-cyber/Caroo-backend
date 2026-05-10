const express = require("express")
const Review = require("../models/Review")
const { protect } = require("../middleware/auth")

const router = express.Router()

router.get("/:carId", async (req, res) => {
  try {
    const reviews = await Review.find({
      car: req.params.carId
    }).populate("user", "nameEn nameAr")

    res.json(reviews)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/", protect, async (req, res) => {
  try {
    const review = await Review.create({
      car: req.body.car,
      user: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment
    })

    res.json(review)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
