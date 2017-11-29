import User from './models/user';
import cuid from 'cuid';

export default function () {
  User.findOne({
    'email': 'super@stage3.co'
  }, function(err, user) {
    if (!user) {
      const superUser = new User({
        email: 'super@stage3.co',
        isAdmin: true,
        cuid: cuid(),
        role: 'superuser',
        name: 'volcantis',
        owner: ''
      });

      superUser.password = superUser.generateHash('volcantis');

      superUser.save();
    }
  });

  User.findOne({
    'email': 'warehouse@stage3.co'
  }, function(err, user) {
    if (!user) {
      const viewer = new User({
        email: 'warehouse@stage3.co',
        isAdmin: true,
        cuid: cuid(),
        role: 'delivery',
        name: 'warehouse',
        owner: ''
      });

      viewer.password = viewer.generateHash('warehouse@123');

      viewer.save();
    }
  });

  User.findOne({
    'email': 'marketing@stage3.co'
  }, function(err, user) {
    if (!user) {
      const viewer = new User({
        email: 'marketing@stage3.co',
        isAdmin: true,
        cuid: cuid(),
        role: 'viewer',
        name: 'marketing',
        owner: ''
      });

      viewer.password = viewer.generateHash('marketing@123');

      viewer.save();
    }
  });

  User.findOne({
    'email': 'store@stage3.co'
  }, function(err, user) {
    if (!user) {
      const admin = new User({
        email: 'store@stage3.co',
        isAdmin: true,
        cuid: cuid(),
        role: 'admin',
        name: 'store',
        owner: ''
      });

      admin.password = admin.generateHash('store@123');

      admin.save();
    }
  });
}
