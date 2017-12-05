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
        this.state = {
            month: moment().month() + 1,
            year: moment().year(),
            designer: '',
            isDelhi: true
        }
    }

    componentDidMount() {
        this.props.getOwners()
    }

    renderOwners() {
        if (this.props.revshares) {
            if (this.props.revshares.length > 0) {
                return (<div>
                          <ReactTable filterable data={ this.props.revshares } columns={ clientConfig.ownersColumns } defaultPageSize={ 5 } className="-striped -highlight" />
                        </div>);
            }
        }
    }

    handleChangeMonth(e) {
        this.setState({
            month: e.target.value
        });
    }

    handleChangeDesigner(e) {
        this.setState({
            designer: e.target.value
        });
    }

    handleChangeYear(e) {
        this.setState({
            year: e.target.value
        });
    }

    handleChangeCity(value) {
        this.setState({
            isDelhi: value
        });
    }

    render() {
        return <section>
                 <h1>Owners</h1>
                 <br />
                 { this.renderOwners() }
                 <br/>
                 <OwnerForm />
                 <FormSubmitButton formName="createOwner" text="Create Owner" />
                 <br/>
                 <br/>
                 <h1>Create Invoice</h1>
                 <br/>
                 <select onChange={ this.handleChangeDesigner.bind(this) }>
                   <option value=""> -- Select Designer -- </option>
                   { this.props.revshares ? this.props.revshares.map((share) => {
                         return <option value={ share.ownername }>
                                  { share.ownername }
                                </option>;
                     }) : null }
                 </select>
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
                 <input type="radio" name="city" onClick={ this.handleChangeCity.bind(this, true) } defaultChecked={ true } />
                 <label>Delhi</label>
                 <input type="radio" name="city" onClick={ this.handleChangeCity.bind(this, false) } />
                 <label>Other</label>
                 <br/>
                 <a target="blank" href={ '/api/revshare/api/owners/invoice?owner=' + this.state.designer + '&month=' + this.state.month + '&year=' + this.state.year + '&ut=' + this.state.isDelhi }>Generate Invoice</a>
               </section>;
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
