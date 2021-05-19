import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllSpotlightInfluencers } from '../InfluencerAction';

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

    render() {
        const { influencersList } = this.state;
        return <section>
            <button className={styles.backBtn} onClick={() => browserHistory.goBack()}><i className="login__backicon__a-Exb fa fa-chevron-left" aria-hidden="true" /> Back</button>
            <div className={styles.influencerBodySection}>
                <h1>INFLUENCERS SPOTLIGHT</h1>
                <h4>From their wardrobe to yours <strong>#MakeitYours</strong></h4>
                <div className={styles.influencerImageSection}>
                    {influencersList.length != 0 && influencersList.map((item, idx) => <div key={idx} className={styles.influencerImageDiv}>
                        <img className={styles.influencerImage} alt='No Image available' src={item.profileImageUrl || 'https://res.cloudinary.com/stage3/image/upload/v1590582681/Rental_homepage_Banner-260520.jpg'} />
                        <div className={styles.influencerText}>{`${item.firstName} ${item.lastName}`}</div>
                    </div>)}
                </div>
            </div>
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAllSpotlightInfluencers
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