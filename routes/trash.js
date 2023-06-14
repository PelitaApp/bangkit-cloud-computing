const express = require('express');
const router = express.Router();
const Multer = require('multer');
const db = require('../config/db');
const imgUpload = require('../modules/imgUpload');
const imgDelete = require('../modules/imgDelete');
const { authToken } = require('../middleware/authToken');

const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});

router.get('/', authToken, (req, res) => {
  const query =
    'SELECT id, user_id, driver_id, type, weight, address, note, image, status FROM trashes';
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

  const query =
    'SELECT id, user_id, driver_id, type, weight, address, note, image, status FROM trashes WHERE user_id=?';
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

  const query =
    'SELECT id, user_id, driver_id, type, weight, address, note, image, status FROM trashes WHERE id=?';
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
    const status = 'Belum diambil';

    const query =
      'INSERT INTO trashes (user_id, type, weight, note, address, image, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(
      query,
      [userId, type, weight, note, address, imgUrl, status],
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

    const getImg = 'SELECT image FROM trashes WHERE id=?';
    db.query(getImg, [id], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).send({ message: 'Internal server error' });
      }

      const imgName = result[0].image;

      const query =
        'UPDATE trashes SET type=?, weight=?, note=?, address=?, image=? WHERE id=?';
      db.query(
        query,
        [type, weight, note, address, imgUrl, id],
        async (err, _) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            return res.status(500).send({ message: 'Internal server error' });
          }

          const deleted = await imgDelete(imgName);
          if (!deleted) {
            return res.status(500).send({ message: 'Gagal menghapus file' });
          } else {
            return res.status(200).send({ message: 'Trash updated' });
          }
        }
      );
    });
  }
);

router.put('/change/:id', authToken, (req, res) => {
  const id = req.params.id;
  const { status, driverId } = req.body;

  const query = 'UPDATE trashes SET status=?, driver_id=? WHERE id=?';
  db.query(query, [status, driverId, id], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(400).send({ message: "Can't change status" });
    }

    return res.status(200).send({ message: 'Status changed' });
  });
});

router.delete('/delete/:id', authToken, (req, res) => {
  const id = req.params.id;

  const getImg = 'SELECT image FROM trashes WHERE id=?';
  db.query(getImg, [id], async (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    const imgName = result[0].image;
    const deleted = await imgDelete(imgName);

    if (!deleted) {
      return res.status(500).send({ message: 'Gagal menghapus file' });
    } else {
      const query = 'DELETE FROM trashes WHERE id=?';
      db.query(query, [id], (err, _) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          return res.status(500).send({ message: 'Internal server error' });
        }

        return res.status(200).send({ message: 'Trash delete successful' });
      });
    }
  });
});

module.exports = router;
