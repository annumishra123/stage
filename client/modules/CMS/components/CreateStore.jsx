import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStore } from '../CMSActions';

// Import Style
//import styles from './login.css';


class CreateStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            looks: '',
            url: '',
            title: ''
        };
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

    createStore() {
        if (this.state.looks != '' && this.state.url != '' && this.state.title != '') {
            let store = {
                looks: this.state.looks.split(","),
                url: this.state.url,
                title: this.state.title,
            }
            this.props.createStore(store);
        }
        else {
            alert('Fill in all the details');
        }
    }

    render() {
        return (<section>
            <button onClick={this.handleNavigationPage.bind(this)}>Back</button>
            <h1>Create Store</h1>
            <form>
                <div>
                    <h4>Looks: </h4>
                    <textarea type="text" onChange={this.handleCreateLooks.bind(this)} />
                </div>
                <div>
                    <h4>URL: </h4>
                    <input type="text" onChange={this.handleCreateUrl.bind(this)} />
                </div>
                <div>
                    <h4>Title: </h4>
                    <input type="text" onChange={this.handleCreateTitle.bind(this)} />
                </div>
                <br />
                <button onClick={this.createStore.bind(this)}>Create Store</button>
            </form>
        </section>)
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        createStore
    }, dispatch);
}

function mapStateToProps(state) {
    return {};
}


export default connect(mapStateToProps, matchDispatchToProps)(CreateStore);
