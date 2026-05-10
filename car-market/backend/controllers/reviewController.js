const Review = require("../models/Review")

const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body)

    res.status(201).json(review)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user")
      .populate("car")

    res.json(reviews)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createReview,
  getReviews
}
