import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import ReactTable from "react-table";
import { fetchHighlights, createHighlights,
     getAllStoryContents, getContents,
      deactivateHighlights } from '../StoryHighlightsActions';
import clientConfig from "../../../config";
import play from "./play.png";
import Dialog from 'react-dialog'

// Import Style
import styles from '../storyHighlights.css';

class StoryHighlights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightName: '',
            storyContentsList: [],
            imageFiles: [], 
            previewFile: [],
            isVideoDialogOpen: false,
            videoUrl: '',
            currentHighlight: null
        }

        let viewer = [{
            Header: "View",
            id: "contentView",
            accessor: "url",
            filterable: false,
            sortable: false,
            Cell: (e) => (
            <div style={{ textAlign: "center", position: 'relative' }}>
            {e.original.format === 'image' ?
                <img src={e.original.url} alt="No Image available" style={{width: '5em'}}/> :
                    [
                        <video key="1" style={{width: '5em'}} >
                            <source src={e.original.url}></source>
                        </video>,
                        <img key="2"  src={play} style={{ 
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            width: '30%',
                            transform: 'translate(-50%, -50%)'
                        }} onClick={() => {me.openDialog(e.original.url); }}/>
                    ]
            }
            
            </div>
            )
        }];
        let me = this,
            selectTabelColums = viewer.concat(clientConfig.contentColums),
            selectedTabelColums = viewer.concat(clientConfig.contentColums);
        
        selectTabelColums.unshift({
            Header: "",
            id: "select",
            accessor: "id",
            filterable: false,
            sortable: false,
            Cell: ({row: {_original}}) => (
                <div style={{ textAlign: "center" }}>
                    <button style={{padding: '4px 16px'}} onClick={()=>{
                        let list = me.state.storyContentsList;
                        if (!list.some(entry => entry.id === _original.id)) {
                            me.setState({
                                storyContentsList: list.concat(_original)
                            });
                        }
                    }}>Add</button>
                </div>
            )
        });

        selectedTabelColums.unshift({
            Header: "",
            id: "select",
            accessor: "id",
            filterable: false,
            sortable: false,
            Cell: ({row: {_original}}) => (
                <div style={{ textAlign: "center" }}>
                    <button style={{padding: '4px 16px'}} onClick={()=>{
                        let list = me.state.storyContentsList;
                        me.setState({
                            storyContentsList: list.filter(x => x.id !== _original.id)
                        });
                    }}>Remove</button>
                </div>
            )
        });

        this.selectTabelColums = selectTabelColums;
        this.selectedTabelColums = selectedTabelColums;

        this.renderContentItems = this.renderContentItems.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.props.fetchHighlights();
        this.props.getAllStoryContents();
    }

    openDialog(url) {
        if (url)
            this.setState({ isVideoDialogOpen: true, videoUrl: url });
    }
 
    handleClose() {
         this.setState({ isVideoDialogOpen: false, videoUrl: ''})
    }

    createHighlights(e) {
        let state = this.state,
            me = this,
            currentHighlight = state.currentHighlight || {};
        state.createdby = this.props.user;
        this.props.createHighlights(state, currentHighlight.id).then(() => {
            alert("Store and Story created Successfully!!!");
            me.setState({
                highlightName: '',
                imageFiles: [],
                previewFile: [],
                storyContentsList: [],
                currentHighlight: null
            });
        });
    }

    onDeleteConfirmation(id) {
        let confirmStatus = confirm('Are you sure want to delete?');
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

    renderContentItems(storyContentsList, contents) {
        return (
            <div>
                <h4>Selected Contents: </h4>
                <ReactTable
                    data={storyContentsList}
                    columns={this.selectedTabelColums}
                    showPaginationBottom={false}
                    className="-striped -highlight"
                    defaultPageSize={storyContentsList.length || 5}
                />
                <h4>Select Contents: </h4>
                <ReactTable
                    data={contents}
                    columns={this.selectTabelColums}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />
            </div>
        );
    }

    render() {
        let { allHighlights, allStoryContents } = this.props,
            { previewFile, isVideoDialogOpen, videoUrl, storyContentsList, currentHighlight, highlightName } = this.state,
            isDisabled = false;
        return <section>
            <button className={styles.backBtn} onClick={() => browserHistory.goBack()}><i className="login__backicon__a-Exb fa fa-chevron-left" aria-hidden="true" /> Back</button>
            <div className={styles.bubbleSection}>
                {allHighlights && allHighlights.length != 0 && allHighlights.map((item, idx) => (
                    <div key={idx} className={styles.bubbleField} style={{
                            outline: currentHighlight === item ? '4px solid #f00' : ''
                        }}
                        onClick={(e) => {
                            let me = this;
                            if (item !== this.state.currentHighlight) {
                                getContents({
                                    where: { id: {inq: item.contents} }
                                }).then((list) => {
                                    me.setState({
                                        currentHighlight: item,
                                        storyContentsList: list,
                                        highlightName: item.title
                                    });
                                });
                            } else {
                                this.setState({
                                    currentHighlight: null,
                                    storyContentsList: []
                                });
                            }
                        }}
                    >
                        <i title='Delete' className="fa fa-times" style={{ float: 'right', cursor: 'pointer' }} aria-hidden="true" onClick={() => this.onDeleteConfirmation(item.id)} />
                        <img className={styles.bubbleArea} alt='No Image available' src={item.image} />
                        <div className={styles.bubbleText}>{item.title}</div>
                    </div>
                ))}
            </div>
            <div className={styles.storyFormSection}>
                <h1>{currentHighlight ? 'Update Highlights' : 'Create Highlights'}</h1>
            </div>
            <div title='Name' className={styles.bubbleFormField}>
                <h4>Highlight Name: </h4>
                <input type='text' name='title' className={styles.bubbleInput} 
                    onChange={e => { 
                        this.setState({
                            highlightName: e.target.value
                        }); 
                    }}
                    value={highlightName || ''}
                />
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
                        {previewFile.map((file, idx) => {
                            if (file.type.match(/^image/)) {
                                return <img key={idx} className={styles.storeDetailImg} alt='No Image available' src={file.preview} />
                            }
                        })}
                    </div> : null}
                </div>
            </div>
            <div title='Contents' className={styles.bubbleFormField} style={{ width: '100%' }}>
                { this.renderContentItems(storyContentsList, allStoryContents || []) }
                {
                    isVideoDialogOpen &&
                    <Dialog
                        title="Video Content"
                        modal={true}
                        isDraggable={true}
                        onClose={this.handleClose}
                        width={955}
                        height={855}
                    >
                        <video width="900" height="800" controls style={{
                            position: 'relative',
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }}>
                            <source src={videoUrl}></source>
                        </video>
                    </Dialog>
                }
            </div>
            <button className={styles.storiesBtn} onClick={this.createHighlights.bind(this)}>
                {currentHighlight ? 'Update' : 'Create'}
            </button>
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