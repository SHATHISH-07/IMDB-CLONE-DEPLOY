require("dotenv").config();

const express = require("express");
const axios = require("axios");
const tvCreditsRouter = express.Router();

const BASE_URL = "https://api.themoviedb.org/3/tv";

tvCreditsRouter.get("/:id", async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${req.params.id}/credits`, {
      params: {
        api_key: process.env.API_KEY,
        language: req.query.language || "en-US",
      },
    });
    res.status(200).json({ cast: data.cast, crew: data.crew });
  } catch (error) {
    console.error("Error fetching movie credits:", error.message);
    res.status(500).json({ error: "Failed to fetch movie credits" });
  }
});

module.exports = tvCreditsRouter;
