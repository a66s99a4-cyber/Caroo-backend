const express = require("express")
const Message = require("../models/Message")
const Car = require("../models/Car")
const { protect } = require("../middleware/auth")

const router = express.Router()

router.get("/", protect, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id }
      ]
    })
      .populate("sender", "nameEn nameAr profileImage")
      .populate("receiver", "nameEn nameAr profileImage")
      .populate("car", "title brand price images")
      .sort({ createdAt: -1 })

    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/car/:carId", async (req, res) => {
  try {
    const messages = await Message.find({ car: req.params.carId })
      .populate("sender", "nameEn nameAr profileImage")
      .populate("receiver", "nameEn nameAr profileImage")
      .sort({ createdAt: 1 })

    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/car/:carId", protect, async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId)

    if (!car) {
      return res.status(404).json({ message: "Car not found" })
    }

    const message = await Message.create({
      car: req.params.carId,
      sender: req.user._id,
      receiver: car.seller,
      text: req.body.text
    })

    const fullMessage = await Message.findById(message._id)
      .populate("sender", "nameEn nameAr profileImage")
      .populate("receiver", "nameEn nameAr profileImage")

    res.json(fullMessage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
