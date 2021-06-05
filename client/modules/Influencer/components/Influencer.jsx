import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllSpotlightInfluencers, createUpdateInfluencer } from '../InfluencerAction';
import InfluencerForm from './InfluencerForm';

// Import Style
import styles from '../influencer.css';

class Influencer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            influencersList: []
        }
    }

    componentDidMount() {
        this.props.fetchAllSpotlightInfluencers();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.spotlightInfluencers) {
            this.setState({
                influencersList: nextProps.spotlightInfluencers
            });
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
        const { influencersList } = this.state;
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
                        <img className={styles.influencerImage} alt='No Image available' src={item.profileImageUrl} />
                        <div className={styles.influencerText}>{`${item.firstName} ${item.lastName}`}</div>
                    </div>)}
                </div>
            </div>
            <div className={styles.influencerBodySection} style={{ marginTop: '2em' }}>
                <h1>Create Spotlight Influencers</h1>
                <InfluencerForm isFromSeeMore={false} />
            </div>
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAllSpotlightInfluencers,
        createUpdateInfluencer
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        spotlightInfluencers: state.spotlightInfluencers
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Influencer);