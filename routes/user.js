const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).send({ message: 'Internal server error' });
      }

      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.query(query, [username, hashedPassword], (err, _) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          return res.status(500).send({ message: 'Internal server error' });
        }

        const pointQuery =
          'INSERT INTO points (user_id, total) VALUES ((SELECT id FROM users WHERE username=?), ?)';
        db.query(pointQuery, [username, 0], (err, _) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            return res.status(500).send({ message: 'Internal server error' });
          }
          return res.status(201).send({ message: 'Registration successful' });
        });
      });
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

      const user = result[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing password:', err);
          return res.status(500).send({ message: 'Internal server error' });
        }

        if (!isMatch) {
          return res
            .status(401)
            .send({ message: 'Invalid username or password ' });
        }

        const token = jwt.sign({ userId: user.id }, 'secretKey');

        return res
          .status(200)
          .send({ message: 'Login successful', data: user, token });
      });
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

    return res.status(200).send(result[0]);
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
