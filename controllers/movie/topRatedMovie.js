require("dotenv").config();

const express = require("express");
const axios = require("axios");
const topRatedMovieRouter = express.Router();

const BASE_URL = "https://api.themoviedb.org/3/movie/top_rated";

topRatedMovieRouter.get("/", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;

  if (page < 1) {
    return res.status(400).json({ error: "Invalid page number" });
  }

  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        api_key: process.env.API_KEY,
        page,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching top rated movies:", error.message);
    res.status(500).json({ error: "Failed to fetch top rated movies" });
  }
});

module.exports = topRatedMovieRouter;
