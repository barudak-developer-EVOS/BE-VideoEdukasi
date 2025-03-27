const db = require("../config/dbConfig");

const Account = {
  // Add the getAll method
  async getAll() {
    const [rows] = await db.query("SELECT * FROM account");
    return rows;
  },

  // Add the getById method
  async getById(accountId) {
    const [rows] = await db.query(
      "SELECT * FROM account WHERE account_id = ?",
      [accountId]
    );
    return rows[0] || null;
  },

  // Add the create method
  async create(account) {
    const { name, email, password, role, profilePhoto } = account;
    const [result] = await db.query(
      "INSERT INTO account (account_name, account_email, account_password, role, account_profile_photo, account_created_at, account_updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
      [name, email, password, role, profilePhoto]
    );
    return result.insertId;
  },

  // Add the update method
  async update(id, account) {
    const { name, email, role, profilePhoto } = account;
    await db.query(
      "UPDATE account SET account_name = ?, account_email = ?, role = ?, account_profile_photo = ?, account_updated_at = NOW() WHERE account_id = ?",
      [name, email, role, profilePhoto, id]
    );
  },
  // Add the delete method
  async delete(id) {
    await db.query("DELETE FROM account WHERE account_id = ?", [id]);
  },

  // Add the getByEmail method
  async getByEmail(email) {
    const [rows] = await db.query(
      "SELECT * FROM account WHERE account_email = ?",
      [email]
    );
    return rows[0];
  },
};

module.exports = Account;
