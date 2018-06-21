import { Router } from 'express';
import pkgcloud from 'pkgcloud';
import fs from 'fs';
import Storage from '@google-cloud/storage';
import path from 'path';

const router = new Router();

router.get('/catalogsheet', (req, res, next) => {
    const storage = new Storage({
        projectId: 'prod-stage3',
        keyFilename: 'keyfile.json'
    });

    const bucketName = 'catalog-sheets-stage3';
    const destFilename = 'upload/newfile.csv';
    const srcFilename = req.query.filename;

    const options = {
        destination: destFilename,
    };

    // Downloads the file
    storage
        .bucket(bucketName)
        .file(srcFilename)
        .download(options)
        .then(() => {
            return res.sendFile('newfile.csv', { root: path.join(__dirname, '../../upload') });
        })
        .catch(err => {
            console.error('ERROR:', err);
            return res.status(500).json({ error: err });
        });
});

export default router;
