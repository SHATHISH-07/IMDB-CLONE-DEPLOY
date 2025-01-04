require("dotenv").config();

const express = require("express");
const axios = require("axios");
const trendingMovieRouter = express.Router();

const BASE_URL = "https://api.themoviedb.org/3/trending/movie";

// Route for trending movies (day)
trendingMovieRouter.get("/day", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;

  try {
    const { data } = await axios.get(`${BASE_URL}/day`, {
      params: {
        api_key: process.env.API_KEY,
        page,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching trending movies (day):", error.message);
    res.status(500).json({ error: "Failed to fetch trending movies for day" });
  }
});

// Route for trending movies (week)
trendingMovieRouter.get("/week", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;

  try {
    const { data } = await axios.get(`${BASE_URL}/week`, {
      params: {
        api_key: process.env.API_KEY,
        page,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching trending movies (week):", error.message);
    res.status(500).json({ error: "Failed to fetch trending movies for week" });
  }
});

module.exports = trendingMovieRouter;
