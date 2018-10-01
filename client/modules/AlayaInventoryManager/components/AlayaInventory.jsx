import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createRawMaterial, getAllRawMaterial, deleteRawMaterial, createOutfit, getAllOutfits, deleteOutfit } from '../AlayaInventoryActions';
import ReactTable from 'react-table';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import clientConfig from '../../../config';


class AlayaInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            materialTitle: '',
            measurementType: '',
            availableQuantity: '',
            price: '',
            alertOffset: '',
            alert: false,
            outfitTitle: '',
            constituents: '',
            outfitAvailableQuantity: '',
            soldQuantity: '',
            pipeline: '',
            pipelineOffset: ''
        };
    }

    componentDidMount() {
        this.props.getAllRawMaterial();
    }

    deleteRawMaterial(materialTitle) {
        this.props.deleteRawMaterial(materialTitle)
    }

    handleNavigationPage() {
        browserHistory.push('/menu');
    }

    handleTabChange(tabIndex) {
        this.setState({ tabIndex: tabIndex });
    }

    handleCreateMaterialTitle(e) {
        this.setState({ materialTitle: e.target.value });
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

    handleCreateOufitTitle(e) {
        this.setState({ handleCreateOufitTitle: e.target.value });
    }

    handleCreateOutfitAvailableQuantity(e) {
        this.setState({ outfitAvailableQuantity: e.target.value });
    }

    handleCreateSoldQuantity(e) {
        this.setState({ soldQuantity: e.target.value });
    }

    handleCreatePipeline(e) {
        this.setState({ pipeline: e.target.value });
    }

    handleCreatePipelineOffset(e) {
        this.setState({ pipelineOffset: e.target.value });
    }

    createRawMaterial(e) {
        e.preventDefault();
        if (this.state.materialTitle != '' && this.state.measurementType != '' && this.state.availableQuantity != '' && this.state.price != '' && this.state.alertOffset != '') {
            let rawMaterial = {
                materialTitle: this.state.materialTitle.split(","),
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

    createOutfit(e) {
        e.preventDefault();
        if (this.state.outfitTitle != '' && thist.state.constituents != '' && this.state.outfitAvailableQuantity != '' && this.state.pipelineOffset != '') {
            let outfit = {
                oufitTitle: this.state.oufitTitle.split(","),
                constituents: this.state.constituents,
                outfitAvailableQuantity: this.state.outfitAvailableQuantity,
                soldQuantity: this.state.soldQuantity,
                pipeline: this.state.pipeline,
                pipelineOffset: this.state.pipelineOffset
            }
            this.props.createOutfit(outfit);
        }
        else {
            alert('Fill in all the details');
        }
    }

    renderRawMaterials() {
        if (this.props.allRawMaterials) {
            if (this.props.allRawMaterials.length > 0) {
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
                    <ReactTable data={this.props.allRawMaterials} columns={clientConfig.rawMaterialColumns} className="-striped -highlight" />
                </div>
            }
        }
    }


    renderOutfits() {
        if (this.props.allOutfits) {
            if (this.props.allOutfits.length > 0) {
                if (!clientConfig.outfitColumns.find(o => o.id == 'delete')) {
                    clientConfig.outfitColumns.unshift({
                        Header: '',
                        id: 'delete',
                        accessor: 'title',
                        Cell: ({ value }) => (<button onClick={this.deleteOutfit.bind(this, value)}>Delete</button>)
                    });
                }
                return <div>
                    <h1>Alaya Outfits</h1>
                    <ReactTable data={this.props.all} columns={clientConfig.outfitColumns} className="-striped -highlight" />
                </div>
            }
        }
    }

    render() {
        return (<section>
            <div>
                <button onClick={this.handleNavigationPage.bind(this)}>Back</button>
                <h1>Alaya Inventory</h1>
                <br />
                <Tabs selectedIndex={this.state.tabIndex} onSelect={this.handleTabChange.bind(this)}>
                    <TabList>
                        <Tab>Raw Materials</Tab>
                        <Tab>Outfits</Tab>
                    </TabList>
                    <TabPanel>
                        <h1>Create Raw Material</h1>
                        <form>
                        <div>
                            <h4>Title: </h4>
                            <input type="text" onChange={this.handleCreateMaterialTitle.bind(this)} />
                        </div>
                        <div>
                            <h4>Measurement Type: </h4>
                            <select defaultValue={this.state.measurementType} onChange={this.handleCreateMeasurementType.bind(this)}>
                                <option value=""> -- Select Type -- </option>
                                <option value="thaan">Thaan</option>
                                <option value="packet">Packet</option>
                            </select>
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
                        </form>
                        <br />
                        {this.renderRawMaterials()}
                    </TabPanel>
                    <TabPanel>
                        <h1>Create Outfit</h1>
                        <div>
                            <h4>Title: </h4>
                            <input type="text" onChange={this.handleCreateOufitTitle.bind(this)} />
                        </div>
                        <div>
                            <h4>Constituents: </h4>

                        </div>
                        <div>
                            <h4>Available Quantity: </h4>
                            <input type="number" onChange={this.handleCreateOutfitAvailableQuantity.bind(this)} />
                        </div>
                        <div>
                            <h4>Sold Quantity: </h4>
                            <input type="number" onChange={this.handleCreateSoldQuantity.bind(this)} />
                        </div>
                        <div>
                            <h4>Pipeline: </h4>
                            <input type="number" onChange={this.handleCreatePipeline.bind(this)} />
                        </div>
                        <div>
                            <h4>Pipeline Offset: </h4>
                            <input type="number" onChange={this.handleCreatePipelineOffset.bind(this)} />
                        </div>
                        <br />
                        <button onClick={this.createOutfit.bind(this)}>Create Outfit</button>
                        <br />
                        {this.renderOutfits()}
                    </TabPanel>
                </Tabs>
            </div>
        </section>)
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllRawMaterial,
        createRawMaterial,
        deleteRawMaterial,
        getAllOutfits,
        createOutfit,
        deleteOutfit
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        allRawMaterials: state.allRawMaterials ? state.allRawMaterials : null,
        allOutfits: state.allOutfits ? state.allOutfits: null
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(AlayaInventory);
