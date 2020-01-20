import { Router } from 'express';
import passport from '../passport';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import RefundLog from '../models/refund';
import cuid from 'cuid';
import config from '../config';
import axios from 'axios';

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
            looknumber: req.body.looknumber,
            customerId: req.body.customerId,
            phoneNumber: req.body.phoneNumber
        });

        let emailUrl = config.notificationUrl + '/notify';
        let emailPromise = axios({
            url: emailUrl,
            timeout: 20000,
            method: 'post',
            data: {
                "ccEmailId": "tech@stage3.co",
                "configs": {
                    "customerId": req.body.customerId,
                    "looknumber": req.body.looknumber,
                    "amount": req.body.amount
                },
                "emailId": req.body.customerId,
                "messageType": "REFUND_APPROVED",
                "subjectLine": "Bank details required for security deposit refund"
            },
            responseType: 'json'
        });

        let smsUrl = config.notificationUrl + '/sms/notify';
        let smsPromise = axios({
            url: smsUrl,
            timeout: 20000,
            method: 'post',
            data: {
                "configs": {
                    "customerId": req.body.customerId,
                    "looknumber": req.body.looknumber,
                    "amount": req.body.amount
                },
                "messageType": "REFUND_APPROVED",
                "number": req.body.phoneNumber
            },
            responseType: 'json'
        });

        Promise.all([emailPromise, smsPromise]).then((response) => {
            newLogForRefund.save().then(item => {
                RefundLog.find({ orderId: req.body.orderId }).sort({ "createdBy": 'desc' }).then(refundLogs => {
                    res.json(refundLogs);
                }).catch(err => {
                    console.log(err);
                    res.status(400).json({
                        status: 'FAILED'
                    });
                });
            }).catch(err => {
                res.status(500).json({
                    status: 'FAILED'
                });
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send('Email Not Queued');
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.get("/getByOrderId", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user.role === 'admin') {
        RefundLog.find({ orderId: req.query.orderId }).sort({ "createdDate": 'desc' }).then(refundLogs => {
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

router.get("/getAllUnprocessedRefunds", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user.role === 'admin') {
        RefundLog.find({ refunded: false }).sort({ "createdDate": 'asc' }).then(refundLogs => {
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

router.get("/markRefunded", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user.role === 'admin') {
        RefundLog.findById(req.query.refundLogId).then(refundLog => {
            refundLog.refunded = true;
            refundLog.refundedDate = Date.now();
            let promiseArray = [];

            let emailUrl = config.notificationUrl + '/notify';
            let emailPromise = axios({
                url: emailUrl,
                timeout: 20000,
                method: 'post',
                data: {
                    "ccEmailId": "tech@stage3.co",
                    "configs": {
                        "customerId": refundLog.customerId,
                        "looknumber": refundLog.looknumber,
                        "amount": refundLog.amount
                    },
                    "emailId": refundLog.customerId,
                    "messageType": "REFUND_INITIATED",
                    "subjectLine": "Your security deposit refund has been initiated"
                },
                responseType: 'json'
            });
            promiseArray.push(emailPromise);

            if (refundLog.phoneNumber) {
                let smsUrl = config.notificationUrl + '/sms/notify';
                let smsPromise = axios({
                    url: smsUrl,
                    timeout: 20000,
                    method: 'post',
                    data: {
                        "configs": {
                            "customerId": refundLog.customerId,
                            "looknumber": refundLog.looknumber,
                            "amount": refundLog.amount
                        },
                        "messageType": "REFUND_INITIATED",
                        "number": refundLog.phoneNumber
                    },
                    responseType: 'json'
                });
                promiseArray.push(smsPromise);
            }

            Promise.all(promiseArray).then((response) => {
                refundLog.save().then(refund => {
                    RefundLog.find({ refunded: false }).sort({ "createdDate": 'asc' }).then(refundLogs => {
                        res.json(refundLogs);
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            status: 'FAILED'
                        });
                    });
                });
            }).catch((error) => {
                console.log(error);
                res.status(500).send('Email Not Queued');
            });
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

router.get("/getRefundsByUserId", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user.role === 'admin') {
        RefundLog.find({ customerId: req.query.customerId }).sort({ "createdDate": 'asc' }).then(refundLogs => {
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

router.post("/provideBankDetails", (req, res) => {
    RefundLog.findById(req.body.id).then(refundLog => {
        if (refundLog.bankDetailsProvided) {
            res.status(500).json({
                status: 'ALREADY_PROVIDED'
            });
        } else {
            if (res.body.accountHolder && res.body.accountType && res.body.bank && res.body.branch && res.body.accountNumber && res.body.ifscCode) {
                refundLog.accountHolder = res.body.accountHolder;
                refundLog.accountType = res.body.accountType;
                refundLog.bank = res.body.bank;
                refundLog.branch = res.body.branch;
                refundLog.accountNumber = res.body.accountNumber;
                refundLog.ifscCode = res.body.ifscCode;
                refundLog.bankDetailsProvidedOn = Date.now();
                refundLog.bankDetailsProvided = true;
                refundLog.save().then(item => {
                    res.status(200).json({
                        status: 'SUCCESS',
                        data: item
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        status: 'FAILED'
                    });
                });
            } else {
                res.status(500).json({
                    status: 'MISSING_FIELD'
                });
            }
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: 'NOT_FOUND'
        });
    });
});

export default router;