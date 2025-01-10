const Video = require("../models/videoModel");
const path = require("path");
const Account = require("../models/accountModel");

const videoController = {
  // Method get all video
  async getAll(req, res) {
    try {
      const videos = await Video.getAll();

      const enrichedVideos = await Promise.all(
        videos.map(async (video) => {
          const account = await Account.getById(video.account_id);
          return {
            ...video,
            account: {
              id: account.account_id,
              name: account.account_name,
              email: account.account_email,
              role: account.role,
              profilePhoto: account.account_profile_photo,
              createdAt: account.account_created_at,
              updatedAt: account.account_updated_at,
            },
          };
        })
      );

      res.status(200).json({
        statusCode: 200,
        message: "ok",
        data: enrichedVideos,
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
        error: err.message,
      });
    }
  },

  // Method get video by id
  async getById(req, res) {
    try {
      const video = await Video.getById(req.params.id);

      if (!video) {
        return res.status(404).json({
          statusCode: 404,
          message: "Video not found",
          data: null,
        });
      }

      const account = await Account.getById(video.account_id);

      const enrichedVideo = {
        ...video,
        account: {
          id: account.account_id,
          name: account.account_name,
          email: account.account_email,
          role: account.role,
          profilePhoto: account.account_profile_photo,
          createdAt: account.account_created_at,
          updatedAt: account.account_updated_at,
        },
      };

      res.status(200).json({
        statusCode: 200,
        message: "ok",
        data: enrichedVideo,
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
        error: err.message,
      });
    }
  },

  // method create
  async create(req, res) {
    try {
      const { title, description, educationLevel, subject } = req.body;

      // Periksa role
      if (req.user.role !== "tutor") {
        return res.status(403).json({
          statusCode: 403,
          message: "Only tutors can upload videos",
          data: null,
        });
      }

      // Ambil file video dan thumbnail
      const videoFile = req.files?.["videoFile"]?.[0];
      const thumbnailFile = req.files?.["thumbnail"]?.[0];

      if (!videoFile || !thumbnailFile) {
        return res.status(400).json({
          statusCode: 400,
          message: "Both video and thumbnail files are required",
          data: null,
        });
      }

      const videoUrl = `${req.protocol}://${req.get("host")}/uploads/videos/${
        videoFile.filename
      }`;
      const thumbnailUrl = `${req.protocol}://${req.get(
        "host"
      )}/uploads/thumbnails/${thumbnailFile.filename}`;

      const videoId = await Video.create({
        title,
        description,
        url: videoUrl,
        thumbnail: thumbnailUrl,
        educationLevel,
        subject,
        accountId: req.user.id,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Video uploaded successfully",
        data: { id: videoId },
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
        error: err.message,
      });
    }
  },

  // method update
  async update(req, res) {
    try {
      const { title, description, educationLevel, subject } = req.body;

      if (req.user.role !== "tutor") {
        return res.status(403).json({
          statusCode: 403,
          message: "Only tutors can edit videos",
          data: null,
        });
      }

      const existingVideo = await Video.getById(req.params.id);
      if (!existingVideo) {
        return res.status(404).json({
          statusCode: 404,
          message: "Video not found",
          data: null,
        });
      }

      const videoFile = req.files?.["videoFile"]?.[0];
      const thumbnailFile = req.files?.["thumbnail"]?.[0];

      const updatedVideo = {
        title: title || existingVideo.video_title,
        description: description || existingVideo.video_description,
        url: videoFile
          ? `${req.protocol}://${req.get("host")}/uploads/videos/${
              videoFile.filename
            }`
          : existingVideo.video_url,
        thumbnail: thumbnailFile
          ? `${req.protocol}://${req.get("host")}/uploads/thumbnails/${
              thumbnailFile.filename
            }`
          : existingVideo.video_thumbnail,
        educationLevel: educationLevel || existingVideo.video_education_level,
        subject: subject || existingVideo.video_subject,
      };

      await Video.update(req.params.id, updatedVideo);

      res.status(200).json({
        statusCode: 200,
        message: "Video updated successfully",
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

  // method delete
  async delete(req, res) {
    try {
      if (req.user.role !== "tutor") {
        return res.status(403).json({
          statusCode: 403,
          message: "Only tutors can delete videos",
          data: null,
        });
      }

      await Video.delete(req.params.id);

      res.status(200).json({
        statusCode: 200,
        message: "Video deleted successfully",
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

  // file by education level
  async filterByEducationLevel(req, res) {
    try {
      const { educationLevel } = req.query;

      if (!educationLevel || !["SD", "SMP", "SMA"].includes(educationLevel)) {
        return res.status(422).json({
          statusCode: 422,
          message: "Valid education level is required (SD, SMP, SMA)",
          data: null,
        });
      }

      const videos = await Video.filterByEducationLevel(educationLevel);

      res.status(200).json({
        statusCode: 200,
        message: "ok",
        data: videos,
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
        error: err.message,
      });
    }
  },

  // file by subject
  async filterBySubject(req, res) {
    try {
      const { educationLevel, subject } = req.query;

      if (!educationLevel || !["SD", "SMP", "SMA"].includes(educationLevel)) {
        return res.status(422).json({
          statusCode: 422,
          message: "Valid education level is required (SD, SMP, SMA)",
          data: null,
        });
      }
      if (
        !subject ||
        ![
          "PPKn",
          "Bahasa Indonesia",
          "Matematika",
          "IPA",
          "IPS",
          "Agama",
          "PJOK",
        ].includes(subject)
      ) {
        return res.status(422).json({
          statusCode: 422,
          message: "Valid subject is required (e.g., PPKn, Matematika, IPA)",
          data: null,
        });
      }

      const videos = await Video.filterBySubject(educationLevel, subject);

      res.status(200).json({
        statusCode: 200,
        message: "ok",
        data: videos,
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
        error: err.message,
      });
    }
  },

  // increment views
  async incrementViews(req, res) {
    try {
      const { id } = req.params;
      const video = await Video.getById(id);

      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }

      await Video.incrementViews(id);
      res
        .status(200)
        .json({ message: "View count updated successfully", videoId: id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // increment likes
  async incrementLikes(req, res) {
    try {
      const { id } = req.params;
      const video = await Video.getById(id);

      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }

      await Video.incrementLikes(id);
      res
        .status(200)
        .json({ message: "Like count updated successfully", videoId: id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // increment dislikes
  async incrementDislikes(req, res) {
    try {
      const { id } = req.params;
      const video = await Video.getById(id);

      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }

      await Video.incrementDislikes(id);
      res
        .status(200)
        .json({ message: "Dislike count updated successfully", videoId: id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = videoController;
