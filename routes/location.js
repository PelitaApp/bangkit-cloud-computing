const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authToken } = require('../middleware/authToken');

router.get('/', authToken, (req, res) => {
  const query = 'SELECT id, lat, lon, driver_id FROM locations';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send(result);
  });
});

router.post('/upload', authToken, (req, res) => {
  const { lat, lon, driverId } = req.body;

  const getQuery = 'SELECT * FROM locations WHERE driver_id=?';
  db.query(getQuery, [driverId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    if (result.length > 0) {
      const msg = "Can't add more location!";
      return res.status(409).send({ message: msg });
    }

    const query =
      'INSERT INTO locations (lat, lon, driver_id) VALUES (?, ?, ?)';
    db.query(query, [lat, lon, driverId], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).send({ message: 'Internal server error' });
      }

      return res.status(201).send({ message: 'Location added' });
    });
  });
});

router.get('/:id', authToken, (req, res) => {
  const id = req.params.id;

  const query = 'SELECT lat, lon, driver_id FROM locations WHERE id=?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send(result[0]);
  });
});

router.put('/:id', authToken, (req, res) => {
  const id = req.params.id;
  const { lat, lon } = req.body;

  const query = 'UPDATE locations SET lat=?, lon=? WHERE id=?';
  db.query(query, [lat, lon, id], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send({ message: 'Location updated' });
  });
});

router.delete('/:id', authToken, (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM locations WHERE id=?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send({ message: 'Location deleted' });
  });
});

module.exports = router;
