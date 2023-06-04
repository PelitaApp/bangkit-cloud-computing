'use strict';
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const pathKey = path.resolve('./serviceaccountkey.json');

const gcs = new Storage({
  projectId: 'pelita-app',
  keyFilename: pathKey,
});

const bucketName = 'pelita-trashes';
const bucket = gcs.bucket(bucketName);

async function imgDelete(filename) {
  try {
    const bucketName = gcs.bucket(bucketName);
    const file = bucket.file(filename);

    await file.delete();
    return true;
  } catch (err) {
    console.error('Error deleting file:', err);
    return false;
  }
}

exports.default = imgDelete;
