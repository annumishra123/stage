import User from './models/user';
import cuid from 'cuid';

export default function () {
  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const admin = new User({
      email: 'store@stage3.co',
      isAdmin: true,
      cuid: cuid(),
      role: 'admin'
    });

    admin.password = admin.generateHash('stage@123');

    admin.save();

    const viewer = new User({
      email: 'warehouse@stage3.co',
      isAdmin: true,
      cuid: cuid(),
      role: 'viewer'
    });

    viewer.password = admin.generateHash('stage@123');

    viewer.save();
  });
}
