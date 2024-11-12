const mongoose = require("mongoose")

const trackSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    description: "The title of the track"
  },
  artist: {
    type: String,
    required: true,
    description: "The artist of the track"
  },
  duration: Number
})

const Track = mongoose.model("Track", trackSchema)
module.exports = Track
