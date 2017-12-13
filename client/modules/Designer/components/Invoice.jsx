import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import moment from 'moment';
import { getDesignerInventory } from '../DesignerActions';
import clientConfig from '../../../config';

// Import Style
import styles from './designer.css';


class Invoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: moment().month(),
            year: moment().year(),
            isDelhi: true
        }
    }

    handleChangeMonth(e) {
        this.setState({
            month: e.target.value,
        });
    }

    handleChangeYear(e) {
        this.setState({
            year: e.target.value,
        });
    }

    handleChangeCity(value) {
        this.setState({
            isDelhi: value,
        });
    }

    render() {
        return <section className={ styles.designerInvoice }>
                 <h1>Create Invoice</h1>
                 <br/>
                 <select defaultValue={ this.state.month } onChange={ this.handleChangeMonth.bind(this) }>
                   <option value="1">January</option>
                   <option value="2">February</option>
                   <option value="3">March</option>
                   <option value="4">April</option>
                   <option value="5">May</option>
                   <option value="6">June</option>
                   <option value="7">July</option>
                   <option value="8">August</option>
                   <option value="9">September</option>
                   <option value="10">October</option>
                   <option value="11">November</option>
                   <option value="12">December</option>
                 </select>
                 <input type="number" defaultValue={ this.state.year } onChange={ this.handleChangeYear.bind(this) } />
                 <br/>
                 <br/>
                 <input type="radio" name="city" onClick={ this.handleChangeCity.bind(this, true) } defaultChecked={ true } />
                 <label> Delhi Based</label>
                 <br/>
                 <input type="radio" name="city" onClick={ this.handleChangeCity.bind(this, false) } />
                 <label> Other City</label>
                 <br/>
                 <br/>
                 <a target="blank" href={ '/api/revshare/api/owners/invoice?owner=' + this.props.owner + '&month=' + this.state.month + '&year=' + this.state.year + '&ut=' + this.state.isDelhi }>Generate Invoice</a>
                 <br/>
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
