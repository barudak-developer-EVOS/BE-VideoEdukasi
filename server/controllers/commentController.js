const Comment = require("../models/commentModel");

const commentController = {
  async create(req, res) {
    try {
      const { content, videoId } = req.body;

      if (!content || !videoId) {
        return res
          .status(400)
          .json({ error: "Content and videoId are required" });
      }

      const commentId = await Comment.create({
        content,
        accountId: req.user.id,
        videoId,
      });

      res
        .status(201)
        .json({ id: commentId, message: "Comment added successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getByVideoId(req, res) {
    try {
      const { id: videoId } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const comments = await Comment.getByVideoId(videoId, page, limit);
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id: commentId } = req.params;

      const isDeleted = await Comment.delete(commentId, req.user.id);
      if (!isDeleted) {
        return res
          .status(403)
          .json({ error: "You are not authorized to delete this comment" });
      }

      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = commentController;
