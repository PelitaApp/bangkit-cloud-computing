const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  const query = 'SELECT * FROM articles';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: err.sqlMessage });
    } else {
      return res.status(200).send(result);
    }
  });
});

router.get('/type/:type', (req, res) => {
  const type = req.params.type;

  const query = 'SELECT * FROM articles WHERE type=?';
  db.query(query, [type], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: err.sqlMessage });
    } else {
      return res.status(200).send(result);
    }
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const query = 'SELECT * FROM articles WHERE id=?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: err.sqlMessage });
    } else {
      return res.status(200).send(result);
    }
  });
});

module.exports = router;
