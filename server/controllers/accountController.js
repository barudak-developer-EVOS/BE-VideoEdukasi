const Account = require("../models/accountModel");
const bcrypt = require("bcryptjs");

const accountController = {
  async getAll(req, res) {
    try {
      const accounts = await Account.getAll();
      res.status(200).json(accounts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const account = await Account.getById(req.params.id);
      if (!account) return res.status(404).json({ error: "Account not found" });
      res.status(200).json(account);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const accountId = await Account.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      res.status(201).json({ id: accountId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { name, email, role } = req.body;
      await Account.update(req.params.id, { name, email, role });
      res.status(200).json({ message: "Account updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await Account.delete(req.params.id);
      res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = accountController;
