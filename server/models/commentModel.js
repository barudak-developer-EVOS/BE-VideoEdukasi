const db = require("../config/dbConfig");

const Comment = {
  async create(comment) {
    const { content, accountId, videoId } = comment;
    const [result] = await db.query(
      "INSERT INTO comment (comment_content, account_id, video_id, comment_created_at) VALUES (?, ?, ?, NOW())",
      [content, accountId, videoId]
    );
    return result.insertId;
  },

  async getByVideoId(videoId) {
    const [rows] = await db.query(
      "SELECT c.comment_id, c.comment_content, c.comment_created_at, a.account_name " +
        "FROM comment c " +
        "JOIN account a ON c.account_id = a.account_id " +
        "WHERE c.video_id = ? ORDER BY c.comment_created_at DESC",
      [videoId]
    );
    return rows;
  },

  async delete(commentId, accountId) {
    const [result] = await db.query(
      "DELETE FROM comment WHERE comment_id = ? AND account_id = ?",
      [commentId, accountId]
    );
    return result.affectedRows > 0; // Return true jika berhasil
  },
};

module.exports = Comment;
