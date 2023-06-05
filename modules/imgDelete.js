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
    const path = 'https://storage.googleapis.com/' + bucketName + '/';
    const name = filename.split(path);
    const file = bucket.file(name[1]);

    await file.delete();
    return true;
  } catch (err) {
    console.error('Error deleting file:', err);
    return false;
  }
}

module.exports = imgDelete;
