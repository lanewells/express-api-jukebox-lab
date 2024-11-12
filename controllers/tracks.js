const Track = require("../models/track.js")
const express = require("express")
const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const createdTrack = await Track.create(req.body)
    res.status(201).json(createdTrack)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/", async (req, res) => {
  try {
    const gotTracks = await Track.find()
    res.status(200).json(gotTracks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/:trackId", async (req, res) => {
  try {
    const gotTrack = await Track.findById(req.params.trackId)
    if (!gotTrack) {
      res.status(404)
      throw new Error("Track unfound")
    }
    res.status(200).json(gotTrack)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

router.put("/:trackId", async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(
      req.params.trackId,
      req.body,
      {
        new: true
      }
    )
    if (!updatedTrack) {
      res.status(404)
      throw new Error("Track unfound")
    }
    res.status(200).json(updatedTrack)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

router.delete("/:trackId", async (req, res) => {
  try {
    const deletedTrack = await Track.findByIdAndDelete(req.params.trackId)
    if (!deletedTrack) {
      res.status(404)
      throw new Error("Track unfound")
    }
    res.status(200).json(`${deletedTrack.title} has been deleted`)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

module.exports = router
