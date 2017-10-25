import User from './models/user';
import cuid from 'cuid';

export default function () {
  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const admin = new User({
      email: 'shivi@stage3.co',
      isAdmin: true,
      cuid: cuid(),
      role: 'admin'
    });

    admin.password = admin.generateHash('volcantis');

    admin.save();
  });
}
