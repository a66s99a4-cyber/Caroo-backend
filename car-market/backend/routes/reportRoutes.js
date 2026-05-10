const express = require("express")
const Report = require("../models/Report")
const { protect } = require("../middleware/auth")

const router = express.Router()

router.get("/", protect, async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("car")
      .populate("reporter", "nameEn nameAr")

    res.json(reports)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/", protect, async (req, res) => {
  try {
    const report = await Report.create({
      car: req.body.car,
      reporter: req.user._id,
      reason: req.body.reason
    })

    res.json(report)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
