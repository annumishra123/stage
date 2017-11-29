import { Router } from 'express';
import passport from '../passport';
import jwt from 'jsonwebtoken';

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
                message: 'Faliure to login',
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
                    owner: user.owner
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
            owner: req.user.owner
        },
    });
});

export default router;
