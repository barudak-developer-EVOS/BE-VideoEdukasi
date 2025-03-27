const Comment = require("../models/commentModel");
const Video = require("../models/videoModel");
const Account = require("../models/accountModel");

const commentController = {
  // Method create comment
  async create(req, res) {
    try {
      const { content, videoId } = req.body;

      if (!content || !videoId) {
        return res.status(400).json({
          statusCode: 400,
          message: "Content and videoId are required",
          data: null,
        });
      }

      if (!content || content.trim().length === 0) {
        return res.status(400).json({
          statusCode: 400,
          message: "Content must not be empty",
          data: null,
        });
      }

      const commentId = await Comment.create({
        content,
        accountId: req.user.id,
        videoId,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Comment added successfully",
        data: { id: commentId },
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
        error: err.message,
      });
    }
  },

  // Method get all comments by video id
  async getByVideoId(req, res) {
    try {
      const { id: videoId } = req.params;
      const { page = 1, limit = 10 } = req.query;

      // Ambil komentar berdasarkan videoId
      const comments = await Comment.getByVideoId(videoId, page, limit);

      // Jika tidak ada komentar, kembalikan respons kosong
      if (!comments.length) {
        return res.status(200).json({
          statusCode: 200,
          message: "No comments found for this video",
          data: {
            video: null,
            comments: [],
          },
        });
      }

      // Ambil data video berdasarkan videoId
      const video = await Video.getById(videoId);
      if (!video) {
        return res.status(404).json({
          statusCode: 404,
          message: "Video not found",
          data: null,
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "ok",
        data: {
          video,
          comments,
        },
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
        error: err.message,
      });
    }
  },

  // Method delete comment
  async delete(req, res) {
    try {
      const { id: commentId } = req.params;

      // Periksa apakah pengguna adalah tutor
      const isTutor = req.user.role === "tutor";

      // Hapus komentar (untuk tutor atau pemilik komentar)
      const isDeleted = await Comment.delete(commentId, req.user.id, isTutor);

      if (!isDeleted) {
        return res.status(403).json({
          statusCode: 403,
          message: "You are not authorized to delete this comment",
          data: null,
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Comment deleted successfully",
        data: null,
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
        error: err.message,
      });
    }
  },
};

module.exports = commentController;
