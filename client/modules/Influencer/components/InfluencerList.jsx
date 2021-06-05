import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { fetchAllInfluencers, fetchInfluencerCarousel, createBanner, deleteBanner, getAllSellers } from '../InfluencerAction';
import Carousel from './Carousel';
import InfluencerForm from './InfluencerForm';
import Autocomplete from './Autocomplete';

// Import Style
import styles from '../influencer.css';

class InfluencerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allInfluencersList: [],
            influencersCarouselList: [],
            seller: '',
            previewFile: [],
            imageFiles: [],
            title: '',
            isBannerExpanded: false,
            isInfluencerExpanded: false,
            allSellerList: []
        }
    }

    componentDidMount() {
        this.props.fetchAllInfluencers();
        this.props.fetchInfluencerCarousel();
        this.props.getAllSellers();
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
        if (nextProps.allSellers) {
            this.setState({
                allSellerList: nextProps.allSellers
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
                            {<img className={styles.suggestionListImage} alt='No Image available' src={item.profileImageUrl} />}
                            <div className={styles.liText}>
                                <div>{influencerName}</div>
                                <div><b><i>Sequence: </i></b> {item.influencerSequence}</div>
                            </div>
                        </li>
                    );
                })
            }
        </ul>
    }

    onItemSelectionChange(val) {
        if (val == '') {
            this.setState({ seller: '' });
            return;
        }
        this.setState({ seller: val.email });
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

    createNewBanner() {
        const { seller, title, imageFiles } = this.state;
        let bodyData = {
            title: title || '',
            link: seller || '',
            image: imageFiles[0] || [],
            status: true
        }
        this.props.createBanner(bodyData);
        this.setState({ previewFile: [], imageFiles: [], title: '' });
    }

    handleToggle(e, action) {
        e.preventDefault();
        switch (action) {
            case 'banner':
                this.setState({ isBannerExpanded: !this.state.isBannerExpanded, isInfluencerExpanded: false });
                break;
            case 'influencer':
                this.setState({ isInfluencerExpanded: !this.state.isInfluencerExpanded, isBannerExpanded: false });
                break;
        }
    }

    onDisableConfirmation(data) {
        let confirmStatus = confirm('Are you sure want to remove Banner?');
        if (confirmStatus && data) {
            this.props.deleteBanner(data.id);
        }
    }
    render() {
        const { influencersCarouselList, seller, previewFile, title, isBannerExpanded, isInfluencerExpanded, allSellerList } = this.state;
        let isDisabled = (seller != "" && title != "" && previewFile.length != 0) ? true : false;
        return <section>
            <button className={styles.backBtn} onClick={() => browserHistory.goBack()}><i className="login__backicon__a-Exb fa fa-chevron-left" aria-hidden="true" /> Back</button>
            <div className={styles.influencerBodySection}>
                <h1>Influencers closets</h1>
                <div style={{ marginTop: '2em' }}>
                    <Carousel dataList={influencersCarouselList} confirmation={(data) => this.onDisableConfirmation(data)} />
                </div>
                <div className={styles.influencerBodySection} style={{ marginTop: '2em' }}>
                    <button type="button" id="collapsibleBanner" className={styles.collapsible} onClick={(e) => this.handleToggle(e, 'banner')}>Create Banner<span className={styles.collapsibleIcon}>{isBannerExpanded ? '  -' : '  +'}</span></button>
                    <div className={styles.content} style={{ display: isBannerExpanded ? 'block' : 'none' }}>
                        {isBannerExpanded && <div className={styles.influencerFormField}>
                            <div className={styles.listWrapper}>
                                <div className={styles.listSectionOne}>
                                    <h4>Select Seller: </h4>
                                    <Autocomplete placeholder="Type to select seller" suggestions={allSellerList} selectedItem={this.onItemSelectionChange.bind(this)} />
                                </div>
                                <div className={styles.listSectionTwo}>
                                    <h4>Title: </h4>
                                    <input type='text' name='title' className={styles.influencerInput} value={title} onChange={(e) => this.setState({ title: e ? e.target.value : '' })} />
                                </div>
                                <div className={styles.listSectionThree}></div>
                            </div>
                        </div>}
                        <div className={styles.influencerFormField}>
                            <div className={styles.listWrapper}>
                                <div className={styles.listSectionOne}>
                                    <h4>Banner Image: </h4>
                                    <div className={styles.fileUpload} style={{ width: '65%' }}>
                                        <Dropzone className={styles.uploadRegion} onDrop={this.handleShopOnDrop.bind(this)} accept="image/*" multiple={false}>
                                            <p>Select banner image to upload</p>
                                        </Dropzone>
                                    </div>
                                </div>
                                <div className={styles.listSectionTwo}>
                                    {previewFile.length > 0 ? <div>
                                        <h4>Image Preview: </h4>
                                        {previewFile.map((file) => {
                                            if (file.type.match(/^image/)) {
                                                return <img className={styles.storeDetailImg} alt='No Image available' src={file.preview} />
                                            }
                                        })}
                                    </div> : null}
                                </div>
                                <div className={styles.listSectionThree}>
                                    <button className={styles.listBtn} style={{ cursor: !isDisabled && 'not-allowed' }} onClick={this.createNewBanner.bind(this)} disabled={!isDisabled}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.influencerBodySection} style={{ marginTop: '2em' }}>
                    <button type="button" id="collapsibleInfluencer" className={styles.collapsible} onClick={(e) => this.handleToggle(e, 'influencer')}>Create Influencer<span className={styles.collapsibleIcon}>{isInfluencerExpanded ? '  -' : '  +'}</span></button>
                    <div className={styles.content} style={{ display: isInfluencerExpanded ? 'block' : 'none' }}>
                        {isInfluencerExpanded && <InfluencerForm isFromSeeMore={true} />}
                    </div>
                </div>
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
        deleteBanner,
        getAllSellers
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        allInfluencers: state.allInfluencers,
        influencersCarousel: state.influencersCarousel,
        allSellers: state.allSellers
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(InfluencerList);