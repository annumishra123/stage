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

  componentDidMount() {}

  render() {
    return <section className={ styles.navigations }>
             <ul>
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
               { this.props.role == 'superuser' ? <li>
                                                    <Link>Create User
                                                    <br/>(coming soon)</Link>
                                                  </li> : null }
             </ul>
           </section>
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  return {
    role: state.auth.role
  };
}


export default connect(mapStateToProps, matchDispatchToProps)(Navigation);
