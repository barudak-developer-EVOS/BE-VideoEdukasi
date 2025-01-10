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

  async getByVideoId(videoId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [rows] = await db.query(
      `SELECT c.comment_id, c.comment_content, c.comment_created_at, a.account_name
       FROM comment c
       JOIN account a ON c.account_id = a.account_id
       WHERE c.video_id = ?
       ORDER BY c.comment_created_at DESC
       LIMIT ? OFFSET ?`,
      [videoId, limit, offset]
    );
    return rows;
  },
  
  async delete(commentId, accountId, isTutor = false) {
    let query, params;
  
    if (isTutor) {
      // Tutor dapat menghapus komentar tanpa memeriksa pemiliknya
      query = "DELETE FROM comment WHERE comment_id = ?";
      params = [commentId];
    } else {
      // Pemilik hanya dapat menghapus komentarnya sendiri
      query = "DELETE FROM comment WHERE comment_id = ? AND account_id = ?";
      params = [commentId, accountId];
    }
  
    const [result] = await db.query(query, params);
    return result.affectedRows > 0; // Return true jika berhasil
  },
};

module.exports = Comment;
