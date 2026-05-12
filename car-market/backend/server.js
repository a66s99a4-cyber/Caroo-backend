const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/uploads", express.static("uploads"))

app.get("/", (req, res) => {
  res.send("Car Market API is running")
})

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/cars", require("./routes/carRoutes"))
app.use("/api/favorites", require("./routes/favoriteRoutes"))
app.use("/api/messages", require("./routes/messageRoutes"))
app.use("/api/reports", require("./routes/reportRoutes"))
app.use("/api/reviews", require("./routes/reviewRoutes"))
app.use("/api/admin", require("./routes/adminRoutes"))

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.log("MONGODB_URI is missing in .env file")
  process.exit(1)
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message)
    process.exit(1)
  })
