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
          <Link to="/customer">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-newuser2.png" />
            </figure>
            <p>Create/Find Customer</p>
          </Link>
        </li>
        <li>
          <Link to="/shop">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-shop-orders2.png" />
            </figure>
            <p>Shop Orders</p>
          </Link>
        </li>
        <li>
          <Link to="/rent">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-rent-orders2.png" />
            </figure>
            <p>Rent Orders</p>
          </Link>
        </li>
        <li>
          <Link to="/delivery/rent">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-rent-delivery.png" />
            </figure>
            <p>Rent Delivery</p>
          </Link>
        </li>
        <li>
          <Link to="/delivery/shop">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-shop-delivery.png" />
            </figure>
            <p>Shop Delivery</p>
          </Link>
        </li>
        <li>
          <Link to="/inventory">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-inventory.png" />
            </figure>
            <p>Inventory</p>
          </Link>
        </li>
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/owners">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-rev-share.png" />
            </figure>
            <p>Rev-share</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/cms/instagram">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-instagram.png" />
            </figure>
            <p>Instagram</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/inventory/shop/stock">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-shop-stock.png" />
            </figure>
            <p>Shop Stock</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/rent/coupons">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-coupon.png" />
            </figure>
            <p>Coupons</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/crm/tasks/all/slaSeconds/0/20/0">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-crm.png" />
            </figure>
            <p>CRM</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/shipping">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-logistics.png" />
            </figure>
            <p>Logistics</p>
          </Link>
        </li> : null}
        {this.props.role == 'superuser' ? <li>
          <Link to="/crm/metadata">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-metadata.png" />
            </figure>
            <p>CRM Metadata</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/refunds">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-refund.png" />
            </figure>
            <p>Refunds</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/scan">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-scan.png" />
            </figure>
            <p>Scan</p>
          </Link>
        </li> : null}
        {this.props.role == 'superuser' ? <li>
          <Link to="/create">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-newuser2.png" />
            </figure>
            <p>Create User</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/alaya">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-fabric.png" />
            </figure>
            <p>Alaya Inventory Manager</p>
          </Link>
        </li> : null}
        {this.props.role == 'admin' || this.props.role == 'superuser' ? <li>
          <Link to="/createstore">
            <figure>
              <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-create-store.png" />
            </figure>
            <p>Create Store</p>
          </Link>
        </li> : null}
      </ul> : <div>
          <h1>{this.props.owner.toUpperCase()}</h1>
          <ul>
            <li>
              <Link to="/designer/inventory">
                <figure>
                  <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-inventory.png" />
                </figure>
                <p>Inventory</p></Link>
            </li>
            <li>
              <Link to="/designer/orders">
                <figure>
                  <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-order3.png" />
                </figure>
                <p>Orders</p>
              </Link>
            </li>
            <li>
              <Link to="/designer/invoice">
                <figure>
                  <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-invoice.png" />
                </figure>
                <p>Invoice</p>
              </Link>
            </li>
            <li>
              <Link to="/login/update">
                <figure>
                  <img src="https://ik.imagekit.io/stage3/tr:n-web/icon-change-password.png" />
                </figure>
                <p>Change Password</p>
              </Link>
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
