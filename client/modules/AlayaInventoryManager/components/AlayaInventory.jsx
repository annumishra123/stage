import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createRawMaterial, getAllRawMaterial, deleteRawMaterial } from '../AlayaInventoryActions';
import ReactTable from 'react-table';
import clientConfig from '../../../config';


class AlayaRawMaterial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            measurementType: '',
            availableQuantity: '',
            price: '',
            alertOffset: '',
            alert: false
        };
    }

    componentDidMount() {
        this.props.getAllRawMaterial();
    }

    deleteRawMaterial(title) {
        this.props.deleteRawMaterial(title)
    }

    handleNavigationPage() {
        browserHistory.push('/menu');
    }

    handleCreateTitle(e) {
        this.setState({ title: e.target.value });
    }

    handleCreateMeasurementType(e) {
        this.setState({ measurementType: e.target.value });
    }

    handleCreateAvailableQuantity(e) {
        this.setState({ availableQuantity: e.target.value });
    }

    handleCreatePrice(e) {
        this.setState({ price: e.target.value });
    }

    handleCreateAlertOffset(e) {
        this.setState({ alertOffset: e.target.value });
    }

    createRawMaterial(e) {
        e.preventDefault();
        if (this.state.title != '' && this.state.measurementType != '' && this.state.availableQuantity != '' && this.state.price != '' && this.state.alertOffset != '') {
            let rawMaterial = {
                title: this.state.title.split(","),
                measurementType: this.state.measurementType,
                availableQuantity: this.state.availableQuantity,
                price: this.state.price,
                alertOffset: this.state.alertOffset
            }
            this.props.createRawMaterial(rawMaterial);
        }
        else {
            alert('Fill in all the details');
        }
    }

    renderRawMaterials() {
        if (this.props.allRawMaterial) {
            if (this.props.allRawMaterial.length > 0) {
                if (!clientConfig.rawMaterialColumns.find(o => o.id == 'delete')) {
                    clientConfig.rawMaterialColumns.unshift({
                        Header: '',
                        id: 'delete',
                        accessor: 'title',
                        Cell: ({ value }) => (<button onClick={this.deleteRawMaterial.bind(this, value)}>Delete</button>)
                    });
                }
                return <div>
                    <h1>Raw Materials</h1>
                    <ReactTable data={this.props.all} columns={clientConfig.rawMaterialColumns} className="-striped -highlight" />
                </div>
            }
        }
    }

    render() {
        return (<section>
            <button onClick={this.handleNavigationPage.bind(this)}>Back</button>
            <h1>Create Raw Material</h1>
            <div>
                <h4>Title: </h4>
                <input type="text" onChange={this.handleCreateTitle.bind(this)} />
            </div>
            <div>
                <h4>Measurement Type: </h4>
                <input type="text" onChange={this.handleCreateMeasurementType.bind(this)} />
            </div>
            <div>
                <h4>Available Quantity: </h4>
                <input type="number" onChange={this.handleCreateAvailableQuantity.bind(this)} />
            </div>
            <div>
                <h4>Price: </h4>
                <input type="number" onChange={this.handleCreatePrice.bind(this)} />
            </div>
            <div>
                <h4>Alert Offset: </h4>
                <input type="number" onChange={this.handleCreateAlertOffset.bind(this)} />
            </div>
            <br />
            <button onClick={this.createRawMaterial.bind(this)}>Create Raw Material</button>
            <br />
            {this.renderRawMaterials()}
        </section>)
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllRawMaterial,
        createRawMaterial,
        deleteRawMaterial
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        allRawMaterials: state.allRawMaterials ? state.allRawMaterials : null
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(AlayaRawMaterial);
