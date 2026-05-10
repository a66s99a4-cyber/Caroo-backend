const Car = require("../models/Car")

const getCars = async (req, res) => {
  try {
    const cars = await Car.find()
      .populate("brand")
      .populate("seller")

    res.json(cars)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getSingleCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate("brand")
      .populate("seller")

    if (!car) {
      return res.status(404).json({ message: "Car not found" })
    }

    res.json(car)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body)

    res.status(201).json(car)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updatedCar)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id)

    res.json({ message: "Car deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getCars,
  getSingleCar,
  createCar,
  updateCar,
  deleteCar
}
