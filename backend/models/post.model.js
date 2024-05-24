const mongoose = require("mongoose");

// pour chaque post message autheur les likes et timesstamps pour la date

const postShema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postShema);
