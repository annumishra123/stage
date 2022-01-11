import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import Autocomplete from './Autocomplete';
import { fetchBrands, getAllSellers, updateBrands } from '../BrandsActions';

// Import Style
import styles from '../brands.css';

var filterList = {};

class Brands extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
            sellerList: [],
            isDisabled: false
        }
    }

    componentDidMount() {
        this.props.fetchBrands();
        this.props.getAllSellers();
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.allSeller) {
            this.setState({
                sellerList: nextProps.allSeller
            });
        }
        if (nextProps.brands) {
            this.setState({
                selectedItems: nextProps.brands
            });
        }
    }

    onItemSelectionChange(selectedData) {
        const { selectedItems } = this.state;
        if (selectedData.name == {}) {
            this.setState({ selectedItems: [] });
            return;
        }
        let newSelectedItem = this.props.allSeller.filter(item => {
                if (item.defaultBillingInfoId == selectedData.billingId && item.email == selectedData.email) {
                    return selectedData.name;
                }
            }).map((item) => {
                return {
                    userid: item.email,
                    isSpotlight: false,
                    branddetail: item
                }
            });
        this.setState({ selectedItems: selectedItems.concat(newSelectedItem) });
    }

    updateBrands(e) {
        let {selectedItems} = this.state,
            me = this;
        me.setState({
            isDisabled: true
        });
        this.props.updateBrands(selectedItems.map((item) => {
            return {
                userid: item.userid,
                isSpotlight: item.isSpotlight
            };
        })).then(() => {
            alert("Successfully updated!!!");
            me.setState({
                isDisabled: false
            });
        });
    }

    render() {
        let { sellerList, selectedItems, isDisabled } = this.state;
        return <section>
            <button className={styles.backBtn} onClick={() => browserHistory.goBack()}><i className="login__backicon__a-Exb fa fa-chevron-left" aria-hidden="true" /> Back</button>
            <div className={styles.storyFormSection}>
                <h1>Create Brands</h1>
            </div>
            <div className={styles.sellerFormSection}>
                <h2>Sellers</h2>
                <h4>Names: </h4>
                <Autocomplete suggestions={sellerList} selectedItem={this.onItemSelectionChange.bind(this)} />
                {
                    selectedItems.map((data, index) => {
                        let file = data.branddetail;
                        return (<div key={index} style={{position: 'relative'}}>
                            <div className={styles.sellerselection}> 
                                <i title='Remove' className="fa fa-times" style={{ 
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '90%',
                                    transform: 'translate(-50%, -50%)'
                                }} aria-hidden="true" onClick={() => {
                                    this.setState({
                                        selectedItems: selectedItems.filter(item => item.userid !== data.userid)
                                    });
                                }} />
                                <span><img className={styles.storeDetailImg} alt='No Image available' src={file.profileImageUrl} /></span>
                                <h3><div className={styles.storeDetailText}>{`${file.firstName} ${file.lastName}`}</div></h3>
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '21%',
                                transform: 'translateY(-50%)'
                            }}>
                                <input type="checkbox" style={{
                                        marginRight: 7,
                                        transform: 'translateY(1px)'
                                    }} checked={data.isSpotlight}
                                    onChange={e => { 
                                        data.isSpotlight = e.currentTarget.checked;
                                        this.setState({selectedItems: selectedItems.concat()});
                                    }}
                                />
                                <label>Spotlight</label>
                            </div>
                        </div>)
                    })
                }
            </div>
            <button className={styles.storiesBtn} style={{ cursor: isDisabled && 'not-allowed' }} onClick={this.updateBrands.bind(this)} disabled={isDisabled}>Update</button>
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBrands,
        getAllSellers,
        updateBrands
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        brands: state.brands,
        allSeller: state.entireSeller
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Brands);