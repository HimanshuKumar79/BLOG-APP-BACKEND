const blogSchema = require("../model/blogSchema");
const LikeSchema = require("../model/likeSchema");

exports.likeController = async (req, res) => {
  try {
    const { blogId, userId, userName } = req.body;
    if (!(blogId && userId && userName)) {
      return res.status(400).json({
        success: false,
        message: "Please provide all of the following information",
      });
    }
    const findLike = await LikeSchema.findOne({ blogId, userId });
    if (findLike) {
      await LikeSchema.findByIdAndDelete({ _id: findLike._id });
      const updatedBlog = await blogSchema.findByIdAndUpdate(
        blogId,
        { $pull: { likes: findLike._id } },
        { new: true }
      );
      return res.status(201).json({
        success: true,
        message: "Like removed",
        updatedBlog,
      });
    }
    const likeBlog = await LikeSchema.create({ blogId, userId, userName });
    const updatedBlog = await blogSchema
      .findByIdAndUpdate(
        blogId,
        { $push: { likes: likeBlog._id } },
        { new: true }
      )
      .populate("likes")
      .exec();
    res.status(200).json({
      success: true,
      message: "Blog Liked",
      updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
