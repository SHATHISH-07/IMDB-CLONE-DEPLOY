require("dotenv").config();

const express = require("express");
const axios = require("axios");
const movieCollectionRouter = express.Router();

const BASE_URL = "https://api.themoviedb.org/3/collection";

movieCollectionRouter.get("/:id", async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${req.params.id}`, {
      params: {
        api_key: process.env.API_KEY,
        language: req.query.language || "en-US",
      },
    });

    // Return the collection details along with the list of movies in the collection
    res.status(200).json({
      name: data.name,
      poster_path: data.poster_path,
      backdrop_path: data.backdrop_path,
      parts: data.parts, // List of movies in the collection
    });
  } catch (error) {
    console.error("Error fetching movie collection:", error.message);
    res.status(500).json({ error: "Failed to fetch movie collection" });
  }
});

module.exports = movieCollectionRouter;
