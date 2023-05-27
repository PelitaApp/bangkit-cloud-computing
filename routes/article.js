const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  const query = 'SELECT * FROM articles';

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.sqlMessage });
    } else {
      res.json(result);
    }
  });
});

router.get('/:type', (req, res) => {
  const type = req.params.type;

  const query = `SELECT * FROM articles WHERE type='${type}'`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.sqlMessage });
    } else {
      res.json(result);
    }
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM articles WHERE id=${id}`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.sqlMessage });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
