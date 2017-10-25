import { Router } from 'express';
import passport from '../passport';
import jwt from 'jsonwebtoken';

const router = new Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        session: false
    }, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({
                user: {
                    ok: false
                },
                message: 'Faliure to login',
            });
        } else {
            const payload = {
                email: user.email
            };
            const options = {
                subject: user.cuid ? user.cuid.toString() : ''
            };
            const token = jwt.sign(payload, 'secret', options);

            if (req.session) {
                req.session.token = token;
            }

            return res.json({
                message: '',
                user: {
                    ok: true,
                    token,
                    role: user.role
                }
            });
        }
    })(req, res, next);
});

router.get('/me', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: {
            ok: true,
            role: user.role
        }
    });
});

export default router;