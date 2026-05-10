const express = require("express")
const Favorite = require("../models/Favorite")
const { protect } = require("../middleware/auth")

const router = express.Router()

router.get("/", protect, async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.user._id
    }).populate({
      path: "car",
      populate: ["brand", "category"]
    })

    res.json(favorites)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/:carId", protect, async (req, res) => {
  try {
    const exists = await Favorite.findOne({
      user: req.user._id,
      car: req.params.carId
    })

    if (exists) {
      await exists.deleteOne()

      return res.json({
        message: "Removed from favorites"
      })
    }

    const favorite = await Favorite.create({
      user: req.user._id,
      car: req.params.carId
    })

    res.json(favorite)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
