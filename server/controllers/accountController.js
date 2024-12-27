const Account = require("../models/accountModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const accountController = {
  // Method get all account
  async getAll(req, res) {
    try {
      const accounts = await Account.getAll();
      res.status(200).json(accounts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Method get account by id
  async getById(req, res) {
    try {
      const account = await Account.getById(req.params.id);
      if (!account) return res.status(404).json({ error: "Account not found" });
      res.status(200).json(account);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // method create
  async create(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const profilePhotoPath = req.file ? req.file.path : null;
      const accountId = await Account.create({
        name,
        email,
        password: hashedPassword,
        role,
        profilePhoto: profilePhotoPath,
      });
      res.status(201).json({ message: "Account Created successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // method update
  async update(req, res) {
    try {
      const { name, email, role } = req.body;
      await Account.update(req.params.id, { name, email, role });
      res.status(200).json({ message: "Account updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // method delete
  async delete(req, res) {
    try {
      await Account.delete(req.params.id);
      res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // method login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Periksa apakah email ada di database
      const account = await Account.getByEmail(email);
      if (!account) return res.status(404).json({ error: "Account not found" });

      // Periksa password
      const isPasswordValid = await bcrypt.compare(
        password,
        account.account_password
      );
      if (!isPasswordValid)
        return res.status(401).json({ error: "Invalid password" });

      // Generate JWT
      const token = jwt.sign(
        { id: account.account_id, role: account.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = accountController;
