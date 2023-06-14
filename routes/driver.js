const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  const query = 'SELECT id, name, status, phone FROM drivers';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send(result);
  });
});

router.post('/add', (req, res) => {
  const { name, phone } = req.body;

  const query = 'INSERT INTO drivers (name, status, phone) VALUES (?, ?, ?)';
  db.query(query, [name, 'ready', phone], (err, _) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(201).send({ message: 'Success add driver' });
  });
});

router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const { name, phone } = req.body;

  const query = 'UPDATE drivers SET name=?, phone=? WHERE id=?';
  db.query(query, [name, phone, id], (err, _) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send({ message: 'Success update driver' });
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const query = 'SELECT id, name, status, phone FROM drivers WHERE id=?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send(result[0]);
  });
});

router.put('/change/status/:id', (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  const query = 'UPDATE drivers SET status=? WHERE id=?';
  db.query(query, [status, id], (err, _) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send({ message: 'Success change driver status' });
  });
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM drivers WHERE id=?';
  db.query(query, [id], (err, _) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send({ message: 'Success delete driver' });
  });
});

module.exports = router;
