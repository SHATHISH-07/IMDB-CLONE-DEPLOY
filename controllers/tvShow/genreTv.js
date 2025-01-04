require("dotenv").config();
const express = require("express");
const axios = require("axios");
const genreTvRouter = express.Router();

const BASE_URL = "https://api.themoviedb.org/3/genre/tv/list";
const GENRE_SEARCH_URI = "https://api.themoviedb.org/3/discover/tv";

genreTvRouter.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}`, {
      params: {
        api_key: process.env.API_KEY,
        language: req.query.language || "en-US",
      },
    });
    res.status(200).json(data.genres);
  } catch (error) {
    console.error("Error fetching genres:", error.message);
    res.status(500).json({ error: "Failed to fetch genres" });
  }
});

genreTvRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const page = parseInt(req.query.page, 10) || 1;
  try {
    const { data } = await axios.get(GENRE_SEARCH_URI, {
      params: {
        api_key: process.env.API_KEY,
        with_genres: id,
        page,
        language: req.query.language || "en-US",
      },
    });
    res.status(200).json(data.results);
  } catch (error) {
    console.error("Error fetching tv shows by genre:", error.message);
    res.status(500).json({ error: "Failed to fetch tv shows by genre" });
  }
});

module.exports = genreTvRouter;
