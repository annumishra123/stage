import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { createInstagramFeed, fetchInstagramFeeds, deleteInstagramFeed } from '../CMSActions';
import ReactTable from 'react-table';
import clientConfig from '../../../config';

// Import Style
import styles from './instagram.css';


class Instagram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            title: '',
            type: '',
            url: ''
        }
    }

    componentDidMount() {
        this.props.fetchInstagramFeeds();
    }

    onDrop(acceptedFiles, rejectedFiles) {
        this.setState({
            files: acceptedFiles
        });
    }

    changeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    changeType(e) {
        this.setState({
            type: e.target.value
        });
    }

    changeURL(e) {
        this.setState({
            url: e.target.value
        });
    }

    renderNewFeed() {
        return <div className={ styles.instagramFeed }>
                 <br/>
                 <h1>Create Feed</h1>
                 <br/>
                 <input type="text" value={ this.state.title } onChange={ this.changeTitle.bind(this) } placeholder="Title" />
                 <input type="text" value={ this.state.url } onChange={ this.changeURL.bind(this) } placeholder="Target URL" />
                 <select type="text" value={ this.state.type } onChange={ this.changeType.bind(this) } placeholder="Type">
                   <option value=""> -- Select Type -- </option>
                   <option value="rent">Rent</option>
                   <option value="shop">Shop</option>
                 </select>
                 <div className={ styles.dropzone }>
                   <Dropzone onDrop={ this.onDrop.bind(this) } multiple={ false } accept={ 'application/pdf, image/*' }>
                     <div className="dropzone">Drop or click to select an image.</div>
                   </Dropzone>
                   <div>
                     { this.state.files.map((file) => <img src={ file.preview } style={ { width: '200px' } } />) }
                   </div>
                 </div>
                 <br/>
                 <button onClick={ this.onSubmit.bind(this) }>Submit</button>
               </div>;
    }

    onSubmit() {
        let instagram = {
            title: this.state.title,
            url: this.state.url,
            type: this.state.type
        }
        this.props.createInstagramFeed(this.state.files[0], instagram);
        this.setState({
            files: [],
            title: '',
            url: '',
            type: ''
        });
    }

    deleteInstagramFeed(id) {
        this.props.deleteInstagramFeed(id);
    }

    renderInstagramTable() {

        if (!clientConfig.instagramFeedColumns.find(o => o.id == 'delete')) {
            clientConfig.instagramFeedColumns.unshift({
                Header: '',
                id: 'delete',
                accessor: 'id',
                Cell: ({value}) => <button onClick={ this.deleteInstagramFeed.bind(this, value) }>Delete</button>
            });
        }
        return <div>
                 <ReactTable filterable data={ this.props.instagramFeeds } columns={ clientConfig.instagramFeedColumns } defaultPageSize={ 10 } className="-striped -highlight" />
               </div>;
    }

    renderInstagramFeeds() {
        if (this.props.instagramFeeds) {
            if (this.props.instagramFeeds.length > 0) {
                return <div>
                         <h1>Instagram Feeds</h1>
                         <br/>
                         { this.renderInstagramTable() }
                       </div>;
            }
        }
    }

    render() {
        return <section>
                 { this.renderInstagramFeeds() }
                 { this.renderNewFeed() }
               </section>;
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        createInstagramFeed,
        deleteInstagramFeed,
        fetchInstagramFeeds
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        owner: state.auth.owner,
        instagramFeeds: state.instagramFeeds
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Instagram);
