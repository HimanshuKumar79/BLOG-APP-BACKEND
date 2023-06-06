const BlogSchema = require("../model/blogSchema");
exports.getBlogs = async (req, res) => {
  try {
    const Blogs = await BlogSchema.find().populate("likes").exec();
    res.status(200).json({
      success: true,
      message: "All blogs fetched successfully",
      Blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
};
