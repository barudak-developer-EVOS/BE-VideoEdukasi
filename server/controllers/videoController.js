const Video = require("../models/videoModel");
const path = require("path");

const videoController = {
  async getAll(req, res) {
    try {
      const videos = await Video.getAll();
      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const video = await Video.getById(req.params.id);
      if (!video) return res.status(404).json({ error: "Video not found" });
      res.status(200).json(video);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { title, description, url, thumbnail, educationLevel, subject } =
        req.body;

      // Periksa role
      if (req.user.role !== "tutor") {
        return res.status(403).json({ error: "Only tutors can upload videos" });
      }

      // Validasi file atau URL
      let videoUrl = url || null;
      if (req.file) {
        videoUrl = `${req.protocol}://${req.get("host")}/uploads/videos/${
          req.file.filename
        }`;
      }

      if (!videoUrl) {
        return res
          .status(400)
          .json({ error: "Either a video file or URL must be provided" });
      }

      // Simpan video ke database
      const videoId = await Video.create({
        title,
        description,
        url: videoUrl,
        thumbnail,
        educationLevel,
        subject,
        accountId: req.user.id,
      });

      res
        .status(201)
        .json({ id: videoId, message: "Video uploaded successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { title, description, url, thumbnail, educationLevel, subject } =
        req.body;

      // Periksa apakah pengguna adalah tutor
      if (req.user.role !== "tutor") {
        return res.status(403).json({ error: "Only tutors can edit videos" });
      }

      // Ambil data video lama dari database
      const existingVideo = await Video.getById(req.params.id);
      if (!existingVideo) {
        return res.status(404).json({ error: "Video not found" });
      }

      // Gunakan URL lama jika URL baru tidak diberikan
      const videoUrl = url || existingVideo.video_url;

      await Video.update(req.params.id, {
        title,
        description,
        url: videoUrl,
        thumbnail,
        educationLevel,
        subject,
      });

      res.status(200).json({ message: "Video updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      // Periksa apakah pengguna adalah tutor
      if (req.user.role !== "tutor") {
        return res.status(403).json({ error: "Only tutors can delete videos" });
      }

      await Video.delete(req.params.id);
      res.status(200).json({ message: "Video deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async filter(req, res) {
    try {
      const { educationLevel, subject, title, tutorId } = req.query;

      const videos = await Video.filter({
        educationLevel,
        subject,
        title,
        tutorId,
      });

      if (!videos || videos.length === 0) {
        return res.status(404).json({ message: "No videos found" });
      }

      res.status(200).json(videos);
    } catch (err) {
      console.error("Error fetching videos:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = videoController;
