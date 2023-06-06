const BlogSchema = require("../model/blogSchema");

exports.getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    const Blog = await BlogSchema.findById({ _id: id });
    res.status(200).json({
      success: true,
      message: "Blog found",
      Blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
