const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blogs",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  userName: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Like", likeSchema);
