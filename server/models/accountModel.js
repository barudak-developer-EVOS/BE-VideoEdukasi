const db = require("../config/dbConfig");

const Account = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM account");
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query(
      "SELECT * FROM account WHERE account_id = ?",
      [id]
    );
    return rows;
  },

  async create(account) {
    const { name, email, password, role, profilePhoto } = account;
    const [result] = await db.query(
      "INSERT INTO account (account_name, account_email, account_password, role, account_profile_photo, account_created_at, account_updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
      [name, email, password, role, profilePhoto]
    );
    return result.insertId;
  },

  async update(id, account) {
    const { name, email, role } = account;
    await db.query(
      "UPDATE account SET account_name = ?, account_email = ?, role = ?, account_updated_at = NOW() WHERE account_id = ?",
      [name, email, role, id]
    );
  },

  async delete(id) {
    await db.query("DELETE FROM account WHERE account_id = ?", [id]);
  },

  async getByEmail(email) {
    const [rows] = await db.query(
      "SELECT * FROM account WHERE account_email = ?",
      [email]
    );
    return rows[0];
  },
};

module.exports = Account;
