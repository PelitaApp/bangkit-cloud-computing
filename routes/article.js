const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  const query =
    'SELECT id, title, thumbnail, text, type, link, created_at FROM articles';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: err.sqlMessage });
    } else {
      result.forEach((article) => {
        const dateObj = new Date(article.created_at);

        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const date = dateObj.getDate().toString().padStart(2, '0');

        const dateFormated = date + '-' + month + '-' + year;
        article.created_at = dateFormated;
      });
      return res.status(200).send(result);
    }
  });
});

router.get('/type/:type', (req, res) => {
  const type = req.params.type;

  const query =
    'SELECT id, title, thumbnail, text, type, link, created_at FROM articles WHERE type=?';
  db.query(query, [type], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: err.sqlMessage });
    } else {
      result.forEach((article) => {
        const dateObj = new Date(article.created_at);

        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const date = dateObj.getDate().toString().padStart(2, '0');

        const dateFormated = date + '-' + month + '-' + year;
        article.created_at = dateFormated;
      });
      return res.status(200).send(result);
    }
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const query =
    'SELECT id, title, thumbnail, text, type, link, created_at FROM articles WHERE id=?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: err.sqlMessage });
    } else {
      let article = result[0];
      const dateObj = new Date(article.created_at);

      const year = dateObj.getFullYear();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const date = dateObj.getDate().toString().padStart(2, '0');

      const dateFormated = date + '-' + month + '-' + year;
      article.created_at = dateFormated;
      return res.status(200).send(article);
    }
  });
});

module.exports = router;
