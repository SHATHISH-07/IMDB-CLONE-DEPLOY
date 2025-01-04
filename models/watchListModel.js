const mongoose = require("mongoose");

const WatchListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  movieId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  poster_path: {
    type: String,
    required: true,
  },

  mediaType: {
    type: String,
    enum: ["movie", "tv"],
    required: true,
  },

  addedAt: {
    type: Date,
    default: Date.now,
  },

  rating: {
    type: Number,
    min: 0,
    max: 10,
  },

  releasedAt: {
    type: String,
  },
});

WatchListSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const WatchList = mongoose.model("WatchList", WatchListSchema);

module.exports = WatchList;
