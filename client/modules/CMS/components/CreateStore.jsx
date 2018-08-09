import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStore } from '../CMSActions';

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
            header_image_mobile: ''
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

    handleCreateDesktopImage(e) {
        let desktopImageUrl = 'https://ik.imagekit.io/stage3/tr:n-web/' + e.target.value;
        this.setState({ header_image_desktop: desktopImageUrl });
    }

    handleCreateMobileImage(e) {
        let mobileImageUrl = 'https://ik.imagekit.io/stage3/tr:n-web/' + e.target.value;
        this.setState({ header_image_mobile: mobileImageUrl });
    }


    createStore(e) {
        e.preventDefault();
        if (this.state.looks != '' && this.state.url != '' && this.state.title != '') {
            let store = {
                looks: this.state.looks.split(","),
                url: this.state.url,
                title: this.state.title,
                header_image_desktop: this.state.header_image_desktop,
                header_image_mobile: this.state.header_image_mobile

            }
            this.props.createStore(store);
        }
        else {
            alert('Fill in all the details');
        }
    }

    render() {
        return (<section className={styles.createStore}>
            <button className={styles.backBtn} onClick={this.handleNavigationPage.bind(this)}><i className="login__backicon__a-Exb fa fa-chevron-left" aria-hidden="true"></i> Back</button>
            <h1>Create Store</h1>
            <form>
                <div>
                    <h4>Looks: </h4>
                    <textarea type="text" onChange={this.handleCreateLooks.bind(this)} />
                </div>
                <div>
                    <h4>Desktop Header Image: </h4>
                    <textarea type="text" onChange={this.handleCreateDesktopImage.bind(this)} />
                </div>
                <div>
                    <h4>Mobile Header Image: </h4>
                    <textarea type="text" onChange={this.handleCreateMobileImage.bind(this)} />
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
                <button className={styles.submitBtn} onClick={this.createStore.bind(this)}>Create Store</button>
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
