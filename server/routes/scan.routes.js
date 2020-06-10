import { Router } from 'express';
import passport from '../passport';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Scan from '../models/scan';
import cuid from 'cuid';
import config from '../config';
import axios from 'axios';

const router = new Router();

router.post("/saveScan", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user) {
        let currentDateTime = Date.now();
        let scan = new Scan({
            sku: req.body.sku,
            location: req.body.location,
            scannedBy: req.user.email,
            reason: req.body.reason,
            timestamp: currentDateTime
        });
        scan.save().then(item => {
            let url = config.targetURL + '/catalogv2/catalogv2/Looks/scan';
            let scanObject = {
                _id: item._id,
                location: req.body.location,
                timestamp: currentDateTime,
                reason: req.body.reason,
                scannedBy: req.user.email
            };
            axios({
                url: url,
                timeout: 20000,
                method: 'post',
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                }),
                data: {
                    sku: req.body.sku,
                    location: req.body.location,
                    latestScan: scanObject
                },
                responseType: 'json'
            }).then(response => {
                res.status(200).send('Outfit Scanned');
            }).catch(error => {
                console.log(error);
                res.status(500).send({
                    status: 'Cannot Update Catalog',
                    error: error
                });
            });
        }).catch(error => {
            res.status(500).send('Cannot Save Log');
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.get('/getAllLogsBySKU', passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user) {
        Scan.find({ sku: req.query.sku }).then(logs => {
            res.status(200).send(logs);
        }).catch(error => {
            res.status(500).send('No Logs Found');
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.get('/getAllLogsByEmail', passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user) {
        Scan.find({ scannedBy: req.query.email }).sort({ "timestamp": -1 }).then(logs => {
            res.status(200).send(logs);
        }).catch(error => {
            res.status(500).send('No Logs Found');
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});

export default router;