const express = require('express');
const router = express.Router();
const Multer = require('multer');
const db = require('../config/db');
const imgUpload = require('../modules/imgUpload');
const { authToken } = require('../middleware/authToken');

const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});

router.get('/', authToken, (req, res) => {
  const query = 'SELECT * FROM wastes';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send(result);
  });
});

router.get('/user/:userId', authToken, (req, res) => {
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

router.get('/:id', authToken, (req, res) => {
  const id = req.params.id;

  const query = 'SELECT * FROM wastes WHERE id=?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send(result[0]);
  });
});

router.post(
  '/create',
  authToken,
  multer.single('image'),
  imgUpload.uploadToGcs,
  (req, res) => {
    const { userId, type, weight, address } = req.body;
    let imgUrl = '';
    if (req.file && req.file.cloudStoragePublicUrl) {
      imgUrl = req.file.cloudStoragePublicUrl;
    }

    const query =
      'INSERT INTO wastes (user_id, type, weight, address, image, status) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(
      query,
      [userId, type, weight, address, imgUrl, 'Belum diambil'],
      (err, _) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          return res.status(500).send({ message: 'Internal server error' });
        }

        return res.status(201).send({ message: 'Waste created' });
      }
    );
  }
);

router.put(
  '/update/:id',
  authToken,
  multer.single('image'),
  imgUpload.uploadToGcs,
  (req, res) => {
    const id = req.params.id;
    const { type, weight, address } = req.body;
    let imgUrl = '';
    if (req.file && req.file.cloudStoragePublicUrl) {
      imgUrl = req.file.cloudStoragePublicUrl;
    }

    const query =
      'UPDATE wastes SET type=?, weight=?, address=?, image=? WHERE id=?';
    db.query(query, [type, weight, address, imgUrl, id], (err, _) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).send({ message: 'Internal server error' });
      }

      return res.status(201).send({ message: 'Waste updated' });
    });
  }
);

module.exports = router;
