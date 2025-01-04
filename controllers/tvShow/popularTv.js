require("dotenv").config();

const express = require("express");
const axios = require("axios");
const popularTvRouter = express.Router();

const BASE_URL = "https://api.themoviedb.org/3/tv/popular";

popularTvRouter.get("/", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;

  if (page < 1) {
    return res.status(400).json({ error: "Invalid page number" });
  }

  try {
    const { data } = await axios.get(
      `${BASE_URL}?api_key=${process.env.API_KEY}&page=${page}`
    );

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching popular tv shows:", error.message);
    res.status(500).json({ error: "Failed to fetch popular tv shows" });
  }
});

module.exports = popularTvRouter;
