import { Router } from 'express';
import passport from '../passport';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import cuid from 'cuid';
import config from '../config';
import axios from 'axios';
import moment from 'moment';

const router = new Router();

router.post("/create", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    console.log(req)
    if (req.user.role === 'finance') {
        var refundObject = {
            remarks: req.body.looknumber,
            id: req.body.orderLineId,
            triggeredBy: req.user.email,
            amount: req.body.amount,
            email: req.body.customerId,
            phoneNumber: `${req.body.phoneNumber}`,
            notifyCustomer: true,
            linkExpiry: moment().add(6, 'days').format('YYYY/MM/DD'),
            name: req.body.name
        };

        let refundUrl = config.targetURL + '/api/om/orders/backend/payment/out/create';
        axios({
            url: refundUrl,
            timeout: 20000,
            method: 'post',
            data: refundObject,
            responseType: 'json',
            headers: {
                'Authorization': config.access_token
            }
        }).then(resp => {
            res.status(200).json(resp.data);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'FAILED',
                message: err
            });
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});

export default router;