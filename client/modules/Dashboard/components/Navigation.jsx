import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Import Style
import styles from './navigations.css';


class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  render() {
    return (<section className={styles.navigations}>
      <ul>
        {this.props.role == 'superuser' ? <li>
          <Link to="/create">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-newuser2.png" />
            </figure>
            <p>Create User</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/inventory">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-inventory.png" />
            </figure>
            <p>Inventory</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/stories">
            <figure>
              <img src="https://res.cloudinary.com/stage3/image/upload/f_auto,q_auto:low/icon-stories.png" />
            </figure>
            <p>Stories</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/influencer">
            <figure>
              <img src="https://res.cloudinary.com/stage3/image/upload/f_auto,q_auto:low/icon-influencer.png" />
            </figure>
            <p>Influencer</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/market/logistics">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/dashboard-logistic-delivery.png" />
            </figure>
            <p>Logistics</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/manage/returns">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/dashboard-delivery-flip.png" />
            </figure>
            <p>Returns</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/manage/payment">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-rev-share.png" />
            </figure>
            <p>Payment</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/marketplace/rent">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-rent-orders2.png" />
            </figure>
            <p>Orders</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/login/update">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-change-password.png" />
            </figure>
            <p>Change Password</p>
          </Link>
        </li> : null}
      </ul>
    </section>);
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  return {
    role: state.auth.role,
    owner: state.auth.owner,
  };
}


export default connect(mapStateToProps, matchDispatchToProps)(Navigation);
