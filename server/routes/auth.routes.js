import { Router } from 'express';
import passport from '../passport';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import cuid from 'cuid';

const router = new Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        session: false,
    }, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({
                user: {
                    ok: false,
                },
                message: 'Login failed',
            });
        } else {
            console.log(user);
            const payload = {
                email: user.email,
                cuid: user._id ? user._id.toString() : '',
            };
            const token = jwt.sign(payload, 'secret');

            if (req.session) {
                req.session.token = token;
            }

            return res.json({
                message: '',
                user: {
                    ok: true,
                    token,
                    role: user.role,
                    email: user.email,
                    name: user.name,
                    owner: user.owner,
                    phoneNumber: user.phoneNumber
                },
            });
        }
    })(req, res, next);
});

router.get('/me', passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    return res.json({
        user: {
            ok: true,
            role: req.user.role,
            email: req.user.email,
            name: req.user.name,
            owner: req.user.owner,
            phoneNumber: req.user.phoneNumber
        },
    });
});

router.get("/getusers", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user.role === 'superuser') {
        User.find({}).then(users => {
            res.json(users);
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

router.get("/getrunners", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user.role === 'superuser' || req.user.role === 'logistics' || req.user.role === 'warehouse' || req.user.role === 'admin') {
        User.find({ 'role': 'delivery' }).then(users => {
            res.json(users);
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

router.post("/createuser", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user.role === 'superuser') {
        if (req.body.email && req.body.role && req.body.password && req.body.name) {
            User.findOne({
                'email': req.body.email
            }, function (err, user) {
                if (!user) {
                    var newUser = new User({
                        email: req.body.email.trim().toLowerCase(),
                        isAdmin: true,
                        cuid: cuid(),
                        role: req.body.role.trim(),
                        name: req.body.name.trim(),
                        owner: req.body.owner ? req.body.owner.trim() : '',
                        dateAdded: Date.now(),
                        phoneNumber: req.body.phoneNumber
                    });
                    newUser.password = newUser.generateHash(req.body.password);
                    newUser.save().then(item => {
                        res.json({
                            status: 'SUCCESS'
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(400).json({
                            status: 'FAILED'
                        });
                    });
                } else if (user) {
                    user.set({
                        role: req.body.role.trim(),
                        name: req.body.name.trim(),
                        owner: req.body.owner.trim(),
                        password: user.generateHash(req.body.password),
                        phoneNumber: req.body.phoneNumber
                    });
                    user.save().then(item => {
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
        } else {
            res.status(400).send('Bad Request');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.post("/changepassword", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user) {
        if (req.body.password) {
            User.findOne({
                'email': req.user.email
            }, function (err, user) {
                if (user) {
                    user.set({
                        password: user.generateHash(req.body.password)
                    });
                    user.save().then(item => {
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
        } else {
            res.status(400).send('Bad Request');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.get("/deleteuser", passport.authenticate('jwt', {
    session: false,
}), (req, res) => {
    if (req.user) {
        if (req.user.role === 'superuser' && req.query.email) {
            User.findOne({
                'email': req.query.email
            }, function (err, user) {
                if (user) {
                    user.remove().then(item => {
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
        } else {
            res.status(400).send('Bad Request');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
});

export default router;
