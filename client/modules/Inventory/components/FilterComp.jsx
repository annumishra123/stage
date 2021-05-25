import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchEntireShopCatalog, fetchFilterData } from '../InventoryActions';

// Import Style
import styles from './inventory.css';

var filterList = {};

class FilterComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
            brandList: [],
            categoryList: [],
            subcategoryList: [],
            colorList: [],
            sizeList: [],
            genderList: [],
            itemList: [],
            priceList: [],
            conditionList: [],
            categoryExpanded: false,
            categorySelections: [],
            subCategoryExpanded: false,
            subCategorySelections: [],
            colorExpanded: false,
            colorSelections: [],
            sizeExpanded: false,
            sizeSelections: [],
            brandExpanded: false,
            brandSelections: [],
            conditionExpanded: false,
            conditionSelections: [],
            selectedPricemin: '',
            selectedPricemax: '',
            selectedGender: '',
            enteredSeller: '',
            enteredQuantity: '',
            enteredShippingsize: '',
            enteredSequence: '',
            enteredSku: '',
            enteredName: '',
            actualGenderList: [],
            afterHandleChange: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchEntireShopCatalog();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.entirShopCatalog) {
            let facetsData = nextProps.entirShopCatalog.facets;
            this.setState({
                brandList: Object.keys(facetsData.brand) || [],
                categoryList: Object.keys(facetsData.categories) || [],
                subcategoryList: Object.keys(facetsData.subcategories) || [],
                colorList: Object.keys(facetsData.colour) || [],
                sizeList: Object.keys(facetsData.size) || [],
                genderList: (this.state.afterHandleChange ? this.state.actualGenderList : Object.keys(facetsData.gender)) || [],
                priceList: Object.keys(facetsData.price) || [],
                conditionList: Object.keys(facetsData.condition) || [],
            });
            if (!this.state.afterHandleChange) {
                this.setState({
                    actualGenderList: Object.keys(facetsData.gender) || []
                });
            }
        }
    }

    handleToggle(e) {
        e.preventDefault();
        this.setState({ isExpanded: !this.state.isExpanded });
    }

    customDropDown(expand, dataList, selectionList, name, itemList) {
        return <div>
            <div className={expand ? styles.upArrow : styles.downArrow}>
                {selectionList.length != 0
                    ? selectionList.map((name, i) => (
                        <span key={i}>
                            {i ? ", " : null}
                            {name}
                        </span>
                    ))
                    : "None selected"}
            </div>
            {
                expand && (
                    <div className={styles.optionsContainer}>
                        {dataList.length != 0 && dataList.sort((val, nextVal) => val.toLowerCase().localeCompare(nextVal.toLowerCase()))
                            .map(item => (
                                <label htmlFor={item} className={styles.optionSection} key={item}>
                                    <input
                                        type="checkbox"
                                        id={item}
                                        name={name}
                                        value={item}
                                        checked={itemList.length != 0 && itemList.includes(item) || false}
                                        onChange={this.handleChange}
                                        className={styles.optionCheckbox}
                                    />
                                    {item}
                                </label>
                            ))}
                    </div>
                )
            }
        </div>
    }

    toggleExpanded = (fieldName) => {
        switch (fieldName) {
            case 'categories':
                if (!this.state.categoryExpanded) {
                    this.setState({ categoryExpanded: true, subCategoryExpanded: false, colorExpanded: false, sizeExpanded: false, brandExpanded: false, conditionExpanded: false });
                } else {
                    this.setState({ categoryExpanded: false, subCategoryExpanded: false, colorExpanded: false, sizeExpanded: false, brandExpanded: false, conditionExpanded: false });
                }
                break;
            case 'subcategories':
                if (!this.state.subCategoryExpanded) {
                    this.setState({ subCategoryExpanded: true, categoryExpanded: false, colorExpanded: false, sizeExpanded: false, brandExpanded: false, conditionExpanded: false });
                } else {
                    this.setState({ subCategoryExpanded: false, categoryExpanded: false, colorExpanded: false, sizeExpanded: false, brandExpanded: false, conditionExpanded: false });
                }
                break;
            case 'colour':
                if (!this.state.colorExpanded) {
                    this.setState({ colorExpanded: true, categoryExpanded: false, subCategoryExpanded: false, sizeExpanded: false, brandExpanded: false, conditionExpanded: false });
                } else {
                    this.setState({ colorExpanded: false, categoryExpanded: false, subCategoryExpanded: false, sizeExpanded: false, brandExpanded: false, conditionExpanded: false });
                }
                break;
            case 'size':
                if (!this.state.sizeExpanded) {
                    this.setState({ sizeExpanded: true, categoryExpanded: false, subCategoryExpanded: false, colorExpanded: false, brandExpanded: false, conditionExpanded: false });
                } else {
                    this.setState({ sizeExpanded: false, categoryExpanded: false, subCategoryExpanded: false, colorExpanded: false, brandExpanded: false, conditionExpanded: false });
                }
                break;
            case 'brand':
                if (!this.state.brandExpanded) {
                    this.setState({ brandExpanded: true, categoryExpanded: false, subCategoryExpanded: false, sizeExpanded: false, colorExpanded: false, conditionExpanded: false });
                } else {
                    this.setState({ brandExpanded: false, categoryExpanded: false, subCategoryExpanded: false, sizeExpanded: false, colorExpanded: false, conditionExpanded: false });
                }
                break;
            case 'condition':
                if (!this.state.conditionExpanded) {
                    this.setState({ conditionExpanded: true, brandExpanded: false, categoryExpanded: false, subCategoryExpanded: false, sizeExpanded: false, colorExpanded: false });
                } else {
                    this.setState({ conditionExpanded: false, brandExpanded: false, categoryExpanded: false, subCategoryExpanded: false, sizeExpanded: false, colorExpanded: false })
                }
                break;
        }
    };

    handleChange(e) {
        let { name, value, checked } = e.target,
            newFilter = { [name]: value },
            filterParamList = '', itemSelected = [];
        switch (name) {
            case 'size':
                itemSelected = this.state.sizeSelections;
                if (checked) {
                    itemSelected.push(value)
                } else {
                    itemSelected = itemSelected.filter(function (obj) {
                        return obj !== value;
                    });
                }
                this.setState({ sizeSelections: itemSelected, sizeExpanded: true });
                break;
            case 'colour':
                itemSelected = this.state.colorSelections;
                if (checked) {
                    itemSelected.push(value)
                } else {
                    itemSelected = itemSelected.filter(function (obj) {
                        return obj !== value;
                    });
                }
                this.setState({ colorSelections: itemSelected, colorExpanded: true });
                break;
            case 'categories':
                itemSelected = this.state.categorySelections;
                if (checked) {
                    itemSelected.push(value)
                } else {
                    itemSelected = itemSelected.filter(function (obj) {
                        return obj !== value;
                    });
                }
                this.setState({ categorySelections: itemSelected, categoryExpanded: true, isCategorySelected: itemSelected.length != 0 ? true : false });
                break;
            case 'subcategories':
                itemSelected = this.state.subCategorySelections;
                if (checked) {
                    itemSelected.push(value)
                } else {
                    itemSelected = itemSelected.filter(function (obj) {
                        return obj !== value;
                    });
                }
                this.setState({ subCategorySelections: itemSelected, subCategoryExpanded: true });
                break;
            case 'brand':
                itemSelected = this.state.brandSelections;
                if (checked) {
                    itemSelected.push(value)
                } else {
                    itemSelected = itemSelected.filter(function (obj) {
                        return obj !== value;
                    });
                }
                this.setState({ brandSelections: itemSelected, brandExpanded: true });
                break;
            case 'condition':
                itemSelected = this.state.conditionSelections;
                if (checked) {
                    itemSelected.push(value)
                } else {
                    itemSelected = itemSelected.filter(function (obj) {
                        return obj !== value;
                    });
                }
                this.setState({ conditionSelections: itemSelected, conditionExpanded: true });
                break;
            case 'gender':
                this.setState({ selectedGender: value, afterHandleChange: true });
                break;
            case 'pricemin':
                this.setState({ selectedPricemin: value });
                break;
            case 'pricemax':
                if (parseInt(this.state.selectedPricemin) < parseInt(value)) {
                    this.setState({ selectedPricemax: value });
                } else {
                    alert("Update | Price max range should be greater than min range!!!");
                    this.setState({ selectedPricemax: '' });
                }
                break;
            case 'seller':
                this.setState({ enteredSeller: value });
                break;
            case 'quantity':
                this.setState({ enteredQuantity: value });
                break;
            case 'shippingsize':
                this.setState({ enteredShippingsize: value });
                break;
            case 'sequence':
                this.setState({ enteredSequence: value });
                break;
            case 'sku':
                this.setState({ enteredSku: value });
                break;
            case 'name':
                this.setState({ enteredName: value });
                break;
        }
        itemSelected = [];
        if (filterList.hasOwnProperty(name) && name !== 'gender') {
            let updatedVal = '';
            if (!checked) {
                let tempArr = filterList[name].split(',');
                tempArr = tempArr.filter(o => {
                    return o.trim() != newFilter[name];
                })
                updatedVal = tempArr.join();
            } else {
                updatedVal = filterList[name] + ',' + newFilter[name];
            }
            filterList = { ...filterList, ...{ [name]: updatedVal } };
        } else {
            filterList = { ...filterList, ...newFilter };
        }
        Object.keys(filterList).forEach((filterKey, idx) => {
            if (filterList[filterKey] != '') {
                let appendFilter = (Object.keys(filterList).length - 1) != idx ? '&' : '';
                filterParamList = `${filterParamList}${filterKey}=${filterList[filterKey]}${appendFilter}`;
            } else {
                delete filterList[filterKey];
            }
        });
        console.log(filterParamList);
        this.props.fetchEntireShopCatalog(filterParamList != '' ? `?${filterParamList}` : '');
    }

    applyResetFilter(action) {
        let filterData = '';
        this.setState({ conditionExpanded: false, brandExpanded: false, categoryExpanded: false, subCategoryExpanded: false, sizeExpanded: false, colorExpanded: false })
        if (Object.keys(filterList).length != 0) {
            switch (action) {
                case 'apply':
                    Object.keys(filterList).forEach((filterKey, idx) => {
                        if (filterList[filterKey] != '') {
                            let appendFilter = (Object.keys(filterList).length - 1) != idx ? '&' : '';
                            filterData = `${filterData}${filterKey}=${filterList[filterKey]}${appendFilter}`;
                        } else {
                            delete filterList[filterKey];
                        }
                    });
                    this.props.fetchFilterData(filterData != '' ? `?${filterData}` : '');
                    break;
                case 'reset':
                    this.setState({
                        categorySelections: [], subCategorySelections: [], colorSelections: [], sizeSelections: [], brandSelections: [], conditionSelections: [],
                        selectedPricemin: '', selectedPricemax: '', selectedGender: '', enteredSeller: '', enteredQuantity: '', enteredShippingsize: '',
                        enteredSequence: '', enteredSku: '', enteredName: ''
                    });
                    this.props.fetchFilterData(filterData);
                    break;
            }
        }
        filterData = '';
    }

    render() {
        const { isExpanded, genderList, sizeList, brandList, categoryList, subcategoryList, colorList, priceList, conditionList, selectedPricemin,
            selectedPricemax, categoryExpanded, categorySelections, subCategoryExpanded, subCategorySelections, colorExpanded, colorSelections,
            sizeExpanded, sizeSelections, brandExpanded, brandSelections, selectedGender, conditionExpanded, conditionSelections,
            enteredSeller, enteredQuantity, enteredShippingsize, enteredSequence, enteredSku, enteredName, afterHandleChange, actualGenderList } = this.state;
        let categoriesItemList = categorySelections, subCategoriesItemList = subCategorySelections,
            colorItemList = colorSelections, sizeItemList = sizeSelections, brandItemList = brandSelections, conditionItemList = conditionSelections;
        let genderItems = afterHandleChange ? actualGenderList : genderList;
        return <div>
            <button type="button" id="collapsible" className={styles.collapsible} onClick={(e) => this.handleToggle(e)}>{isExpanded ? 'Collapse' : 'Expand'} Filter(s)<span className={styles.collapsibleIcon}>{isExpanded ? '  -' : '  +'}</span></button>
            <div className={styles.content} style={{ display: isExpanded ? 'block' : 'none' }}>
                {isExpanded && <div>
                    <div className={styles.wrapper}>
                        <div className={styles.divOne}>
                            <h4>SKU</h4>
                            <input type='text' name='sku' value={enteredSku} className={styles.inventoryInput} onChange={this.handleChange} />
                        </div>
                        <div className={styles.divTwo}>
                            <h4>Name</h4>
                            <input type='text' name='name' value={enteredName} className={styles.inventoryInput} onChange={this.handleChange} />
                        </div>
                        <div className={styles.divThree}>
                            <h4>Gender</h4>
                            <select name='gender' value={selectedGender} onChange={this.handleChange} className={styles.inventoryDropdown}>
                                <option value=""></option>
                                {genderItems.sort((val, nextVal) => {
                                    let firstVal = val.value || val, secondVal = nextVal.value || nextVal;
                                    return firstVal.toLowerCase().localeCompare(secondVal.toLowerCase())
                                }).map((item, key) => <option key={key} value={item.key || item}>{item.value || item}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.divOne} onClick={() => this.toggleExpanded('categories')}>
                            <h4>Category</h4>
                            {this.customDropDown(categoryExpanded, categoryList, categorySelections, "categories", categoriesItemList)}
                        </div>
                        <div className={styles.divTwo} onClick={() => this.toggleExpanded('subcategories')}>
                            <h4>Sub Category</h4>
                            {this.customDropDown(subCategoryExpanded, subcategoryList, subCategorySelections, "subcategories", subCategoriesItemList)}
                        </div>
                        <div className={styles.divThree} onClick={() => this.toggleExpanded('colour')}>
                            <h4>Color</h4>
                            {this.customDropDown(colorExpanded, colorList, colorSelections, "colour", colorItemList)}
                        </div>
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.divOne} onClick={() => this.toggleExpanded('size')}>
                            <h4>Size</h4>
                            {this.customDropDown(sizeExpanded, sizeList, sizeSelections, "size", sizeItemList)}
                        </div>
                        <div className={styles.divTwo} onClick={() => this.toggleExpanded('brand')}>
                            <h4>Brand</h4>
                            {this.customDropDown(brandExpanded, brandList, brandSelections, "brand", brandItemList)}
                        </div>
                        <div className={styles.divThree} onClick={() => this.toggleExpanded('condition')}>
                            <h4>Condition</h4>
                            {this.customDropDown(conditionExpanded, conditionList, conditionSelections, "condition", conditionItemList)}
                        </div>
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.divTwo}>
                            <h4>Seller</h4>
                            <input type='text' name='seller' value={enteredSeller} className={styles.inventoryInput} onChange={this.handleChange} />
                        </div>
                        <div className={styles.divOne}>
                            <h4>Quantity</h4>
                            <input type='number' name='quantity' value={enteredQuantity} className={styles.inventoryInput} onChange={this.handleChange} />
                        </div>

                        <div className={styles.divThree}>
                            <h4>Shipping Size</h4>
                            <input type='number' name='shippingsize' value={enteredShippingsize} className={styles.inventoryInput} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.divOne}>
                            <h4>Sequence</h4>
                            <input type='number' name='sequence' value={enteredSequence} className={styles.inventoryInput} onChange={this.handleChange} />
                        </div>
                        <div className={styles.divTwo}>
                            <h4>Price</h4>
                            <div
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <input
                                    type="number"
                                    name="pricemin"
                                    value={selectedPricemin}
                                    onChange={this.handleChange}
                                    placeholder='Min'
                                    className={styles.inventoryInput}
                                    style={{
                                        width: '8.7em',
                                        marginRight: '0.5rem',
                                    }}
                                />
                            to
                            <input
                                    type="number"
                                    name="pricemax"
                                    value={selectedPricemax}
                                    onChange={this.handleChange}
                                    placeholder='Max'
                                    className={styles.inventoryInput}
                                    style={{
                                        width: '8.7em',
                                        marginLeft: '0.5rem',
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.divThree} style={{ flexDirection: 'row' }}>
                            <button className={styles.inventoryBtn} style={{ marginRight: '2em' }} onClick={this.applyResetFilter.bind(this, 'apply')}>APPLY</button>
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
        fetchEntireShopCatalog,
        fetchFilterData
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        entirShopCatalog: state.entirShopCatalog
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(FilterComp);