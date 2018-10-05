import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createRawMaterial, getAllRawMaterial, deleteRawMaterial, createOutfit, getAllOutfits, deleteOutfit } from '../AlayaInventoryActions';
import ReactTable from 'react-table';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import clientConfig from '../../../config';
import Select from 'react-select';

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
            outfitAvailableQuantity: '',
            soldQuantity: '',
            pipeline: '',
            pipelineOffset: '',
            compositionQuantity: '',
            composition: {}
        };
    }

    componentDidMount() {
        this.props.getAllRawMaterial();
        this.props.getAllOutfits();
    }

    deleteRawMaterial(_id) {
        this.props.deleteRawMaterial(_id)
    }

    deleteOutfit(_id) {
        this.props.deleteOutfit(_id)
    }

    handleNavigationPage() {
        browserHistory.push('/menu');
    }

    handleTabChange(tabIndex) {
        this.setState({ tabIndex: tabIndex });
    }

    handleCreateTitle(e) {
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
        this.setState({ outfitTitle: e.target.value });
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

    handleChangeTitle(e) {
        this.setState({
            materialTitle: e.value
        });
    }

    handleChangeCompositionQuantity(e) {
        this.setState({
            compositionQuantity: e.target.value
        });
    }

    handleChangeComposition() {
        let changedComposition = this.state.composition;
        changedComposition[this.state.materialTitle] = this.state.compositionQuantity;
        this.setState({
            composition: changedComposition
        });
    }

    handleDeleteComposition(key) {
        let changedComposition = this.state.composition;
        delete changedComposition[key];
        this.setState({
            composition: changedComposition
        });       
    }

    createRawMaterial(e) {
        e.preventDefault();
        if (this.state.materialTitle && this.state.measurementType && this.state.availableQuantity && this.state.price && this.state.alertOffset) {
            let rawMaterial = {
                title: this.state.materialTitle,
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
        if (this.state.outfitTitle && this.state.outfitAvailableQuantity && this.state.pipelineOffset && Object.keys(this.state.composition).length > 0) {
            let outfit = {
                title: this.state.outfitTitle,
                composition: this.state.composition,
                availableQuantity: this.state.outfitAvailableQuantity,
                soldQuantity: this.state.soldQuantity,
                pipelineQuantity: this.state.pipeline,
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
                        accessor: '_id',
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
                        accessor: '_id',
                        Cell: ({ value }) => (<button onClick={this.deleteOutfit.bind(this, value)}>Delete</button>)
                    });
                }
                return <div>
                    <h1>Alaya Outfits</h1>
                    <ReactTable data={this.props.allOutfits} columns={clientConfig.outfitColumns} className="-striped -highlight" />
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
                                <input type="text" onChange={this.handleCreateTitle.bind(this)} />
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
                        <h4>Composition:</h4>
                        <div>
                            {this.props.allRawMaterials ? <Select
                                value={this.state.materialTitle}
                                onChange={(e) => this.handleChangeTitle(e)}
                                options={this.props.allRawMaterials.map((item, i) => {
                                    return { value: item.title, label: item.title }
                                })}></Select>
                                : null}
                            <h4>Quantity: </h4>
                            <input type="number" onChange={this.handleChangeCompositionQuantity.bind(this)} />
                            <button onClick={this.handleChangeComposition.bind(this)}>Enter Composition</button>
                            <br/>
                            <ul>
                            {Object.keys(this.state.composition).map((key, i) => {
                                return <li key={i}>{key} : {this.state.composition[key]} <button onClick={this.handleDeleteComposition.bind(this, key)}>Delete</button></li>;
                            })}
                            </ul>
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
        allOutfits: state.allOutfits ? state.allOutfits : null
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(AlayaInventory);
