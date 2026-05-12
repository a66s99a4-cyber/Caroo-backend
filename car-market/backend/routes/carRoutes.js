const express = require("express")
const multer = require("multer")
const path = require("path")
const carController = require("../controllers/carController")

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

router.get("/", carController.getCars)
router.get("/:id", carController.getSingleCar)
router.post("/", upload.array("images", 5), carController.createCar)
router.put("/:id", upload.array("images", 5), carController.updateCar)
router.delete("/:id", carController.deleteCar)

module.exports = router
