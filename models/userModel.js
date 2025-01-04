const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  passwordHashed: {
    type: String,
    required: true,
    minlength: 3,
  },
  name: String,
  watchList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WatchList",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHashed;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
