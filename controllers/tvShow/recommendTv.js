require("dotenv").config();

const express = require("express");
const axios = require("axios");
const recommendTvRouter = express.Router();

const BASE_URL = "https://api.themoviedb.org/3/tv";

recommendTvRouter.get("/:id", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const id = req.params.id;

  try {
    const { data } = await axios.get(`${BASE_URL}/${id}/recommendations`, {
      params: {
        api_key: process.env.API_KEY,
        language: req.query.language || "en-US",
        page,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching recommended tv shows:", error.message);
    res.status(500).json({ error: "Failed to fetch recommended tv shows" });
  }
});

module.exports = recommendTvRouter;
