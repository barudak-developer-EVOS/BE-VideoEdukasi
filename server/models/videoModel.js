const db = require("../config/dbConfig");

const Video = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM video");
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM video WHERE video_id = ?", [
      id,
    ]);
    return rows[0];
  },

  // Add the create method
  async create(video) {
    const {
      title,
      description,
      url,
      thumbnail,
      educationLevel,
      subject,
      accountId,
    } = video;

    const [result] = await db.query(
      "INSERT INTO video (video_title, video_description, video_url, video_thumbnail, video_education_level, video_subject, account_id, video_created_at, video_updated_at, likes, dislikes, views) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), 0, 0, 0)",
      [title, description, url, thumbnail, educationLevel, subject, accountId]
    );

    return result.insertId;
  },

  async update(id, video) {
    const { title, description, url, thumbnail, educationLevel, subject } =
      video;

    await db.query(
      "UPDATE video SET video_title = ?, video_description = ?, video_url = ?, video_thumbnail = ?, video_education_level = ?, video_subject = ?, video_updated_at = NOW() WHERE video_id = ?",
      [title, description, url, thumbnail, educationLevel, subject, id]
    );
  },

  // Add the delete method
  async delete(id) {
    await db.query("DELETE FROM video WHERE video_id = ?", [id]);
  },

  // Add the filterByEducationLevel method
  async filterByEducationLevel(educationLevel) {
    const [rows] = await db.query(
      "SELECT * FROM video WHERE video_education_level = ?",
      [educationLevel]
    );
    return rows;
  },

  // Add the filterBySubject method
  async filterBySubject(educationLevel, subject) {
    const [rows] = await db.query(
      "SELECT * FROM video WHERE video_education_level = ? AND video_subject = ?",
      [educationLevel, subject]
    );
    return rows;
  },
};

module.exports = Video;
