import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return <section>Users</section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
    return {};
}


export default connect(mapStateToProps, matchDispatchToProps)(Users);