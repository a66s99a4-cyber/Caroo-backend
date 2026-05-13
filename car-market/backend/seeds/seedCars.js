const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const mongoose = require("mongoose")
const Car = require("../models/Car")
require("dotenv").config()

const cars = require("./cars.seed.json")

const OWNER_ID = "6a01e43b20a96a8c0a650988"

const fixedCars = cars.map((car) => {
  return {
    ...car,
    seller: OWNER_ID,
    user: OWNER_ID,
    owner: OWNER_ID,
    phone: "66937709"
  }
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Connected")

    await Car.deleteMany()
    await Car.insertMany(fixedCars)

    console.log("Cars Inserted Successfully")
    process.exit()
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
