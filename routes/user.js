const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (username == null || password == null) {
    return res
      .status(400)
      .send({ message: "username or password can't be empty" });
  }

  const userExists = 'SELECT username FROM users WHERE username=?';
  db.query(userExists, [username], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: err.sqlMessage });
    }

    if (result.length > 0) {
      return res.status(409).send({ message: 'Username already exists' });
    }

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, _) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).send({ message: 'Internal server error' });
      }

      return res.status(201).send({ message: 'Registration successful' });
    });
  });
});

router.get('/login', (req, res) => {
  const { username, password } = req.body;

  const userQuery = 'SELECT * FROM users WHERE username=?';
  db.query(userQuery, [username], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    if (result === 0) {
      return res.status(401).send({ message: 'Invalid username or password ' });
    }

    const passQuery = 'SELECT * FROM users WHERE password=?';
    db.query(passQuery, [password], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).send({ message: 'Internal server error' });
      }

      if (result === 0) {
        return res
          .status(401)
          .send({ message: 'Invalid username or password ' });
      }

      const user = result[0];
      const token = jwt.sign({ userId: user.id }, 'secretKey');

      return res.status(200).send({ message: 'Login successful', token });
    });
  });
});

router.get('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

module.exports = router;
