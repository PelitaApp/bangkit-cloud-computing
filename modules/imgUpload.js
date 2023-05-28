'use strict';
const { Storage } = require('@google-cloud/storage');
const dateformat = require('dateformat');
const path = require('path');

const pathKey = path.resolve('./serviceaccountkey.json');

const gcs = new Storage({
  projectId: 'pelita-app',
  keyFilename: pathKey,
});

const bucketName = 'pelita-wastes';
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  if (!req.file) return next();

  const gcsname = dateformat(new Date(), 'yyyymmdd-HHMMss');
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

module.exports = ImgUpload;
