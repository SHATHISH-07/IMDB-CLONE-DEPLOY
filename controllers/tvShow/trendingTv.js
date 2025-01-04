require("dotenv").config();

const express = require("express");
const axios = require("axios");
const trendingTvRouter = express.Router();

const BASE_URL = "https://api.themoviedb.org/3/trending/tv";

trendingTvRouter.get("/day", async (req, res) => {
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
    console.error("Error fetching trending tv shows (day):", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch trending tv shows for day" });
  }
});

trendingTvRouter.get("/week", async (req, res) => {
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
    console.error("Error fetching trending tv shows (week):", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch trending tv shows for week" });
  }
});

module.exports = trendingTvRouter;
