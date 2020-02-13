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
}
