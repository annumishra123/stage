import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllSpotlightInfluencers, getAllSellers, createUpdateInfluencer } from '../InfluencerAction';
import Autocomplete from './Autocomplete';

// Import Style
import styles from '../influencer.css';

class Influencer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            influencersList: [],
            allSellerList: [],
            selectedListItem: {},
            counterValue: 0,
            isInfluencer: false,
            isSpotlight: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllSpotlightInfluencers();
        this.props.getAllSellers();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.spotlightInfluencers) {
            this.setState({
                influencersList: nextProps.spotlightInfluencers
            });
        }
        if (nextProps.allSellers) {
            this.setState({
                allSellerList: nextProps.allSellers
            });
        }
    }

    onItemSelectionChange(val) {
        if (val == '') {
            this.setState({ selectedListItem: {}, isInfluencer: false, isSpotlight: false });
            return;
        }
        this.setState({ selectedListItem: val, isInfluencer: val.influencer || this.state.isInfluencer, isSpotlight: val.spotlight || this.state.isSpotlight });
    }

    handleChange(e) {
        let { name, value, checked } = e.target;
        switch (name) {
            case 'increement':
                this.setState({ counterValue: this.state.counterValue + 1 });
                break;
            case 'decreement':
                this.setState({ counterValue: this.state.counterValue - 1 });
                break;
            case 'influencerSequence':
                if (value === '') {
                    this.setState({ counterValue: 0 });
                }
                if (parseInt(value) !== NaN) {
                    this.setState({ counterValue: parseInt(value) || 0 });
                }
                break;
            case 'influencer':
                if (checked) {
                    this.setState({ isInfluencer: true, isInfluencerUpdated: true });
                } else {
                    this.setState({ isInfluencer: false, isInfluencerUpdated: true });
                }
                break;
            case 'spotlight':
                if (checked) {
                    this.setState({ isSpotlight: true, isSpotlightUpdated: true });
                } else {
                    this.setState({ isSpotlight: false, isSpotlightUpdated: true });
                }
                break;
        }
    }

    createInfluencer() {
        const { selectedListItem, isInfluencer, isSpotlight, counterValue } = this.state,
            bodyData = {
                "emailId": Object.keys(selectedListItem).length != 0 && selectedListItem.email || '',
                "influencer": isInfluencer,
                "influencerSequence": counterValue,
                "spotlight": isSpotlight
            }
        if (Object.keys(selectedListItem).length != 0) {
            this.props.createUpdateInfluencer(bodyData);
        } else {
            if (Object.keys(selectedListItem).length == 0) {
                alert('Please select seller!!!');
                return;
            }
        }
    }

    onDisableConfirmation(email) {
        let confirmStatus = confirm('Are you sure want to remove from Spotlight?');
        if (confirmStatus) {
            const bodyData = {
                "emailId": email || '',
                "spotlight": false
            }
            this.props.createUpdateInfluencer(bodyData);
        }
    }

    render() {
        const { influencersList, allSellerList, selectedListItem, counterValue, isInfluencer, isSpotlight, isInfluencerUpdated, isSpotlightUpdated } = this.state;
        return <section>
            <button className={styles.backBtn} onClick={() => browserHistory.goBack()}><i className="login__backicon__a-Exb fa fa-chevron-left" aria-hidden="true" /> Back</button>
            <div className={styles.influencerBodySection}>
                <div style={{ display: 'flex' }}>
                    <h1>INFLUENCERS SPOTLIGHT</h1>
                    <button className={styles.seeMoreBtn} onClick={() => browserHistory.push('/influencer/list')}>See more</button>
                </div>
                <h4>From their wardrobe to yours <strong>#MakeitYours</strong></h4>
                <div className={styles.influencerImageSection}>
                    {influencersList.length != 0 && influencersList.map((item, idx) => <div key={idx} className={styles.influencerImageDiv}>
                        <i title='Remove from Spotlight' className="fa fa-times" style={{ float: 'right', cursor: 'pointer' }} aria-hidden="true" onClick={() => this.onDisableConfirmation(item.email)} />
                        <img className={styles.influencerImage} alt='No Image available' src={item.profileImageUrl || 'https://res.cloudinary.com/stage3/image/upload/v1590582681/Rental_homepage_Banner-260520.jpg'} />
                        <div className={styles.influencerText}>{`${item.firstName} ${item.lastName}`}</div>
                    </div>)}
                </div>
            </div>
            <div className={styles.influencerBodySection} style={{ marginTop: '2em' }}>
                <h1>Create Influencers</h1>
                <div className={styles.wrapper}>
                    <div className={styles.divOne}>
                        <Autocomplete placeholder="Type to select seller" suggestions={allSellerList} selectedItem={this.onItemSelectionChange.bind(this)} />
                    </div>
                    <div className={styles.divTwo}>
                        {Object.keys(selectedListItem).length != 0 && <div key={selectedListItem.email} className={styles.influencerDetailImageDiv}>
                            <img className={styles.influencerImage} alt='No Image available' src={selectedListItem.profileImageUrl} />
                            <div className={styles.influencerText}>{`${selectedListItem.firstName} ${selectedListItem.lastName}`}</div>
                        </div>}
                    </div>
                    <div className={styles.divThree}>
                        <label className={styles.optionSection}>
                            <input
                                type="checkbox"
                                id="influencer"
                                name="influencer"
                                onChange={this.handleChange}
                                checked={isInfluencerUpdated ? isInfluencer : (Object.keys(selectedListItem).length != 0 && selectedListItem.influencer)}
                                className={styles.optionCheckbox}
                            />
                            <span className={styles.checkboxLabel}>Influencer</span>
                        </label>
                        <label className={styles.optionSection}>
                            <input
                                type="checkbox"
                                id="spotlight"
                                name="spotlight"
                                disabled={!isInfluencer}
                                onChange={this.handleChange}
                                checked={isSpotlightUpdated ? isSpotlight : (Object.keys(selectedListItem).length != 0 && selectedListItem.spotlight)}
                                className={styles.optionCheckbox}
                            />
                            <span className={styles.checkboxLabel}>Spotlight Influencer</span>
                        </label>
                        <div className={styles.influencerFormField}>
                            <h4>Sequence: </h4>
                            <div style={{ display: 'flex' }}>
                                <button className={styles.counterBtn} name="decreement" onClick={this.handleChange} >-</button>
                                <input className={styles.counterInput} name="influencerSequence" type="number" value={counterValue} autoFocus={false} onChange={this.handleChange} />
                                <button className={styles.counterBtn} name="increement" onClick={this.handleChange}>+</button>
                            </div>
                        </div>
                        <button className={styles.influencerBtn} onClick={this.createInfluencer.bind(this)}>Create</button>
                    </div>
                </div>
            </div>
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAllSpotlightInfluencers,
        getAllSellers,
        createUpdateInfluencer
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        spotlightInfluencers: state.spotlightInfluencers,
        allSellers: state.allSellers
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Influencer);