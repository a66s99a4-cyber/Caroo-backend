const express = require("express")
const Message = require("../models/Message")
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
      .populate("sender", "nameEn nameAr")
      .populate("receiver", "nameEn nameAr")
      .populate("car", "title")

    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/", protect, async (req, res) => {
  try {
    const message = await Message.create({
      sender: req.user._id,
      receiver: req.body.receiver,
      car: req.body.car,
      text: req.body.text
    })

    res.json(message)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
