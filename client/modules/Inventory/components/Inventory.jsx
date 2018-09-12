import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { getLastQCStatus, setQCStatus, fetchAccessoryCatalog, fetchRentCatalog, fetchShopCatalog, changeShopLookLocation, changeRentLookLocation, changeRentAccessoryLocation, fetchShopProduct, fetchRentProduct, fetchAccessory, updateShopProduct, updateRentProduct, updateAccessory, clearShopProduct, clearRentProduct, clearAccessory, uploadCSV, uploadShopCSV, uploadAccessoryCSV, fetchUpdateLogs, downloadCSV } from '../InventoryActions';
import clientConfig from '../../../config';
import { CSVLink } from 'react-csv';
import ReactModal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dropzone from 'react-dropzone';
import moment from 'moment';

// Import Style
import styles from './inventory.css';

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            viewOrderDetails: false,
            tabIndex: 0,
            files: [],
            shopFiles: [],
            accessoryFiles: [],
            rentCSVComment: '',
            shopCSVComment: '',
            accessoryCSVComment: '',
            viewQCModal: false,
            looknumber: '',
            status: '',
            rentCatalogCSV: null,
            shopCatalogCSV: null,
            accessoryCSV: null
        }
    }

    componentDidMount() {
        this.props.fetchAccessoryCatalog();
        this.props.fetchRentCatalog();
        this.props.fetchShopCatalog();
        this.props.fetchUpdateLogs();
    }

    componentWillReceiveProps(props) {
        if (props.rentCatalog) {
            let rentCatalogCSV = props.rentCatalog.map((item) => {
                return {
                    'looknumber': item.looknumber,
                    'sku': item.sku,
                    'name': item.name,
                    'location': item.location
                }
            });
            this.setState({
                rentCatalogCSV: rentCatalogCSV
            });
        }
        if (props.shopCatalog) {
            let shopCatalogCSV = props.shopCatalog.map((item) => {
                return {
                    'sku': item.sku,
                    'name': item.name,
                    'location': item.location
                }
            });
            this.setState({
                shopCatalogCSV: shopCatalogCSV
            });
        }
        if (props.accessoryCatalog) {
            let accessoryCSV = props.accessoryCatalog.map((item) => {
                return {
                    'sku': item.sku,
                    'name': item.name,
                    'location': item.location
                }
            });
            this.setState({
                accessoryCSV: accessoryCSV
            });
        }
    }

    handleChangeLocation(e) {
        this.state.location = e.target.value;
    }

    handleOnDrop(files) {
        this.setState({
            files
        });
    }

    uploadCSV() {
        if (this.state.files.length > 0 && this.state.rentCSVComment && this.props.user) {
            let fileName = this.state.rentCSVComment + ' ' + this.props.user + ' ' + moment().format('lll');
            fileName = fileName.toUpperCase() + '.csv';
            this.props.uploadCSV(this.state.files, fileName);
        } else if (this.state.files.length == 0) {
            alert('Add a file to upload');
        } else if (!this.state.rentCSVComment) {
            alert('Add a comment');
        }
    }

    handleShopOnDrop(shopFiles) {
        this.setState({
            shopFiles
        });
    }

    uploadShopCSV() {
        if (this.state.shopCSVComment && this.props.user) {
            let fileName = this.state.shopCSVComment + ' ' + this.props.user + ' ' + moment().format('lll');
            fileName = fileName.toUpperCase() + '.csv';
            this.props.uploadShopCSV(this.state.shopFiles, fileName);
        } else if (this.state.shopFiles.length == 0) {
            alert('Add a file to upload');
        } else if (!this.state.shopCSVComment) {
            alert('Add a comment');
        }
    }

    handleAccessoryOnDrop(accessoryFiles) {
        this.setState({
            accessoryFiles
        });
    }

    uploadAccessoryCSV() {
        if (this.state.accessoryCSVComment && this.props.user) {
            let fileName = this.state.accessoryCSVComment + ' ' + this.props.user + ' ' + moment().format('lll');
            fileName = fileName.toUpperCase() + '.csv';
            this.props.uploadAccessoryCSV(this.state.accessoryFiles, fileName);
        } else if (this.state.accessoryFiles.length == 0) {
            alert('Add a file to upload');
        } else if (!this.state.accessoryCSVComment) {
            alert('Add a comment');
        }
    }


    viewRentLook(id) {
        browserHistory.push('/inventory/rent/' + id);
    }

    viewShopLook(id) {
        browserHistory.push('/inventory/shop/' + id);
    }

    viewAccessory(id) {
        browserHistory.push('/inventory/accessory/' + id);
    }

    changeRentLooksLocation(id) {
        if (this.state.location && id) {
            this.props.changeRentLookLocation(id, this.state.location);
        }
    }

    changeRentAccessoriesLocation(id) {
        if (this.state.location && id) {
            this.props.changeRentAccessoryLocation(id, this.state.location);
        }
    }

    changeShopLooksLocation(id) {
        if (this.state.location && id) {
            this.props.changeShopLookLocation(id, this.state.location);
        }
    }


    renderProductDetail(tab) {
        switch (tab) {
            case 0:
                return <div>
                    {this.renderShopProductDetail()}
                </div>;
            case 1:
                return <div>Rent Product Detail</div>;
            case 2:
                return <div>Accessory Detail</div>;
        }

    }

    showQCModal(value) {
        this.setState({
            viewQCModal: true,
            looknumber: value.looknumber,
            status: ''
        });
        this.props.getLastQCStatus(value.looknumber);
    }

    hideQCModal() {
        this.setState({
            viewQCModal: false,
            looknumber: '',
            status: ''
        });
    }

    changeQCStatus() {
        if (this.props.user && this.state.looknumber && this.state.status) {
            let qcObject = {
                user: this.props.user,
                looknumber: this.state.looknumber,
                status: this.state.status
            }
            this.props.setQCStatus(qcObject);
        }
    }

    handleChangeQCStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    renderRentLooks() {
        if (this.props.rentCatalog) {
            if (this.props.rentCatalog.length > 0) {
                let qcIndex = clientConfig.rentLooksColumns.findIndex(o => o.id == 'qcStatus');
                if (qcIndex != -1) { clientConfig.rentLooksColumns.splice(qcIndex, 1); }

                if (!clientConfig.rentLooksColumns.find(o => o.id == 'edit') && (this.props.role == 'admin')) {
                    clientConfig.rentLooksColumns.unshift({
                        Header: '',
                        id: 'edit',
                        accessor: '_id',
                        Cell: ({ value }) => <div>
                            <button onClick={this.viewRentLook.bind(this, value)}>Edit Product</button>
                        </div>
                    });
                }
                if (!clientConfig.rentLooksColumns.find(o => o.id == 'changeLocation') && (this.props.role == 'admin' || this.props.role == 'delivery')) {
                    clientConfig.rentLooksColumns.unshift({
                        Header: '',
                        id: 'changeLocation',
                        accessor: '_id',
                        Cell: ({ value }) => <div>
                            <select onChange={this.handleChangeLocation.bind(this)}>
                                <option value=""> -- Select Location -- </option>
                                <option value="store-hkv">Store (HKV)</option>
                                <option value="store-rjg">Store (RJG)</option>
                                <option value="office">Office</option>
                                <option value="customer">Customer</option>
                            </select>
                            <button onClick={this.changeRentLooksLocation.bind(this, value)}>Change</button>
                        </div>
                    });
                }
                if (this.props.role == 'admin') {
                    clientConfig.rentLooksColumns.unshift({
                        Header: '',
                        id: 'qcStatus',
                        accessor: (value) => <div>
                            <button onClick={() => this.showQCModal(value)}>Approve Quality</button>
                        </div>
                    });
                }
                return <div>
                    <ReactTable filterable data={this.props.rentCatalog} columns={clientConfig.rentLooksColumns} defaultPageSize={10} className="-striped -highlight" />
                    {this.state.rentCatalogCSV ? <CSVLink data={this.state.rentCatalogCSV} filename={"Rent Inventory.csv"}>Export CSV</CSVLink> : null}
                </div>;
            }
        }
    }

    renderRentAccessories() {
        if (this.props.accessoryCatalog) {
            if (this.props.accessoryCatalog.length > 0) {
                // if (!clientConfig.rentAccessoriesColumns.find(o => o.id == 'edit') && (this.props.role == 'admin')) {
                //     clientConfig.rentAccessoriesColumns.unshift({
                //         Header: '',
                //         id: 'edit',
                //         accessor: '_id',
                //         Cell: ({value}) => <div>
                //                              {<button onClick={ this.viewAccessory.bind(this, value) }>Edit Accessory</button>}
                //                            </div>
                //     });
                // }
                if (!clientConfig.rentAccessoriesColumns.find(o => o.id == 'changeLocation') && (this.props.role == 'admin' || this.props.role == 'delivery')) {
                    clientConfig.rentAccessoriesColumns.unshift({
                        Header: '',
                        id: 'changeLocation',
                        accessor: '_id',
                        Cell: ({ value }) => <div>
                            <select onChange={this.handleChangeLocation.bind(this)}>
                                <option value=""> -- Select Location -- </option>
                                <option value="store-hkv">Store (HKV)</option>
                                <option value="store-rjg">Store (RJG)</option>
                                <option value="office">Office</option>
                                <option value="customer">Customer</option>
                            </select>
                            <button onClick={this.changeRentAccessoriesLocation.bind(this, value)}>Change</button>
                        </div>
                    });
                }
                return <div>
                    <ReactTable filterable data={this.props.accessoryCatalog} columns={clientConfig.rentAccessoriesColumns} defaultPageSize={10} className="-striped -highlight" />
                    {this.state.accessoryCSV ? <CSVLink data={this.state.accessoryCSV} filename={"Accessory Inventory.csv"}>Export CSV</CSVLink> : null}
                </div>;
            }
        }
    }

    renderShopLooks() {
        if (this.props.shopCatalog) {
            if (this.props.shopCatalog.length > 0) {
                // if (!clientConfig.shopLooksColumns.find(o => o.id == 'edit') && (this.props.role == 'admin')) {
                //     clientConfig.shopLooksColumns.unshift({
                //         Header: '',
                //         id: 'edit',
                //         accessor: 'id',
                //         Cell: ({value}) => <div>
                //                              {<button onClick={ this.viewShopLook.bind(this, value) }>Edit Product</button>}
                //                            </div>
                //     });
                // }
                if (!clientConfig.shopLooksColumns.find(o => o.id == 'changeLocation') && (this.props.role == 'admin' || this.props.role == 'delivery')) {
                    clientConfig.shopLooksColumns.unshift({
                        Header: '',
                        id: 'changeLocation',
                        accessor: 'id',
                        Cell: ({ value }) => <div>
                            <select onChange={this.handleChangeLocation.bind(this)}>
                                <option value=""> -- Select Location -- </option>
                                <option value="store-hkv">Store (HKV)</option>
                                <option value="store-rjg">Store (RJG)</option>
                                <option value="office">Office</option>
                                <option value="customer">Customer</option>
                            </select>
                            <button onClick={this.changeShopLooksLocation.bind(this, value)}>Change</button>
                        </div>
                    });
                }
                return <div>
                    <ReactTable filterable data={this.props.shopCatalog} columns={clientConfig.shopLooksColumns} defaultPageSize={10} className="-striped -highlight" />
                    {this.state.shopCatalogCSV ? <CSVLink data={this.state.shopCatalogCSV} filename={"Shop Inventory.csv"}>Export CSV</CSVLink> : null}
                </div>;
            }
        }
    }

    handleTabChange(tabIndex) {
        this.setState({
            tabIndex: tabIndex
        });
    }

    changeRentComment(e) {
        this.setState({
            rentCSVComment: e.target.value
        })
    }

    changeShopComment(e) {
        this.setState({
            shopCSVComment: e.target.value
        })
    }

    changeAccessoryComment(e) {
        this.setState({
            accessoryCSVComment: e.target.value
        })
    }

    downloadCSV(fileName) {
        this.props.downloadCSV(fileName);
    }

    renderUploadLogs() {
        if (this.props.uploadLogs && this.props.uploadLogs.length > 0) {
            if (!clientConfig.uploadSheetColumns.find(o => o.id == 'download') && (this.props.role == 'admin' || this.props.role == 'superuser')) {
                clientConfig.uploadSheetColumns.push({
                    Header: '',
                    id: 'download',
                    accessor: 'link',
                    Cell: ({ value }) => <button onClick={() => this.downloadCSV(value)}>Download</button>
                });
            }
            return <div>
                <br />
                <hr />
                <h1>Uploaded Sheets</h1>
                <ReactTable filterable data={this.props.uploadLogs} columns={clientConfig.uploadSheetColumns} defaultPageSize={10} className="-striped -highlight" />
            </div>;
        }
    }

    render() {
        return <section>
            {!this.state.viewOrderDetails ?
                <div>
                    <h1>Inventory</h1>
                    <br />
                    <Tabs selectedIndex={this.state.tabIndex} onSelect={this.handleTabChange.bind(this)}>
                        <TabList>
                            <Tab>Shop</Tab>
                            <Tab>Rent</Tab>
                            <Tab>Accessory</Tab>
                        </TabList>
                        <TabPanel>
                            <div className={styles.fileUpload}>
                                <Dropzone onDrop={this.handleShopOnDrop.bind(this)}>
                                    <p>Select a file to upload.</p>
                                </Dropzone>
                                {this.state.shopFiles[0] ? <h5>Selected File: {this.state.shopFiles[0].name}</h5> : null}
                                <input className={styles.addComment} placeholder="Add Comment" value={this.state.shopCSVComment} onChange={(e) => this.changeShopComment(e)} />
                                <button onClick={this.uploadShopCSV.bind(this)}>Upload CSV</button>
                            </div>
                            {this.renderShopLooks()}
                        </TabPanel>
                        <TabPanel>
                            <div className={styles.fileUpload}>
                                <Dropzone onDrop={this.handleOnDrop.bind(this)}>
                                    <p>Select a file to upload.</p>
                                </Dropzone>
                                {this.state.files[0] ? <h5>Selected File: {this.state.files[0].name}</h5> : null}
                                <input className={styles.addComment} placeholder="Add Comment" value={this.state.rentCSVComment} onChange={(e) => this.changeRentComment(e)} />
                                <button onClick={this.uploadCSV.bind(this)}>Upload CSV</button>
                            </div>
                            {this.renderRentLooks()}
                        </TabPanel>
                        <TabPanel>
                            <div className={styles.fileUpload}>
                                <Dropzone onDrop={this.handleAccessoryOnDrop.bind(this)}>
                                    <p>Select a file to upload.</p>
                                </Dropzone>
                                {this.state.accessoryFiles[0] ? <h5>Selected File: {this.state.accessoryFiles[0].name}</h5> : null}
                                <input className={styles.addComment} placeholder="Add Comment" value={this.state.accessoryCSVComment} onChange={(e) => this.changeAccessoryComment(e)} />
                                <button onClick={this.uploadAccessoryCSV.bind(this)}>Upload CSV</button>
                            </div>
                            {this.renderRentAccessories()}
                        </TabPanel>
                    </Tabs>
                    {this.renderUploadLogs()}
                    <ReactModal className={styles.InventoryStatusPop} isOpen={this.state.viewQCModal} onRequestClose={this.hideQCModal.bind(this)} contentLabel="Change QC Status">
                        <span onClick={this.hideQCModal.bind(this)}>×</span>
                        {this.props.lastQCStatus ? <div>
                            <h3>Last QC Status</h3>
                            <p>Frontend Order Id: {this.props.lastQCStatus.frontendOrderId}</p>
                            <p>Looknumber: {this.props.lastQCStatus.looknumber}</p>
                            <p>SKU: {this.props.lastQCStatus.sku}</p>
                            <p>Status: {this.props.lastQCStatus.status}</p>
                            <p>User: {this.props.lastQCStatus.user}</p>
                            <p>Updated On: {moment(this.props.lastQCStatus.timeStamp).format('lll')}</p>
                        </div> : null}
                        <h3>Quality Check: Look# {this.state.looknumber}</h3>
                        <select onChange={(e) => this.handleChangeQCStatus(e)}>
                            <option value=""> -- Select Status -- </option>
                            <option value="Approve Temporary Disable">Temporary Disable</option>
                            <option value="Approve Permanant Disable">Permanant Disable</option>
                        </select><br />
                        <button onClick={this.changeQCStatus.bind(this)}>Update</button>
                    </ReactModal>
                </div> :
                <div>
                    {this.renderProductDetail(this.state.tabIndex)}
                </div>}
        </section>
    }

    componentWillUnmount() {
        this.props.clearShopProduct();
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAccessoryCatalog,
        fetchRentCatalog,
        fetchShopCatalog,
        changeShopLookLocation,
        changeRentLookLocation,
        changeRentAccessoryLocation,
        fetchShopProduct,
        updateShopProduct,
        clearShopProduct,
        fetchRentProduct,
        updateRentProduct,
        clearRentProduct,
        fetchAccessory,
        updateAccessory,
        clearAccessory,
        uploadCSV,
        uploadShopCSV,
        uploadAccessoryCSV,
        fetchUpdateLogs,
        downloadCSV,
        setQCStatus,
        getLastQCStatus
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        accessoryCatalog: state.accessoryCatalog,
        rentCatalog: state.rentCatalog,
        shopCatalog: state.shopCatalog,
        role: state.auth.role,
        user: state.auth.email,
        shopProduct: state.shopProduct,
        rentProduct: state.rentProduct,
        accessory: state.accessory,
        uploadLogs: state.uploadLogs,
        lastQCStatus: state.lastQCStatus
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Inventory);
