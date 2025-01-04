require("dotenv").config();

const express = require("express");
const axios = require("axios");
const tvShowImagesRouter = express.Router();

const BASE_URL = "https://api.themoviedb.org/3/tv";

tvShowImagesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { data } = await axios.get(`${BASE_URL}/${id}/images`, {
      params: {
        api_key: process.env.API_KEY,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching tv show images:", error.message);
    res.status(500).json({ error: "Failed to fetch tv show images" });
  }
});

module.exports = tvShowImagesRouter;
