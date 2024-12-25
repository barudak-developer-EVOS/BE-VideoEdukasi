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
      const { title, description, educationLevel, subject } = req.body;

      // Periksa role
      if (req.user.role !== "tutor") {
        return res.status(403).json({ error: "Only tutors can upload videos" });
      }

      // Ambil file video dan thumbnail
      const videoFile = req.files["videoFile"]
        ? req.files["videoFile"][0]
        : null;
      const thumbnailFile = req.files["thumbnail"]
        ? req.files["thumbnail"][0]
        : null;

      // Validasi: File video dan thumbnail harus ada
      if (!videoFile || !thumbnailFile) {
        return res
          .status(400)
          .json({ error: "Both video and thumbnail files are required" });
      }

      // Tentukan URL untuk file video dan thumbnail
      const videoUrl = `${req.protocol}://${req.get("host")}/uploads/videos/${
        videoFile.filename
      }`;
      const thumbnailUrl = `${req.protocol}://${req.get(
        "host"
      )}/uploads/thumbnails/${thumbnailFile.filename}`;

      // Simpan data ke database
      const videoId = await Video.create({
        title,
        description,
        url: videoUrl,
        thumbnail: thumbnailUrl,
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
  // file by education level
  async filterByEducationLevel(req, res) {
    try {
      const { educationLevel } = req.query;

      if (!educationLevel) {
        return res.status(400).json({ error: "Education level is required" });
      }

      const videos = await Video.filterByEducationLevel(educationLevel);

      if (videos.length === 0) {
        return res.status(404).json({ message: "No videos found" });
      }

      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async filterBySubject(req, res) {
    try {
      const { educationLevel, subject } = req.query;

      if (!educationLevel || !subject) {
        return res
          .status(400)
          .json({ error: "Education level and subject are required" });
      }

      const videos = await Video.filterBySubject(educationLevel, subject);

      if (videos.length === 0) {
        return res.status(404).json({ message: "No videos found" });
      }

      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = videoController;
