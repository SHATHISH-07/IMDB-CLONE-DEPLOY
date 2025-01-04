const { request, response, next } = require("express");
const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malFormatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  if (req.token) {
    try {
      const decodedToken = jwt.verify(req.token, process.env.SECRET);
      const user = await User.findById(decodedToken.id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ error: "token invalid or expired" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
};
