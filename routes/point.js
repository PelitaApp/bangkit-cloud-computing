const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/total/:userId', (req, res) => {
  const id = req.params.userId;

  const query = `SELECT total FROM points WHERE user_id=${userId}`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.sqlMessage });
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
