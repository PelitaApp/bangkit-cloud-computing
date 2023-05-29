const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authToken } = require('../middleware/authToken');

router.get('/total/:userId', authToken, (req, res) => {
  const id = req.params.userId;

  const query = 'SELECT total FROM points WHERE user_id=?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    } else {
      return res.status(200).send(result[0]);
    }
  });
});

router.put('/add/:userId', authToken, (req, res) => {
  const userId = req.params.userId;
  const { point } = req.body;

  const getQuery = 'SELECT total FROM points WHERE user_id=?';
  db.query(getQuery, [userId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    const total = result[0]['total'];

    const add = parseInt(total) + parseInt(point);
    const updateQuery = 'UPDATE points SET total=? WHERE user_id=?';
    db.query(updateQuery, [add, userId], (err, _) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).send({ message: 'Internal server error' });
      }

      return res.status(200).send({ message: `Point +${point}` });
    });
  });
});

router.put('/reduce/:userId', authToken, (req, res) => {
  const userId = req.params.userId;
  const { point } = req.body;

  const getQuery = 'SELECT total FROM points WHERE user_id=?';
  db.query(getQuery, [userId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    const total = result[0]['total'];

    const reduce = parseInt(total) - parseInt(point);
    const updateQuery = 'UPDATE points SET total=? WHERE user_id=?';
    db.query(updateQuery, [reduce, userId], (err, _) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).send({ message: 'Internal server error' });
      }

      return res.status(200).send({ message: `Point -${point}` });
    });
  });
});

module.exports = router;
