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

router.post('/taken/:userId', authToken, (req, res) => {
  const userId = req.params.userId;
  const { point, phone } = req.body;

  const getQuery = 'SELECT * FROM points WHERE user_id=?';
  db.query(getQuery, [userId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    const pointUser = result[0];
    const newPoint = parseInt(pointUser.total) - parseInt(point);
    if (newPoint < 0) {
      const msg = 'Input point must not greater than ' + pointUser.total
      return res.status(400).send({message: msg})
    }

    const updateQuery = 'UPDATE points SET total=? WHERE id=?';
    db.query(updateQuery, [newPoint, pointUser.id], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).send({ message: 'Internal server error' });
      }

      const createQUery =
        'INSERT INTO point_taken (user_id, point_id, point, phone) VALUES (?, ?, ?, ?)';
      db.query(
        createQUery,
        [userId, pointUser.id, point, phone],
        (err, result) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            return res.status(500).send({ message: 'Internal server error' });
          }

          res.status(201).send({ message: 'Point successfully taken' });
        }
      );
    });
  });
});

router.get('/taken/user/:userId', authToken, (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT * FROM point_taken WHERE user_id=?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    } else {
      return res.status(200).send(result);
    }
  });
});

router.get('/taken/:id', authToken, (req, res) => {
  const id = req.params.id;

  const query = 'SELECT * FROM point_taken WHERE id=?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    } else {
      return res.status(200).send(result[0]);
    }
  });
});

module.exports = router;
