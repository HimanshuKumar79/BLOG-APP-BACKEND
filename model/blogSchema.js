const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  author_id: {
    type: String,
    required: true,
  },
  created_AT: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updated_AT: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
});

module.exports = mongoose.model("Blogs", blogSchema);
