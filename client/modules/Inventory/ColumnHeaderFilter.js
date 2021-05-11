import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchFilterData } from './InventoryActions';

var filterList = {};

class ColumnHeaderFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appliedFilter: {}
        }
        this.filterOnChange = this.filterOnChange.bind(this);
    }

    filterOnChange(e) {
        let { name, value } = e.target,
            newFilter = { [name]: value },
            filterParamList = '';
        filterList = { ...filterList, ...newFilter };
        if (value == '') {
            delete filterList[name];
        }
        this.setState({ appliedFilter: filterList });
        Object.keys(filterList).forEach((filterKey, idx) => {
            let appendFilter = (Object.keys(filterList).length - 1) != idx ? '&' : '';
            filterParamList = `${filterParamList}${filterKey}=${filterList[filterKey]}${appendFilter}`;
        });
        console.log(filterParamList);
        this.props.fetchFilterData(filterParamList)
    }

    renderField() {
        const { colKey, filterType, listData } = this.props;
        switch (filterType) {
            case 'select':
                return <select name={colKey} onChange={this.filterOnChange} style={{ width: '100%' }}>
                    {colKey == 'gender' && <option value=""></option>}
                    {listData.sort((val, nextVal) => {
                        let firstVal = val.value || val, secondVal = nextVal.value || nextVal;
                        return firstVal.toLowerCase().localeCompare(secondVal.toLowerCase())
                    }).map((item, key) => <option key={key} value={item.key || item}>{item.value || item}</option>)}
                </select>
            case 'number':
                return <input type="number" name={colKey} onChange={this.filterOnChange} style={{ width: '100%' }} />
            case 'range':
                let keyName = colKey == 'saleprice' ? 'price' : colKey;
                return <div
                    style={{
                        display: 'flex',
                    }}
                ><input
                        type="number"
                        name={`${keyName}max`}
                        onChange={this.filterOnChange}
                        placeholder='Max'
                        style={{
                            width: '70px',
                            marginLeft: '0.5rem',
                        }}
                    />
                    to
                    <input
                        type="number"
                        name={`${keyName}min`}
                        onChange={this.filterOnChange}
                        placeholder='Min'
                        style={{
                            width: '70px',
                            marginRight: '0.5rem',
                        }}
                    />
                </div>

            default:
                return <input type="text" name={colKey} onChange={this.filterOnChange} style={{ width: '100%' }} />
        }
    }

    render() {
        return this.renderField();
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchFilterData
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(ColumnHeaderFilter);