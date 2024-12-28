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
      const { title, description, educationLevel, subject } = req.body;

      if (req.user.role !== "tutor") {
        return res.status(403).json({ error: "Only tutors can edit videos" });
      }

      // Ambil data lama
      const existingVideo = await Video.getById(req.params.id);
      if (!existingVideo) {
        return res.status(404).json({ error: "Video not found" });
      }

      // Proses data file (jika ada)
      const videoFile = req.files?.["videoFile"]
        ? req.files["videoFile"][0]
        : null;
      const thumbnailFile = req.files?.["thumbnail"]
        ? req.files["thumbnail"][0]
        : null;

      // Gunakan data baru jika ada, atau gunakan data lama
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

      // Jalankan update query
      const result = await Video.update(req.params.id, updatedVideo);

      res.status(200).json({ message: "Video updated successfully" });
    } catch (err) {
      console.error("Update Video Error:", err);
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

      // Validasi parameter query
      if (!educationLevel || !["SD", "SMP", "SMA"].includes(educationLevel)) {
        return res
          .status(422)
          .json({ error: "Valid education level is required (SD, SMP, SMA)" });
      }

      const videos = await Video.filterByEducationLevel(educationLevel);

      // Berikan respons meskipun tidak ada video
      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // file by subject
  async filterBySubject(req, res) {
    try {
      const { educationLevel, subject } = req.query;

      // Validasi parameter query
      if (!educationLevel || !["SD", "SMP", "SMA"].includes(educationLevel)) {
        return res
          .status(422)
          .json({ error: "Valid education level is required (SD, SMP, SMA)" });
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
          error: "Valid subject is required (e.g., PPKn, Matematika, IPA)",
        });
      }

      const videos = await Video.filterBySubject(educationLevel, subject);

      // Berikan respons meskipun tidak ada video
      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ error: err.message });
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
      res.status(200).json({ message: "View count updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async incrementLikes(req, res) {
    try {
      const { id } = req.params;
      const video = await Video.getById(id);

      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }

      await Video.incrementLikes(id);
      res.status(200).json({ message: "Like count updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async incrementDislikes(req, res) {
    try {
      const { id } = req.params;
      const video = await Video.getById(id);

      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }

      await Video.incrementDislikes(id);
      res.status(200).json({ message: "Dislike count updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = videoController;
