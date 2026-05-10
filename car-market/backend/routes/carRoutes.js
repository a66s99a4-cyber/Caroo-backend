const router = require("express").Router()
const carController = require("../controllers/carController")

router.get("/", carController.getCars)

router.get("/:id", carController.getSingleCar)

router.post("/", carController.createCar)

router.put("/:id", carController.updateCar)

router.delete("/:id", carController.deleteCar)

module.exports = router
