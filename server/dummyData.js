import User from './models/user';
import cuid from 'cuid';

export default function () {
  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const admin = new User({
      email: 'admin@devblog.com',
      isAdmin: true,
      cuid: cuid(),
    });

    admin.password = admin.generateHash('almaa');

    admin.save();
  });
}
