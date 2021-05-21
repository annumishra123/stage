import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllSpotlightInfluencers, getAllSellers } from '../InfluencerAction';
import Autocomplete from './Autocomplete';

// Import Style
import styles from '../influencer.css';

class Influencer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            influencersList: [],
            allSellerList: [],
            selectedListItem: {}
        }
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
        const { allSellerList } = this.state;
        if (val == '') {
            this.setState({ selectedListItem: {} });
            return;
        }
        let selectedItem = allSellerList.filter(item => {
            let sellerName = `${item.firstName} ${item.lastName}`;
            return sellerName == val;
        });
        this.setState({ selectedListItem: selectedItem });
        console.log(selectedItem);
    }

    render() {
        const { influencersList, allSellerList, selectedListItem } = this.state;
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
                        <img className={styles.influencerImage} alt='No Image available' src={item.profileImageUrl || 'https://res.cloudinary.com/stage3/image/upload/v1590582681/Rental_homepage_Banner-260520.jpg'} />
                        <div className={styles.influencerText}>{`${item.firstName} ${item.lastName}`}</div>
                    </div>)}
                </div>
            </div>
            <div className={styles.influencerBodySection} style={{ marginTop: '2em' }}>
                <h1>Create Influencers</h1>
                <div className={styles.wrapper}>
                    <div className={styles.divOne}>
                        <Autocomplete suggestions={allSellerList} selectedItem={this.onItemSelectionChange.bind(this)} />
                    </div>
                    <div className={styles.divTwo}>
                        {Object.keys(selectedListItem).length != 0 && selectedListItem.map(item => <div key={item.email} className={styles.influencerDetailImageDiv}>
                            <img className={styles.influencerImage} alt='No Image available' src={item.profileImageUrl} />
                            <div className={styles.influencerText}>{`${item.firstName} ${item.lastName}`}</div>
                        </div>)}
                    </div>
                    <div className={styles.divThree}>
                        <label className={styles.optionSection}>
                            <input
                                type="checkbox"
                                id="influencer"
                                name="influencer"
                                // value={item}
                                // checked={itemList.length != 0 && itemList.includes(item) || false}
                                // onChange={this.handleChange}
                                className={styles.optionCheckbox}
                            />
                            <span className={styles.checkboxLabel}>Influencer</span>
                        </label>
                        <label className={styles.optionSection}>
                            <input
                                type="checkbox"
                                id="spotlight"
                                name="spotlight"
                                // value={item}
                                // checked={itemList.length != 0 && itemList.includes(item) || false}
                                // onChange={this.handleChange}
                                className={styles.optionCheckbox}
                            />
                            <span className={styles.checkboxLabel}>Spotlight Influencer</span>
                        </label>
                        <button className={styles.influencerBtn}>Create</button>
                    </div>
                </div>
            </div>
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAllSpotlightInfluencers,
        getAllSellers
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