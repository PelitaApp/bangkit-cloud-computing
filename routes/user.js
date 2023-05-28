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

router.get('/', (req, res) => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send(result);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const query = 'SELECT * FROM users WHERE id=?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send(result);
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, address } = req.body;

  const query = 'UPDATE users SET name=?, email=?, address=? WHERE id=?';
  db.query(query, [name, email, address, id], (err, _) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send({ message: 'Update successful' });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM users WHERE id=?';
  db.query(query, [id], (err, _) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send({ message: 'Delete successful' });
  });
});

module.exports = router;
