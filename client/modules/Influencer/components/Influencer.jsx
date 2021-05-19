import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllInfluencers } from '../InfluencerAction';

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
        this.props.fetchAllInfluencers();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.influencers) {
            this.setState({
                influencersList: nextProps.influencers
            });
        }
    }

    render() {
        const { influencersList } = this.state;
        return <div className={styles.influencerBodySection}>
            <h1>INFLUENCERS SPOTLIGHT</h1>
            <h4>From their wardrobe to yours <strong>#MakeitYours</strong></h4>
            <div className={styles.influencerImageSection}>
                {influencersList.length != 0 && influencersList.map((item, idx) => <div key={idx} className={styles.influencerImageDiv}>
                    <img className={styles.influencerImage} alt='No Image available' src={item.image} />
                    <div className={styles.influencerText}>{item.title}</div>
                </div>)}
            </div>
        </div>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAllInfluencers
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        influencers: state.influencers
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Influencer);