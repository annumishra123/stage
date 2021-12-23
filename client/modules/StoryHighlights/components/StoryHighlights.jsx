import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import ReactTable from "react-table";
import { fetchHighlights, createHighlights, getAllStoryContents, deactivateHighlights } from '../StoryHighlightsActions';
import clientConfig from "../../../config";

// Import Style
import styles from '../storyHighlights.css';

class StoryHighlights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightName: '',
            storyContentsList: [],
            imageFiles: [], 
            previewFile: []
        }
        this.renderContentItems.bind(this);
    }

    componentDidMount() {
        this.props.fetchHighlights();
        this.props.getAllStoryContents();
    }

    createHighlights(e) {
        let state = this.state;
        state.createdby = this.props.user;
        this.props.createHighlights(state);
        alert("Store and Story created Successfully!!!");
        this.setState({
            highlightName: '',
            imageFiles: [],
            previewFile: [],
            storyContentsList: []
        });
    }

    onDisableConfirmation(id) {
        let confirmStatus = confirm('Are you sure want to disable?');
        if (confirmStatus) {
            this.props.deactivateHighlights(id);
        }
    }
    
    handleOnDrop(acceptedFiles, rejectedFiles) {
        const me = this,
            { imageFiles, previewFile } = me.state;
        acceptedFiles.forEach(file => {
            if (previewFile.length > 0) {
                previewFile[0] = file;
            } else {
                previewFile.push(file);
            }
            me.setState({ imageFiles: [], previewFile: previewFile });
            let fileType = file.type.match(/^image/) ? 'image' : '';
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileAsArrayBuffer = reader.result;
                console.log(fileAsArrayBuffer);
                let blobData = new Blob([fileAsArrayBuffer], { type: `${file.type}` });
                if (fileType != '') {
                    imageFiles.push(blobData);
                    me.setState({ imageFiles: imageFiles, fileType: fileType });
                }
            };
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.readAsArrayBuffer(file);
        });
    }

    handleChange(rowId, e) {
        let {storyContentsList} = this.state,
            idIndex = storyContentsList.indexOf(rowId);
        if (e.target.checked) {
            if (idIndex === -1)
                storyContentsList.push(rowId);
        } else if (idIndex !== -1){
            storyContentsList.splice(idIndex, 1);
        }
    }

    renderContentItems(contents) {
        const { role } = this.props;
        if (!clientConfig.contentColums.find((o) => o.id == "select")) {
            clientConfig.contentColums.unshift({
                Header: "View",
                id: "contentView",
                accessor: "url",
                filterable: false,
                sortable: false,
                Cell: (e) => (
                <div style={{ textAlign: "center" }}>
                {e.original.format === 'image' ?
                    <img src={e.original.url} alt="No Image available" style={{width: '5em'}}/> :
                    <div>{e.original.url}</div>
                }
                </div>
                )
            });
            clientConfig.contentColums.unshift({
                Header: "",
                id: "select",
                accessor: "id",
                filterable: false,
                sortable: false,
                Cell: ({ value }) => (
                <div style={{ textAlign: "center" }}>
                    <input
                    type="checkbox"
                    onClick={this.handleChange.bind(this, value)}
                    />
                </div>
                )
            });
        }
        return (
          <ReactTable
            data={contents}
            columns={clientConfig.contentColums}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        );
    }

    render() {
        let { allHighlights, allStoryContents } = this.props,
            { previewFile } = this.state,
            isDisabled = false;
        return <section>
            <button className={styles.backBtn} onClick={() => browserHistory.goBack()}><i className="login__backicon__a-Exb fa fa-chevron-left" aria-hidden="true" /> Back</button>
            <div className={styles.bubbleSection}>
                {allHighlights && allHighlights.length != 0 && allHighlights.map((item, idx) => (
                    <div key={idx} className={styles.bubbleField}>
                        <i title='Disable' className="fa fa-times" style={{ float: 'right', cursor: 'pointer' }} aria-hidden="true" onClick={() => this.onDisableConfirmation(item.id)} />
                        <img className={styles.bubbleArea} alt='No Image available' src={item.image} />
                        <div className={styles.bubbleText}>{item.title}</div>
                    </div>
                ))}
            </div>
            <div className={styles.storyFormSection}>
                <h1>Create Highlights</h1>
            </div>
            <div title='Name' className={styles.bubbleFormField}>
                <h4>Highlight Name: </h4>
                <input type='text' name='title' className={styles.bubbleInput} onChange={e => { this.setState({ highlightName: e.target.value }) }} />
            </div>
            <div className={styles.bubbleFormField} style={{ width: '100%' }}>
                <h4>Upload Cover Image: </h4>
                <div style={{ display: 'flex' }}>
                    <div className={styles.fileUpload} style={{ width: '25%' }}>
                        <Dropzone onDrop={this.handleOnDrop.bind(this)} accept="image/*" multiple={false}>
                            <p>Select a cover image file to upload</p>
                        </Dropzone>
                    </div>
                    {previewFile.length > 0 ? <div>
                        {previewFile.map((file) => {
                            if (file.type.match(/^image/)) {
                                return <img className={styles.storeDetailImg} alt='No Image available' src={file.preview} />
                            }
                        })}
                    </div> : null}
                </div>
            </div>
            <div title='Contents' className={styles.bubbleFormField} style={{ width: '100%' }}>
                <h4>Select Contents: </h4>
                { this.renderContentItems(allStoryContents || []) }
            </div>
            <button className={styles.storiesBtn} onClick={this.createHighlights.bind(this)} >Create</button>
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchHighlights, 
        createHighlights, 
        getAllStoryContents,
        deactivateHighlights
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        allHighlights: state.entireHighlights,
        allStoryContents: state.entireStoryContents
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(StoryHighlights);