const Message = require("../models/Message")

const sendMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body)

    res.status(201).json(message)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("sender")
      .populate("receiver")

    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  sendMessage,
  getMessages
}
