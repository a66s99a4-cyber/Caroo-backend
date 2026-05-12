const Car = require("../models/Car")

const getCars = async (req, res) => {
  try {
    const cars = await Car.find()
      .populate("seller")
      .sort({ createdAt: -1 })

    res.json(cars)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getSingleCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate("seller")

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
    const images = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : []

    const car = await Car.create({
      title: req.body.title,
      brand: req.body.brand,
      category: req.body.category,
      year: Number(req.body.year),
      price: Number(req.body.price),
      mileage: Number(req.body.mileage),
      description: req.body.description,
      phone: req.body.phone,
      seller: req.body.seller,
      images
    })

    res.status(201).json(car)
  } catch (error) {
    console.log("CREATE CAR ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}

const updateCar = async (req, res) => {
  try {
    const updateData = {
      ...req.body
    }

    if (req.body.year) updateData.year = Number(req.body.year)
    if (req.body.price) updateData.price = Number(req.body.price)
    if (req.body.mileage) updateData.mileage = Number(req.body.mileage)

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => `/uploads/${file.filename}`)
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("seller")

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
