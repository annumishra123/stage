import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return <section>
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
                 </ul>
               </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
    return {};
}


export default connect(mapStateToProps, matchDispatchToProps)(Navigation);
