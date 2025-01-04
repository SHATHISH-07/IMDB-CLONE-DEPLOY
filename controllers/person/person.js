require("dotenv").config();
const express = require("express");
const axios = require("axios");
const personRouter = express.Router();

const BASE_URL = "https://api.themoviedb.org/3/person/popular";
const PERSON_ID_URL = "https://api.themoviedb.org/3/person";
const PERSON_SEARCH_URL = "https://api.themoviedb.org/3/search/person";

personRouter.get("/popular", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;

  if (page < 1) {
    return res.status(400).json({ error: "Invalid page number" });
  }

  try {
    const { data } = await axios.get(`${BASE_URL}`, {
      params: {
        api_key: process.env.API_KEY,
        page,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching popular person:", error.message);
    res.status(500).json({ error: "Failed to fetch popular person" });
  }
});

personRouter.get("/search/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { data } = await axios.get(`${PERSON_ID_URL}/${id}`, {
      params: {
        api_key: process.env.API_KEY,
        id,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching person:", error.message);
    res.status(500).json({ error: "Failed to fetch person" });
  }
});

personRouter.get("/search", async (req, res) => {
  const query = req.query.query; // Person's name to search for
  const page = parseInt(req.query.page, 10) || 1;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  try {
    const { data } = await axios.get(`${PERSON_SEARCH_URL}`, {
      params: {
        api_key: process.env.API_KEY,
        query,
        page,
        language: req.query.language || "en-US",
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error searching for person:", error.message);
    res.status(500).json({ error: "Failed to search for person." });
  }
});

module.exports = personRouter;
