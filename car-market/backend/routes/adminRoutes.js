const router = require("express").Router()
const carController = require("../controllers/carController")
const reportController = require("../controllers/reportController")

router.get("/cars", carController.getCars)
router.post("/cars", carController.createCar)
router.put("/cars/:id", carController.updateCar)
router.delete("/cars/:id", carController.deleteCar)

router.get("/reports", reportController.getReports)

module.exports = router
