const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const User = require("../models/User")

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage })

router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { username, nameEn, nameAr, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const profileImage = req.file ? `/uploads/${req.file.filename}` : ""

    const user = await User.create({
      username,
      nameEn,
      nameAr,
      email,
      password: hashedPassword,
      profileImage
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        nameEn: user.nameEn,
        nameAr: user.nameAr,
        email: user.email,
        profileImage: user.profileImage
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        nameEn: user.nameEn,
        nameAr: user.nameAr,
        email: user.email,
        profileImage: user.profileImage
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put("/profile-image/:id", upload.single("profileImage"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please select an image" })
    }

    const profileImage = `/uploads/${req.file.filename}`

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { profileImage },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({
      message: "Profile image updated",
      user: {
        _id: user._id,
        username: user.username,
        nameEn: user.nameEn,
        nameAr: user.nameAr,
        email: user.email,
        profileImage: user.profileImage
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
