const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const mongoose = require("mongoose")
const Car = require("./models/Car")
require("dotenv").config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Connected")

    await Car.deleteMany({})

    console.log("All cars deleted successfully")
    process.exit()
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
