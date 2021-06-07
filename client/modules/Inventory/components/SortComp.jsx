import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchShopCatalog } from '../InventoryActions';

// Import Style
import styles from './inventory.css';

var filterList = {};
const sortByOptions = [{ key: '', value: '' }, { key: 'price', value: 'Price' }, { key: "upload", value: 'Upload Date' }];
const orderOptions = [{ key: '', value: '' }, { key: 'asc', value: 'Ascending' }, { key: "desc", value: 'Descending' }];
const orderUploadOptions = [{ key: 'newest', value: 'Newest' }];

class SortComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
            sortExpanded: false,
            orderExpanded: false,
            selectedSortName: '',
            selectedSortOrder: '',
            isSortBySelected: false,
            isOrderSelected: false,
            finalParamList: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleToggle(e) {
        e.preventDefault();
        this.setState({ isExpanded: !this.state.isExpanded });
    }

    toggleExpanded = (fieldName) => {
        switch (fieldName) {
            case 'sort':
                if (!this.state.sortExpanded) {
                    this.setState({ sortExpanded: true, orderExpanded: false });
                } else {
                    this.setState({ sortExpanded: false, orderExpanded: false });
                }
                break;
            case 'order':
                if (!this.state.orderExpanded) {
                    this.setState({ orderExpanded: true, sortExpanded: false });
                } else {
                    this.setState({ orderExpanded: false, sortExpanded: false });
                }
                break;
        }
    };

    handleChange(e) {
        let { name, value } = e.target,
            newFilter = { [name]: value },
            filterParamList = '';
        switch (name) {
            case 'sort':
                if (value == '') {
                    this.setState({ selectedSortName: value, selectedSortOrder: value, isSortBySelected: false, isOrderSelected: false });
                } else {
                    if (value == 'upload') {
                        this.setState({ selectedSortName: value, isSortBySelected: true, selectedSortOrder: 'newest', isOrderSelected: true })
                    } else {
                        this.setState({ selectedSortName: value, isSortBySelected: true, isOrderSelected: false });
                    }
                }
                break;
            case 'order':
                this.setState({ selectedSortOrder: value, isOrderSelected: (value == '' ? false : true) });
                break;
        }
        if (filterList.hasOwnProperty(name)) {
            filterList = { ...filterList, ...{ [name]: value } };
        } else {
            filterList = { ...filterList, ...newFilter };
        }
        if (name == 'sort' && filterList[name] == '') {
            filterList = {};
            filterParamList = '';
            this.setState({ isOrderSelected: false });
            this.props.fetchShopCatalog();
        } else {
            if (value == 'upload') {
                filterParamList = 'sort=newest';
            } else {
                Object.keys(filterList).forEach((filterKey, idx) => {
                    if (filterList[filterKey] != '') {
                        let appendFilter = (Object.keys(filterList).length - 1) != idx ? '&' : '';
                        filterParamList = `${filterParamList}${filterKey}=${filterList[filterKey]}${appendFilter}`;
                    } else {
                        delete filterList[filterKey];
                    }
                });
            }
        }
        console.log(filterParamList);
        this.setState({ finalParamList: filterParamList });
    }

    applyResetFilter(action) {
        const { finalParamList } = this.state;
        switch (action) {
            case 'apply':
                this.props.fetchShopCatalog(finalParamList);
                break;
            case 'reset':
                this.setState({
                    selectedSortName: '', selectedSortOrder: '', isSortBySelected: false,
                    isOrderSelected: false, finalParamList: ''
                });
                filterList = {};
                this.props.fetchShopCatalog();
                break;
        }
    }

    render() {
        const { isExpanded, selectedSortName, selectedSortOrder, isSortBySelected, isOrderSelected } = this.state;
        let finalOrderOptions = selectedSortName == 'upload' ? orderUploadOptions : orderOptions;
        return <div className={styles.filter} style={{ marginTop: '1em' }}>
            <button type="button" id="collapsible" className={styles.collapsible} onClick={(e) => this.handleToggle(e)}>{isExpanded ? 'Collapse' : 'Expand'} Sort<span className={styles.collapsibleIcon}>{isExpanded ? '  -' : '  +'}</span></button>
            <div className={styles.content} style={{ display: isExpanded ? 'block' : 'none' }}>
                {isExpanded && <div>
                    <div className={styles.wrapper}>
                        <div className={styles.divOne} onClick={() => this.toggleExpanded('sort')}>
                            <h4>Sort By</h4>
                            <select name='sort' value={selectedSortName} onChange={this.handleChange} className={styles.inventoryDropdown}>
                                {sortByOptions.map((item, key) => <option key={key} value={item.key}>{item.value}</option>)}
                            </select>
                        </div>
                        <div className={styles.divTwo} onClick={() => this.toggleExpanded('order')}>
                            <h4>Order By</h4>
                            <select name='order' value={selectedSortOrder} disabled={!isSortBySelected} onChange={this.handleChange} className={styles.inventoryDropdown}>
                                {finalOrderOptions.map((item, key) => <option key={key} value={item.key}>{item.value}</option>)}
                            </select>
                        </div>
                        <div className={styles.divThree} style={{ flexDirection: 'row' }}>
                            <button className={styles.inventoryBtn} style={{ marginRight: '2em', cursor: !isOrderSelected && 'not-allowed' }} disabled={!isOrderSelected} onClick={this.applyResetFilter.bind(this, 'apply')}>APPLY</button>
                            <button className={styles.inventoryBtn} onClick={this.applyResetFilter.bind(this, 'reset')}>RESET</button>
                        </div>
                    </div>
                </div>}
            </div>
        </div>;
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchShopCatalog
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(SortComp);