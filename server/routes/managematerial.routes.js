import { Router } from 'express';
import passport from '../passport';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Material from '../models/rawMaterial';
import Outfit from '../models/outfit';
import cuid from 'cuid';

const router = new Router();

router.post("/creatematerial", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    console.log(req)
    if (req.user.role === 'admin') {
        if (!req.body._id) {
            var newRawMaterial = new Material({
                title: req.body.title.trim(),
                measurementType: req.body.measurementType.trim(),
                availableQuantity: req.body.availableQuantity,
                price: req.body.price,
                alertOffset: req.body.alertOffset,
                alert: false
            });
            newRawMaterial.save().then(item => {
                res.json({
                    status: 'SUCCESS'
                });
            }).catch(err => {
                res.status(400).json({
                    status: 'FAILED'
                });
            });
        } else {
            Material.findOne({ '_id': req.body._id }, function (err, rawMaterial) {
                if (rawMaterial) {
                    rawMaterial.set({
                        title: req.body.title.trim(),
                        measurementType: req.body.measurementType.trim(),
                        availableQuantity: req.body.availableQuantity,
                        price: req.body.price,
                        alertOffset: req.body.alertOffset,
                        alert: req.body.alert
                    });
                    rawMaterial.save().then(item => {
                        res.json({
                            status: 'SUCCESS'
                        });
                    }).catch(err => {
                        res.status(400).json({
                            status: 'FAILED'
                        });
                    });
                }
            });
        }
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.get("/getrawmaterials", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user.role === 'admin') {
        Material.find({}).then(rawMaterial => {
            res.json(rawMaterial);
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

router.get("/deletematerial", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user.role === 'admin') {
        if (req.query._id) {
            Material.findOne({
                '_id': req.query._id
            }, function (err, rawMaterial) {
                if (rawMaterial) {
                    rawMaterial.remove().then(item => {
                        res.json({
                            status: 'DELETED'
                        });
                    }).catch(err => {
                        res.status(400).json({
                            status: 'FAILED'
                        });
                    });
                }
            });
        }
        else {
            res.status(400).send('Bad Request');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.post("/createoutfit", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    console.log(req)
    if (req.user.role === 'admin') {
        if (!req.body._id) {
            var newOutfit = new Outfit({
                title: req.body.title.trim(),
                constituents: req.body.constituents,
                availableQuantity: req.body.availableQuantity,
                soldQuantity: req.body.soldQuantity,
                pipelineQuantity: req.body.pipelineQuantity,
                pipelineOffset: req.body.pipelineOffset
            });
            newOutfit.save().then(item => {
                res.json({
                    status: 'SUCCESS'
                });
            }).catch(err => {
                res.status(400).json({
                    status: 'FAILED'
                });
            });
        } else {
            Outfit.findOne({ '_id': req.body._id }, function (err, outfit) {
                if (outfit) {
                    outfit.set({
                        title: req.body.title.trim(),
                        constituents: req.body.constituents,
                        availableQuantity: req.body.availableQuantity,
                        soldQuantity: req.body.soldQuantity,
                        pipelineQuantity: req.body.pipelineQuantity,
                        pipelineOffset: req.body.pipelineOffset
                    });
                    outfit.save().then(item => {
                        res.json({
                            status: 'SUCCESS'
                        });
                    }).catch(err => {
                        res.status(400).json({
                            status: 'FAILED'
                        });
                    });
                }
            });
        }
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.get("/getoutfits", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user.role === 'admin') {
        Outfit.find({}).then(outfit => {
            res.json(outfit);
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

router.get("/deleteoutfit", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user.role === 'admin') {
        if (req.query._id) {
            Outfit.findOne({
                '_id': req.query._id
            }, function (err, outfit) {
                if (outfit) {
                    outfit.remove().then(item => {
                        res.json({
                            status: 'DELETED'
                        });
                    }).catch(err => {
                        res.status(400).json({
                            status: 'FAILED'
                        });
                    });
                }
            });
        }
        else {
            res.status(400).send('Bad Request');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.post("/marksold", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    console.log(req)
    if (req.user.role === 'admin') {
        if (req.body._id && req.body.soldQuantity) {
            Outfit.findOne({ '_id': req.body._id }, function (err, outfit) {
                if (outfit) {
                    outfit.soldQuantity += req.body.soldQuantity;
                    outfit.availableQuantity -= req.body.soldQuantity;
                    if (outfit.availableQuantity < outfit.pipelineOffset) {
                        var toBeAddedToPipeline = outfit.pipelineOffset - outfit.availableQuantity;
                        outfit.pipelineQuantity += toBeAddedToPipeline;
                        Object.keys(outfit.constituents).map((key, i) => {
                            Material.findOne({ 'title': key }, function (err, material) {
                                material.availableQuantity -= outfit.constituents[key] * toBeAddedToPipeline;
                                if (material.availableQuantity <= material.alertOffset) {
                                    material.alert = true;
                                }
                                material.save();
                            })

                        });
                        outfit.save().then(item => {
                            res.json({
                                status: 'SUCCESS'
                            });
                        }).catch(err => {
                            res.status(400).json({
                                status: 'FAILED'
                            });
                        });
                    }
                } else {
                    res.send('Outfit Not Found')
                }
            })
        } else {
            res.status(400).send('Bad Request');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
});



export default router;