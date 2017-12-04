import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import moment from 'moment';
import { getDesignerInventory } from '../DesignerActions';
import clientConfig from '../../../config';


class Invoice extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // if (this.props.owner) {
        //     this.props.getDesignerInventory(this.props.owner);
        // }
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.owner !== nextProps.owner) {
        //     this.props.getDesignerInventory(nextProps.owner);
        // }
    }

    render() {
        return <section>
               </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getDesignerInventory
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        inventory: state.designerInventory,
        role: state.auth.role,
        owner: state.auth.owner,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Invoice);
