import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllSellers, createUpdateInfluencer } from '../InfluencerAction';
import Autocomplete from './Autocomplete';


// Import Style
import styles from '../influencer.css';

class InfluencerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allSellerList: [],
            selectedListItem: {},
            counterValue: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getAllSellers();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.allSellers) {
            this.setState({
                allSellerList: nextProps.allSellers
            });
        }
    }

    onItemSelectionChange(val) {
        if (val == '') {
            this.setState({ selectedListItem: {} });
            return;
        }
        this.setState({ selectedListItem: val });
    }

    handleChange(e) {
        let { name, value } = e.target;
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
        }
    }

    createInfluencer() {
        const { selectedListItem, counterValue } = this.state,
            { isFromSeeMore } = this.props,
            bodyData = {
                "emailId": Object.keys(selectedListItem).length != 0 && selectedListItem.email || '',
                "influencer": true,
                "influencerSequence": counterValue,
                "spotlight": !isFromSeeMore
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

    render() {
        const { allSellerList, selectedListItem, counterValue } = this.state;
        return <div className={styles.wrapper}>
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
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllSellers,
        createUpdateInfluencer
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        allSellers: state.allSellers
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(InfluencerForm);