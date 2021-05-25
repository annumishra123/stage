import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import { fetchAllInfluencers, fetchInfluencerCarousel, createBanner, deleteBanner } from '../InfluencerAction';
import Carousel from './Carousel';

// Import Style
import styles from '../influencer.css';

const actionType = ['Create Banner', 'Delete Banner'];

class InfluencerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allInfluencersList: [],
            influencersCarouselList: [],
            seller: '',
            action: '',
            previewFile: [],
            imageFiles: [],
            title: '',
            image: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllInfluencers();
        this.props.fetchInfluencerCarousel();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.allInfluencers) {
            this.setState({
                allInfluencersList: nextProps.allInfluencers
            });
        }
        if (nextProps.influencersCarousel) {
            this.setState({
                influencersCarouselList: nextProps.influencersCarousel
            });
        }
    }

    renderListSection() {
        const { allInfluencersList } = this.state;
        return <ul className={styles.autocompleteUl}>
            {
                allInfluencersList.length != 0 && allInfluencersList.map(item => {
                    let influencerName = `${item.firstName} ${item.lastName}`;
                    return (
                        <li key={influencerName} className={styles.autocompleteLi} onClick={() => { }}>
                            {<img className={styles.suggestionListImage} alt='No Image available' src={item.profileImageUrl} />}<div className={styles.liText}>{influencerName}</div>
                        </li>
                    );
                })
            }
        </ul>
    }

    handleChange(e, fieldName) {
        switch (fieldName) {
            case 'seller':
                this.setState({ seller: e ? e.value : '' });
                break;
            case 'action':
                this.setState({ action: e ? e.value : '' });
                break;
            case 'title':
                this.setState({ title: e ? e.target.value : '' });
                break;
            case 'image':
                this.setState({ image: e ? e.target.value : '' });
                break;
        }
    }

    handleShopOnDrop(acceptedFiles, rejectedFiles) {
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

    createDeleteBanner() {
        const { seller, action, title, image, allInfluencersList, influencersCarouselList } = this.state;
        switch (action) {
            case 'Create Banner':
                let bodyData = {
                    title: title || '',
                    link: seller || '',
                    image: image || '',
                    status: true
                }
                this.props.createBanner(bodyData);
                break;
            case 'Delete Banner':
                let selectedItem = influencersCarouselList.length != 0 && influencersCarouselList.filter((item, i) => item.link == seller);
                if (selectedItem.length != 0) {
                    selectedItem.forEach(item => {
                        this.props.deleteBanner(item.id);
                    });
                }
                break;
        }
    }

    render() {
        const { influencersCarouselList, allInfluencersList, seller, action, previewFile } = this.state;
        return <section>
            <button className={styles.backBtn} onClick={() => browserHistory.goBack()}><i className="login__backicon__a-Exb fa fa-chevron-left" aria-hidden="true" /> Back</button>
            <div className={styles.influencerBodySection}>
                <h1>Influencers closets</h1>
                <Carousel dataList={influencersCarouselList} />
                <div className={styles.influencerFormField}>
                    <div className={styles.listWrapper}>
                        <div className={styles.listSectionOne}>
                            <h4>Select Seller: </h4>
                            <Select className={styles.typeSelect}
                                name='seller'
                                value={seller}
                                onChange={(e) => this.handleChange(e, 'seller')}
                                options={allInfluencersList.length != 0 && allInfluencersList.map((item, i) => {
                                    let influencerName = `${item.firstName} ${item.lastName}`;
                                    return { value: item.email, label: influencerName }
                                })}></Select>
                        </div>
                        <div className={styles.listSectionTwo}>
                            <h4>Select Action: </h4>
                            <Select className={styles.typeSelect}
                                name='action'
                                value={action}
                                onChange={(e) => this.handleChange(e, 'action')}
                                options={actionType.map((item, i) => {
                                    return { value: item, label: item }
                                })}></Select>
                        </div>
                        <div className={styles.listSectionThree}>
                            <button className={styles.listBtn} onClick={this.createDeleteBanner.bind(this)}>Submit</button>
                        </div>
                    </div>
                </div>
                {action == 'Create Banner' &&
                    <div className={styles.influencerFormField}>
                        <div className={styles.listWrapperRows}>
                            <div className={styles.listSectionOne}>
                                <h4>Title: </h4>
                                <input type='text' name='title' className={styles.influencerInput} onChange={(e) => this.handleChange(e, 'title')} />
                            </div>
                            <div className={styles.listSectionTwo}>
                                <h4>Banner Image: </h4>
                                {/* <div style={{ display: 'flex' }}>
                                    <div className={styles.fileUpload} style={{ width: '25%' }}>
                                        <Dropzone className={styles.uploadRegion} onDrop={this.handleShopOnDrop.bind(this)} accept="image/*" multiple={false}>
                                            <p>Select banner image to upload</p>
                                        </Dropzone>
                                    </div>
                                    {previewFile.length > 0 ? <div>
                                        {previewFile.map((file) => {
                                            if (file.type.match(/^image/)) {
                                                return <img className={styles.storeDetailImg} alt='No Image available' src={file.preview} />
                                            }
                                        })}
                                    </div> : null}
                                </div> */}
                                {/* temporary till the API creates/provide */}
                                <input type='text' name='image' className={styles.influencerInput} onChange={(e) => this.handleChange(e, 'image')} />
                            </div>
                            <div className={styles.listSectionThree}></div>
                        </div>
                    </div>
                }
                {this.renderListSection()}
            </div>
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAllInfluencers,
        fetchInfluencerCarousel,
        createBanner,
        deleteBanner
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        allInfluencers: state.allInfluencers,
        influencersCarousel: state.influencersCarousel
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(InfluencerList);