require("dotenv").config();

const express = require("express");
const axios = require("axios");
const movieVideoRouter = express.Router();

const BASE_URL = "https://api.themoviedb.org/3/movie";

movieVideoRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { data } = await axios.get(`${BASE_URL}/${id}/videos`, {
      params: {
        api_key: process.env.API_KEY,
        language: req.query.language || "en-US",
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching movie videos:", error.message);
    res.status(500).json({ error: "Failed to fetch movie videos" });
  }
});

module.exports = movieVideoRouter;
