const express = require("express")
const Review = require("../models/Review")
const { protect } = require("../middleware/auth")

const router = express.Router()

router.get("/:carId", async (req, res) => {
  try {
    const reviews = await Review.find({ car: req.params.carId })
      .populate("user", "nameEn nameAr profileImage")
      .sort({ createdAt: -1 })

    res.json(reviews)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/", protect, async (req, res) => {
  try {
    const oldReview = await Review.findOne({
      car: req.body.car,
      user: req.user._id
    })

    if (oldReview) {
      oldReview.rating = req.body.rating
      oldReview.comment = req.body.comment
      await oldReview.save()

      const updatedReview = await Review.findById(oldReview._id)
        .populate("user", "nameEn nameAr profileImage")

      return res.json(updatedReview)
    }

    const review = await Review.create({
      car: req.body.car,
      user: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment
    })

    const fullReview = await Review.findById(review._id)
      .populate("user", "nameEn nameAr profileImage")

    res.json(fullReview)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
