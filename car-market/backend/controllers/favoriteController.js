const Favorite = require("../models/Favorite")

const addFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.create(req.body)

    res.status(201).json(favorite)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find()
      .populate("user")
      .populate("car")

    res.json(favorites)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  addFavorite,
  getFavorites
}
