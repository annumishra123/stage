import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllInfluencers, fetchInfluencerCarousel } from '../InfluencerAction';
import Carousel from './Carousel';

// Import Style
import styles from '../influencer.css';

class InfluencerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allInfluencersList: [],
            influencersCarouselList: []
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
                            {<img className={styles.suggestionListImage} alt='No Image available' src={item.profileImageUrl || 'https://res.cloudinary.com/stage3/image/upload/v1590582681/Rental_homepage_Banner-260520.jpg'} />}<div className={styles.liText}>{influencerName}</div>
                        </li>
                    );
                })
            }
        </ul>
    }

    render() {
        const { influencersCarouselList } = this.state;
        return <section>
            <button className={styles.backBtn} onClick={() => browserHistory.goBack()}><i className="login__backicon__a-Exb fa fa-chevron-left" aria-hidden="true" /> Back</button>
            <div className={styles.influencerBodySection}>
                <h1>Influencers closets</h1>
                <Carousel dataList={influencersCarouselList} />
                {this.renderListSection()}
            </div>
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAllInfluencers,
        fetchInfluencerCarousel
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