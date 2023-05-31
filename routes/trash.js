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
  const query = 'SELECT * FROM trashes';
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

  const query = 'SELECT * FROM trashes WHERE user_id=?';
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

  const query = 'SELECT * FROM trashes WHERE id=?';
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
    const { userId, type, weight, note, address } = req.body;
    let imgUrl = '';
    if (req.file && req.file.cloudStoragePublicUrl) {
      imgUrl = req.file.cloudStoragePublicUrl;
    }

    const query =
      'INSERT INTO trashes (user_id, type, weight, note, address, image, status) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(
      query,
      [userId, type, weight, note, address, imgUrl, 'Belum diambil'],
      (err, _) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          return res.status(500).send({ message: 'Internal server error' });
        }

        return res.status(201).send({ message: 'Trash created' });
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
    const { type, weight, note, address } = req.body;
    let imgUrl = '';
    if (req.file && req.file.cloudStoragePublicUrl) {
      imgUrl = req.file.cloudStoragePublicUrl;
    }

    const query =
      'UPDATE trashes SET type=?, weight=?, note=?, address=?, image=? WHERE id=?';
    db.query(query, [type, weight, note, address, imgUrl, id], (err, _) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).send({ message: 'Internal server error' });
      }

      return res.status(201).send({ message: 'Trash updated' });
    });
  }
);

router.put('/taken/:id', authToken, (req, res) => {
  const id = req.params.id;
  const status = 'Sudah diambil';

  const query = 'UPDATE trashes SET status=? WHERE id=?';
  db.query(query, [status, id], (err, _) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send({ message: 'Status changed' });
  });
});

module.exports = router;
