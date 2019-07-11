import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStore, getAllStores, deleteStore, lookDeactivate } from '../CMSActions';
import ReactTable from 'react-table';
import clientConfig from '../../../config';

// Import Style
import styles from './instagram.css';


class CreateStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            looks: '',
            url: '',
            title: '',
            header_image_desktop: '',
            header_image_mobile: '',
            deactivateLook: '',
            lookStore: ''
        };
    }

    componentDidMount() {
        this.props.getAllStores();
    }

    deleteStore(title) {
        this.props.deleteStore(title)
    }

    handleNavigationPage() {
        browserHistory.push('/menu');
    }

    handleCreateLooks(e) {
        this.setState({ looks: e.target.value });
    }

    handleCreateUrl(e) {
        this.setState({ url: e.target.value });
    }

    handleCreateTitle(e) {
        this.setState({ title: e.target.value });
    }

    handleCreateDesktopImage(e) {
        let desktopImageUrl = 'https://ik.imagekit.io/stage3/tr:n-web/' + e.target.value;
        this.setState({ header_image_desktop: desktopImageUrl });
    }

    handleCreateMobileImage(e) {
        let mobileImageUrl = 'https://ik.imagekit.io/stage3/tr:n-web/' + e.target.value;
        this.setState({ header_image_mobile: mobileImageUrl });
    }

    handleDeactivateLook(e) {
        this.setState({ deactivateLook: e.target.value });
    }

    handleLookStore(e) {
        this.setState({ lookStore: e.target.value });
    }

    createStore(e) {
        e.preventDefault();
        if (this.state.looks != '' && this.state.url != '' && this.state.title != '') {
            let store = {
                looks: this.state.looks.split(","),
                url: this.state.url,
                title: this.state.title,
                header_image_desktop: this.state.header_image_desktop,
                header_image_mobile: this.state.header_image_mobile,
            }
            this.props.createStore(store);
            this.setState({
                looks: '',
                url: '',
                title: '',
                header_image_desktop: '',
                header_image_mobile: '',
            })
        }
        else {
            alert('Fill in all the details');
        }
    }

    lookDeactivate(e) {
        e.preventDefault();
        this.props.lookDeactivate(this.state.deactivateLook, this.state.lookStore);
        this.setState({
            deactivateLook: '',
            lookStore: '',
        })
    }

    renderStores() {
        if (this.props.allStores) {
            if (this.props.allStores.length > 0) {
                if (!clientConfig.rentalStoreColumns.find(o => o.id == 'delete')) {
                    clientConfig.rentalStoreColumns.unshift({
                        Header: '',
                        id: 'delete',
                        accessor: 'title',
                        Cell: ({ value }) => (<button onClick={this.deleteStore.bind(this, value)}>Delete</button>)
                    });
                }
                return <div>
                    <h1>Stores</h1>
                    <ReactTable filterable data={this.props.allStores} columns={clientConfig.rentalStoreColumns} className="-striped -highlight" />
                </div>
            }
        }
    }

    render() {
        return (<section className={styles.createStore}>
            <button className={styles.backBtn} onClick={this.handleNavigationPage.bind(this)}><i className="login__backicon__a-Exb fa fa-chevron-left" aria-hidden="true"></i> Back</button>
            <h1>Create Store</h1>
            <div>
                <h4>Looks: </h4>
                <textarea type="text" value={this.state.looks} onChange={this.handleCreateLooks.bind(this)} />
            </div>
            <div>
                <h4>Desktop Header Image: </h4>
                <textarea type="text" value={this.state.desktopImageUrl} onChange={this.handleCreateDesktopImage.bind(this)} />
            </div>
            <div>
                <h4>Mobile Header Image: </h4>
                <textarea type="text" value={this.state.mobileImageUrl} onChange={this.handleCreateMobileImage.bind(this)} />
            </div>
            <div>
                <h4>URL: </h4>
                <input type="text" value={this.state.url} onChange={this.handleCreateUrl.bind(this)} />
            </div>
            <div>
                <h4>Title: </h4>
                <input type="text" value={this.state.title} onChange={this.handleCreateTitle.bind(this)} />
            </div>
            <br />
            <button className={styles.submitBtn} onClick={this.createStore.bind(this)}>Create Store</button>
            <br />
            {this.renderStores()}
            <br />
            <h1>Deactivate Look</h1>
            <div>
                <h4>Look: </h4>
                <input type="text" value={this.state.deactivateLook} onChange={this.handleDeactivateLook.bind(this)} />
            </div>
            <div>
                <h4>Store: </h4>
                <input type="text" value={this.state.lookStore} onChange={this.handleLookStore.bind(this)} />
            </div>
            <br />
            <button className={styles.submitBtn} onClick={this.lookDeactivate.bind(this)}>Deactivate</button>
            <br />
        </section>)
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllStores,
        createStore,
        deleteStore,
        lookDeactivate
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        allStores: state.allStores ? state.allStores : null
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(CreateStore);
