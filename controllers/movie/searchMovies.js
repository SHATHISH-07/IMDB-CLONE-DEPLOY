require("dotenv").config();

const express = require("express");
const axios = require("axios");
const searchMoviesRouter = express.Router();

const BASE_URL = "https://api.themoviedb.org/3/movie";
const BASE_URL_SEARCH = "https://api.themoviedb.org/3/search/movie";

searchMoviesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const { data } = await axios.get(`${BASE_URL}/${id}`, {
      params: {
        api_key: process.env.API_KEY,
        language: req.query.language || "en-US",
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log("Error fetching movie:", error);
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

searchMoviesRouter.get("/", async (req, res) => {
  const query = req.query.query;
  const page = parseInt(req.query.page, 10) || 1;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  if (page < 1) {
    return res.status(400).json({ error: "Invalid page number" });
  }

  try {
    const { data } = await axios.get(`${BASE_URL_SEARCH}`, {
      params: {
        api_key: process.env.API_KEY,
        query,
        page,
        language: req.query.language || "en-US",
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error searching for movie:", error);
    res.status(500).json({ error: "Failed to search for movie." });
  }
});

module.exports = searchMoviesRouter;
