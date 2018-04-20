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
      {this.props.role !== 'designer' ? <ul>
        <li>
          <Link to="/customer">Create/Find Customer</Link>
        </li>
        <li>
          <Link to="/shop">Shop Orders</Link>
        </li>
        <li>
          <Link to="/rent">Rent Orders</Link>
        </li>
        <li>
          <Link to="/delivery">Delivery</Link>
        </li>
        <li>
          <Link to="/inventory">Inventory</Link>
        </li>
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/owners">Rev-share</Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/cms/instagram">Instagram</Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/inventory/shop/stock">Shop Stock</Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/rent/coupons">Coupons</Link>
        </li> : null}
        {this.props.role == 'superuser' ? <li>
          <Link>Create User<br />(coming soon)</Link>
        </li> : null}
      </ul> : <div>
          <h1>{this.props.owner.toUpperCase()}</h1>
          <ul>
            <li>
              <Link to="/designer/inventory">Inventory</Link>
            </li>
            <li>
              <Link to="/designer/orders">Orders</Link>
            </li>
            <li>
              <Link to="/designer/invoice">Invoice</Link>
            </li>
            <li>
              <Link to="/login/update">Change Password</Link>
            </li>
          </ul>
        </div>}
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
