import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import moment from 'moment';
import { getOwners } from '../DesignerActions';
import clientConfig from '../../../config';
import FormSubmitButton from '../../Customer/components/FormSubmitButton.js'
import OwnerForm from './OwnerForm.jsx';
class Owner extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getOwners()
    }
    renderOwners() {
        if (this.props.revshares) {
            if (this.props.revshares.length > 0) {
                return (<div>
                    <ReactTable filterable data={this.props.revshares} columns={clientConfig.ownersColumns} defaultPageSize={10} className="-striped -highlight" />
                </div>);
            }
        }
    }


    render() {
        return (<section>
            <h1>Owners</h1>
            <OwnerForm />
            <FormSubmitButton formName="createOwner" text="Create owner" />
            <br />
            {this.renderOwners()}
        </section>);
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getOwners,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        revshares: state.revshares,
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Owner);
