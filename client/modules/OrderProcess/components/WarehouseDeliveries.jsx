import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import ReactTable from 'react-table';


class WarehouseDeliveries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    render() {
        return <section className="">

        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(WarehouseDeliveries);
