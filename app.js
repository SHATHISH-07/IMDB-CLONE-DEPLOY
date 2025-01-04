require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const config = require("./utils/config");
const userRouter = require("./controllers/users");
const watchListRouter = require("./controllers/watchlists");
const genresRouter = require("./controllers/movie/genres");
const movieImageRouter = require("./controllers/movie/movieImages");
const movieVideoRouter = require("./controllers/movie/movieVideo");
const movieReviewRouter = require("./controllers/movie/movieReviews");
const nowPlayingRouter = require("./controllers/movie/nowPlaying");
const movieCollectionRouter = require("./controllers/movie/movieCollection");
const popularMovieRouter = require("./controllers/movie/popularMovie");
const recommendMovieRouter = require("./controllers/movie/recommendMovie");
const searchMoviesRouter = require("./controllers/movie/searchMovies");
const topRatedMovieRouter = require("./controllers/movie/topRatedMovie");
const trendingMovieRouter = require("./controllers/movie/trendingMovie");
const upcomingMovieRouter = require("./controllers/movie/upcomingMovie");
const personRouter = require("./controllers/person/person");
const genreTvRouter = require("./controllers/tvShow/genreTv");
const nowPlayingTvRouter = require("./controllers/tvShow/nowPlayingTv");
const onAirTvRouter = require("./controllers/tvShow/onAirTv");
const popularTvRouter = require("./controllers/tvShow/popularTv");
const recommendTvRouter = require("./controllers/tvShow/recommendTv");
const searchTvRouter = require("./controllers/tvShow/searchTv");
const topRatedTvRouter = require("./controllers/tvShow/topRatedTv");
const trendingTvRouter = require("./controllers/tvShow/trendingTv");
const tvReviewsRouter = require("./controllers/tvShow/tvReviews");
const tvShowImageRouter = require("./controllers/tvShow/tvShowImages");
const tvVideoRouter = require("./controllers/tvShow/tvVideo");
const movieCreditsRouter = require("./controllers/movie/movieCredits");
const tvCreditsRouter = require("./controllers/tvShow/tvCredits");
const middleware = require("./utils/middleware");
const path = require("path");
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./dist"));

// connect to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

// user, login, watchList
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(
  "/api/watchList",
  middleware.tokenExtractor,
  middleware.userExtractor,
  watchListRouter
);

// movie
app.use("/api/movie/genres", genresRouter);
app.use("/api/movie/genres/:id", genresRouter);
app.use("/api/movie/image", movieImageRouter);
app.use("/api/movie/video", movieVideoRouter);
app.use("/api/movie/review", movieReviewRouter);
app.use("/api/movie/now_playing", nowPlayingRouter);
app.use("/api/movie/popular", popularMovieRouter);
app.use("/api/movie/recommend", recommendMovieRouter);
app.use("/api/movie/search", searchMoviesRouter);
app.use("/api/movie/top_rated", topRatedMovieRouter);
app.use("/api/movie/trending", trendingMovieRouter);
app.use("/api/movie/upcoming", upcomingMovieRouter);
app.use("/api/movie/credits", movieCreditsRouter);
app.use("/api/movie/collection", movieCollectionRouter);

// person
app.use("/api/person", personRouter);

// tvShow
app.use("/api/tv/genres", genreTvRouter);
app.use("/api/tv/genres/:id", genreTvRouter);
app.use("/api/tv/now_playing", nowPlayingTvRouter);
app.use("/api/tv/on_air", onAirTvRouter);
app.use("/api/tv/popular", popularTvRouter);
app.use("/api/tv/recommend", recommendTvRouter);
app.use("/api/tv/search", searchTvRouter);
app.use("/api/tv/top_rated", topRatedTvRouter);
app.use("/api/tv/trending", trendingTvRouter);
app.use("/api/tv/review", tvReviewsRouter);
app.use("/api/tv/image", tvShowImageRouter);
app.use("/api/tv/video", tvVideoRouter);
app.use("/api/tv/credits", tvCreditsRouter);

// error handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
