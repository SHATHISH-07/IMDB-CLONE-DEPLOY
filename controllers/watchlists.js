require("dotenv").config();
const express = require("express");
const watchListRouter = express.Router();
const WatchList = require("../models/watchListModel");
const middleware = require("../utils/middleware"); // Import your middleware

// Get the user's watchlist
watchListRouter.get(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    try {
      const userWatchList = await WatchList.find({
        user: req.user.id,
      }).populate("user", "username");
      res.json(userWatchList);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch watchList." });
    }
  }
);

// Add a movie to the watchlist
watchListRouter.post("/", async (req, res) => {
  const { movieId, title, poster_path, mediaType, rating, releasedAt } =
    req.body;
  const userid = req.user.id;

  if (!movieId || !title || !poster_path || !mediaType) {
    return res.status(400).json({
      error:
        "All fields (movieId, title, poster_path, mediaType, rating, releasedAt) are required.",
    });
  }

  try {
    const newEntry = new WatchList({
      user: userid,
      movieId,
      title,
      poster_path,
      mediaType,
      rating,
      releasedAt,
    });
    await newEntry.save();

    req.user.watchList = req.user.watchList.concat(newEntry._id);
    await req.user.save();

    res.status(201).json(newEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add movie to watchList." });
  }
});

// Delete a movie from the watchlist
watchListRouter.delete("/:id", async (req, res) => {
  try {
    const deletedWatchList = await WatchList.findOneAndDelete({
      user: req.user.id,
      _id: req.params.id,
    });

    if (!deletedWatchList) {
      return res.status(404).json({ error: "WatchList not found." });
    }

    req.user.watchList = req.user.watchList.filter(
      (watchListId) => !watchListId.equals(deletedWatchList._id)
    );
    await req.user.save();

    res.json({ message: "WatchList deleted successfully." });
  } catch (err) {
    console.error("Error deleting from watchlist:", err);
    res.status(500).json({ error: "Failed to delete watchList." });
  }
});

module.exports = watchListRouter;
