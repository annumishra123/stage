import { Router } from 'express';
import passport from '../passport';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import RefundLog from '../models/refund';
import cuid from 'cuid';

const router = new Router();

router.post("/sendRefundEmail", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    console.log(req)
    if (req.user.role === 'admin') {
        var newLogForRefund = new RefundLog({
            orderId: req.body.orderId,
            orderLineId: req.body.orderLineId,
            createdDate: req.body.createdDate,
            createdBy: req.body.createdBy,
            amount: req.body.amount,
        });

        // Send refund email to customer

        newLogForRefund.save().then(item => {
            RefundLog.find({ orderId: req.body.orderId }).sort({ "createdBy": -1 }).then(refundLogs => {
                res.json(refundLogs);
            }).catch(err => {
                console.log(err);
                res.status(400).json({
                    status: 'FAILED'
                });
            });
        }).catch(err => {
            res.status(400).json({
                status: 'FAILED'
            });
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.get("/getByOrderId", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user.role === 'admin') {
        RefundLog.find({ orderId: req.query.orderId }).sort({ "createdBy": -1 }).then(refundLogs => {
            res.json(refundLogs);
        }).catch(err => {
            console.log(err);
            res.status(400).json({
                status: 'FAILED'
            });
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});

export default router;