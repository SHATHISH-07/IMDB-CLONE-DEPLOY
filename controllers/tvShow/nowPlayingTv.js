require("dotenv").config();

const express = require("express");
const axios = require("axios");
const nowPlayingTvRouter = express.Router();

const BASE_URL = "https://api.themoviedb.org/3/tv/airing_today";

nowPlayingTvRouter.get("/", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;

  if (page < 1) {
    return res.status(400).json({ error: "Invalid page number" });
  }

  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        api_key: process.env.API_KEY,
        page,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching now playing tv shows:", error.message);
    res.status(500).json({ error: "Failed to fetch now playing tv shows" });
  }
});

module.exports = nowPlayingTvRouter;
