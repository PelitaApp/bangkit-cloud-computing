const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  const query = 'SELECT * FROM wastes';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send(result);
  });
});

router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT * FROM wastes WHERE user_id=?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send(result);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const query = 'SELECT * FROM wastes WHERE id=?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send(result);
  });
});

router.post('/create', (req, res) => {
  const { userId, type, weight, address, status } = req.body;
});

router.put('/update/:id', (req, res) => {});

module.exports = router;
