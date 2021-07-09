import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import Autocomplete from './Autocomplete';
import { fetchStories, fetchShopCatalog, fetchFilterData, createNewStore, getAllStores, getAllSellers, createStories, deactivateStory } from '../StoriesActions';
import DragDrog from './DragDrop';

// Import Style
import styles from '../stories.css';

const storyType = ['Seller', 'Store'];
const storeType = ['Existing', 'New'];

var filterList = {};

class Stories extends React.Component {
    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.state = {
            selectedType: '',
            selectedStoreType: '',
            previewFile: [],
            sellerStoriesList: [],
            storeStoriesList: [],
            selectedListItem: {},
            selectedGender: '',
            selectedPricemin: '',
            selectedPricemax: '',
            brandList: [],
            categoryList: [],
            subcategoryList: [],
            colorList: [],
            sizeList: [],
            genderList: [],
            itemList: [],
            priceList: [],
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
            skuList: [],
            isCategorySelected: false,
            imageFiles: [],
            actualGenderList: [],
            afterHandleChange: false,
            storeName: '',
            finalFilterParamList: '',
            afterFilterChange: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.props.fetchStories();
        this.props.fetchShopCatalog();
        this.props.getAllStores();
        this.props.getAllSellers();
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        if (node && node.title) {
            switch (node.title.toLowerCase()) {
                case 'category':
                    this.categoryRef = node;
                    break;
                case 'subcategory':
                    this.subCategoryRef = node;
                    break;
                case 'color':
                    this.colorRef = node;
                    break;
                case 'size':
                    this.sizeRef = node;
                    break;
                case 'brand':
                    this.brandRef = node;
                    break;
            }
        }
    }

    handleClickOutside(event) {
        if (this.categoryRef && !this.categoryRef.contains(event.target)) {
            this.setState({ categoryExpanded: false });
        }
        if (this.subCategoryRef && !this.subCategoryRef.contains(event.target)) {
            this.setState({ subCategoryExpanded: false });
        }
        if (this.colorRef && !this.colorRef.contains(event.target)) {
            this.setState({ colorExpanded: false });
        }
        if (this.sizeRef && !this.sizeRef.contains(event.target)) {
            this.setState({ sizeExpanded: false });
        }
        if (this.brandRef && !this.brandRef.contains(event.target)) {
            this.setState({ brandExpanded: false });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.allStore) {
            this.setState({
                storeStoriesList: nextProps.allStore
            });
        }
        if (nextProps.allSeller) {
            this.setState({
                sellerStoriesList: nextProps.allSeller
            });
        }
        if (nextProps.shopCatalog) {
            let facetsData = nextProps.shopCatalog.facets;
            this.setState({
                brandList: Object.keys(facetsData.brand) || [],
                categoryList: Object.keys(facetsData.categories) || [],
                subcategoryList: Object.keys(facetsData.subcategories) || [],
                colorList: Object.keys(facetsData.colour) || [],
                sizeList: Object.keys(facetsData.size) || [],
                genderList: (this.state.afterHandleChange ? this.state.actualGenderList : Object.keys(facetsData.gender)) || [],
                priceList: Object.keys(facetsData.price) || []
            });
            if (!this.state.afterHandleChange) {
                this.setState({
                    actualGenderList: Object.keys(facetsData.gender) || []
                });
            }
            if (this.state.afterFilterChange) {
                this.setState({
                    itemList: nextProps.shopCatalog.docs || []
                });
            }
        }
    }

    typeHandleChange(e) {
        this.setState({ selectedType: e ? e.value : '', selectedStoreType: '', selectedListItem: {}, previewFile: [], afterHandleChange: false });
    }

    storeTypeHandleChange(e) {
        this.setState({ selectedStoreType: e ? e.value : '', afterHandleChange: false });
    }

    onItemSelectionChange(val) {
        const { selectedType } = this.state;
        if (val == '') {
            this.setState({ selectedListItem: {} });
            return;
        }
        let selectedItem = {};
        switch (selectedType.toLowerCase()) {
            case 'seller':
                selectedItem = this.props.allSeller.filter(item => {
                    let sellerName = `${item.firstName} ${item.lastName}`;
                    return sellerName == val;
                });
                break;
            case 'store':
                selectedItem = this.props.allStore.filter(item => item.title == val);
                break;
        }
        this.setState({ selectedListItem: selectedItem });
        console.log(selectedItem);
    }

    renderSellerSection() {
        const { selectedListItem, sellerStoriesList, selectedType } = this.state;
        return <div className={styles.sellerFormSection}>
            <h2>Seller</h2>
            <h4>Name: </h4>
            <Autocomplete suggestions={sellerStoriesList} selectedItem={this.onItemSelectionChange.bind(this)} selectedType={selectedType} />
            {
                Object.keys(selectedListItem).length != 0 && selectedListItem.map((file) => (
                    <div className={styles.sellerselection}>
                        <span><img className={styles.storeDetailImg} alt='No Image available' src={file.profileImageUrl} /></span>
                        <h3><div className={styles.storeDetailText}>{`${file.firstName} ${file.lastName}`}</div></h3>
                    </div>
                ))
            }
        </div>
    }

    renderStoreSection() {
        return <div className={styles.storeFormSection}>
            <h2>Store</h2>
            <h4>Choose Store: </h4>
            <Select className={styles.typeSelect}
                value={this.state.selectedStoreType}
                onChange={(e) => this.storeTypeHandleChange(e)}
                options={storeType.map((item, i) => {
                    return { value: item, label: item }
                })}></Select>
        </div>
    }

    renderExistingStoreSection() {
        const { storeStoriesList, selectedType } = this.state;
        return <div className={styles.existStoreFormSection}>
            <h4>Search Store: </h4>
            <Autocomplete suggestions={storeStoriesList} selectedItem={this.onItemSelectionChange.bind(this)} selectedType={selectedType} />
        </div>
    }

    handleShopOnDrop(acceptedFiles, rejectedFiles) {
        const me = this,
            { imageFiles, previewFile } = me.state;
        acceptedFiles.forEach(file => {
            if (previewFile.length > 0) {
                previewFile[0] = file;
            } else {
                previewFile.push(file);
            }
            me.setState({ imageFiles: [], previewFile: previewFile });
            let fileType = file.type.match(/^image/) ? 'image' : '';
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileAsArrayBuffer = reader.result;
                console.log(fileAsArrayBuffer);
                let blobData = new Blob([fileAsArrayBuffer], { type: `${file.type}` });
                if (fileType != '') {
                    imageFiles.push(blobData);
                    me.setState({ imageFiles: imageFiles, fileType: fileType });
                }
            };
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.readAsArrayBuffer(file);
        });
    }

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
                this.setState({ sizeSelections: itemSelected, sizeExpanded: true, afterHandleChange: true });
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
                this.setState({ colorSelections: itemSelected, colorExpanded: true, afterHandleChange: true });
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
                this.setState({ categorySelections: itemSelected, categoryExpanded: true, afterHandleChange: true, isCategorySelected: itemSelected.length != 0 ? true : false });
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
                this.setState({ subCategorySelections: itemSelected, subCategoryExpanded: true, afterHandleChange: true });
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
                this.setState({ brandSelections: itemSelected, brandExpanded: true, afterHandleChange: true });
                break;
            case 'gender':
                this.setState({ selectedGender: value, afterHandleChange: true });
                break;
            case 'pricemin':
                this.setState({ selectedPricemin: value, afterHandleChange: true });
                break;
            case 'pricemax':
                if (parseInt(this.state.selectedPricemin) < parseInt(value)) {
                    this.setState({ selectedPricemax: value, afterHandleChange: true });
                } else {
                    alert("Update | Price max range should be greater than min range!!!");
                    this.setState({ selectedPricemax: '' });
                }
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
        this.setState({ finalFilterParamList: filterParamList });
        this.props.fetchFilterData(filterParamList != '' ? `?${filterParamList}` : '');
    }

    filterClickHandler = (action) => {
        const { finalFilterParamList } = this.state;
        let emptyString = '';
        switch (action.toLowerCase()) {
            case 'apply':
                this.props.fetchFilterData(finalFilterParamList != emptyString ? `?${finalFilterParamList}` : emptyString);
                this.setState({ afterFilterChange: true });
                break;
            case 'clear':
                this.props.fetchFilterData(emptyString);
                this.setState({
                    afterFilterChange: false, storeName: '', selectedGender: '',
                    brandList: [], categoryList: [], subcategoryList: [], colorList: [], sizeList: [], genderList: this.state.actualGenderList || [], priceList: [],
                    categoryExpanded: false, categorySelections: [],
                    subCategoryExpanded: false, subCategorySelections: [],
                    colorExpanded: false, colorSelections: [],
                    sizeExpanded: false, sizeSelections: [],
                    brandExpanded: false, brandSelections: [],
                    skuList: [], imageFiles: [], previewFile: [], itemList: []
                });
                break
        }
        emptyString = '';
    }

    toggleExpanded = (fieldName) => {
        switch (fieldName) {
            case 'categories':
                if (!this.state.categoryExpanded) {
                    this.setState({ categoryExpanded: true, subCategoryExpanded: false, colorExpanded: false, sizeExpanded: false, brandExpanded: false, afterFilterChange: false });
                } else {
                    this.setState({ categoryExpanded: false, subCategoryExpanded: false, colorExpanded: false, sizeExpanded: false, brandExpanded: false, afterFilterChange: false });
                }
                break;
            case 'subcategories':
                if (!this.state.subCategoryExpanded) {
                    this.setState({ subCategoryExpanded: true, categoryExpanded: false, colorExpanded: false, sizeExpanded: false, brandExpanded: false, afterFilterChange: false });
                } else {
                    this.setState({ subCategoryExpanded: false, categoryExpanded: false, colorExpanded: false, sizeExpanded: false, brandExpanded: false, afterFilterChange: false });
                }
                break;
            case 'colour':
                if (!this.state.colorExpanded) {
                    this.setState({ colorExpanded: true, categoryExpanded: false, subCategoryExpanded: false, sizeExpanded: false, brandExpanded: false, afterFilterChange: false });
                } else {
                    this.setState({ colorExpanded: false, categoryExpanded: false, subCategoryExpanded: false, sizeExpanded: false, brandExpanded: false, afterFilterChange: false });
                }
                break;
            case 'size':
                if (!this.state.sizeExpanded) {
                    this.setState({ sizeExpanded: true, categoryExpanded: false, subCategoryExpanded: false, colorExpanded: false, brandExpanded: false, afterFilterChange: false });
                } else {
                    this.setState({ sizeExpanded: false, categoryExpanded: false, subCategoryExpanded: false, colorExpanded: false, brandExpanded: false, afterFilterChange: false });
                }
                break;
            case 'brand':
                if (!this.state.brandExpanded) {
                    this.setState({ brandExpanded: true, categoryExpanded: false, subCategoryExpanded: false, sizeExpanded: false, colorExpanded: false, afterFilterChange: false });
                } else {
                    this.setState({ brandExpanded: false, categoryExpanded: false, subCategoryExpanded: false, sizeExpanded: false, colorExpanded: false, afterFilterChange: false });
                }
                break;
        }
    };

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
                <div className={styles.optionsContainer} style={{ display: expand ? 'block' : 'none' }}>
                    {dataList.length != 0 && dataList.sort((val, nextVal) => val.toLowerCase().localeCompare(nextVal.toLowerCase()))
                        .map((item, idx) => (
                            <label htmlFor={item} className={styles.optionSection} key={idx} onClick={() => this.setState({ categoryExpanded: true })}>
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
            }
        </div>
    }

    renderNewStoreSection() {
        const { selectedGender, genderList, brandList, sizeList, categoryList, subcategoryList, colorList, priceList, selectedPricemin,
            selectedPricemax, categoryExpanded, categorySelections, subCategoryExpanded, subCategorySelections, colorExpanded,
            colorSelections, sizeExpanded, sizeSelections, brandExpanded, brandSelections, isCategorySelected, actualGenderList, afterHandleChange } = this.state;
        let categoriesItemList = categorySelections, subCategoriesItemList = subCategorySelections,
            colorItemList = colorSelections, sizeItemList = sizeSelections, brandItemList = brandSelections;
        let genderItems = afterHandleChange ? actualGenderList : genderList;
        return <div className={styles.newStore}>
            <div title='StoreName' className={styles.bubbleFormField}>
                <h4>Store Name: </h4>
                <input type='text' name='title' className={styles.bubbleInput} onChange={e => { this.setState({ storeName: e.target.value }) }} />
            </div>
            <div title='Gender' className={styles.bubbleFormField}>
                <h4>Gender: </h4>
                <select
                    name="gender"
                    className={styles.bubbleDropdown}
                    value={selectedGender}
                    onChange={this.handleChange}
                >
                    <option value=""></option>
                    {genderItems.sort((val, nextVal) => {
                        let firstVal = val.value || val, secondVal = nextVal.value || nextVal;
                        return firstVal.toLowerCase().localeCompare(secondVal.toLowerCase())
                    }).map((item, key) => <option key={key} value={item}>{item}</option>)}
                </select>
            </div>
            <div ref={this.setWrapperRef} title='Category' className={styles.bubbleFormField} onClick={() => this.toggleExpanded('categories')}>
                <h4>Category: </h4>
                {this.customDropDown(categoryExpanded, categoryList, categorySelections, "categories", categoriesItemList)}
            </div>
            <div ref={this.setWrapperRef} title='SubCategory' className={styles.bubbleFormField} onClick={() => isCategorySelected ? this.toggleExpanded('subcategories') : {}}>
                <h4>Sub Category: </h4>
                {this.customDropDown(subCategoryExpanded, subcategoryList, subCategorySelections, "subcategories", subCategoriesItemList)}
            </div>
            <div ref={this.setWrapperRef} title='Color' className={styles.bubbleFormField} onClick={() => this.toggleExpanded('colour')}>
                <h4>Color: </h4>
                {this.customDropDown(colorExpanded, colorList, colorSelections, "colour", colorItemList)}
            </div>
            <div ref={this.setWrapperRef} title='Size' className={styles.bubbleFormField} onClick={() => this.toggleExpanded('size')}>
                <h4>Size: </h4>
                {this.customDropDown(sizeExpanded, sizeList, sizeSelections, "size", sizeItemList)}
            </div>
            <div ref={this.setWrapperRef} title='Brand' className={styles.bubbleFormField} onClick={() => this.toggleExpanded('brand')}>
                <h4>Brand: </h4>
                {this.customDropDown(brandExpanded, brandList, brandSelections, "brand", brandItemList)}
            </div>
            <div title='Price Range' className={styles.bubbleFormField}>
                <h4>Price Range: </h4>
                <div style={{ display: 'flex' }}>
                    <select
                        name="pricemin"
                        className={styles.priceDropdown}
                        value={selectedPricemin}
                        onChange={this.handleChange}
                    >
                        {priceList.length != 0 && priceList.sort().map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                    <select
                        name="pricemax"
                        className={styles.priceDropdown}
                        value={selectedPricemax}
                        onChange={this.handleChange}
                    >
                        {priceList.length != 0 && priceList.sort().map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
            </div>
        </div>
    }

    createSkuList(data) {
        this.setState({ skuList: data });
    }

    createStore() {
        const { storeName, skuList, selectedType, selectedListItem, selectedStoreType, imageFiles } = this.state;
        let createStoreData = {};
        if (selectedType.toLowerCase() == 'seller') {
            selectedListItem.forEach(i => {
                createStoreData = {
                    title: `${i.firstName} ${i.lastName}` || '',
                    skuList: [],
                    image: imageFiles[0] || [],
                    type: 'seller',
                    link: i.email || '',
                    status: true
                };
            });
            this.props.createStories(createStoreData);
        } else {
            switch (selectedStoreType.toLowerCase()) {
                case 'existing':
                    let createStoryData = {};
                    selectedListItem.forEach(i => {
                        createStoryData = {
                            title: i.title || '',
                            image: imageFiles[0] || [],
                            type: 'store',
                            link: i.title || '',
                            status: true
                        };
                    });
                    this.props.createStories(createStoryData);
                    break;
                case 'new':
                    createStoreData = {
                        title: storeName || '',
                        skuList: skuList || [],
                        image: imageFiles[0] || [],
                        type: 'store',
                        link: storeName.replace(/\s+/g, '-').toLowerCase() || '',
                        status: true
                    };
                    this.props.createNewStore(createStoreData);
                    break;
            }
        }
        alert("Store and Story created Successfully!!!");
        this.setState({ selectedType: '', selectedStoreType: '', imageFiles: [], previewFile: [], skuList: [], storeName: '' });
    }

    onDisableConfirmation(id) {
        let confirmStatus = confirm('Are you sure want to disable?');
        if (confirmStatus) {
            this.props.deactivateStory(id);
        }
    }

    render() {
        let { selectedType, selectedStoreType, itemList, previewFile, selectedGender, storeName, afterFilterChange } = this.state;
        let { stories } = this.props;
        let isDisabled = selectedType != "" ? true : false;
        if (selectedType != "") {
            switch (selectedType) {
                case 'Seller':
                    isDisabled = previewFile.length != 0 ? true : false;
                    break;
                case 'Store':
                    isDisabled = selectedStoreType != "" ? true : false;
                    switch (selectedStoreType) {
                        case 'Existing':
                            isDisabled = previewFile.length != 0 ? true : false;
                            break;
                        case 'New':
                            isDisabled = (storeName != "" && selectedGender != "" && previewFile.length != 0) ? true : false;
                            break;
                    }
                    break;
            }
        }
        let isFilterDisabled = (selectedType != "" && selectedStoreType != "" && selectedGender != "") ? true : false;
        return <section>
            <button className={styles.backBtn} onClick={() => browserHistory.goBack()}><i className="login__backicon__a-Exb fa fa-chevron-left" aria-hidden="true" /> Back</button>
            <div className={styles.bubbleSection}>
                {stories && stories.length != 0 && stories.map((item, idx) => (
                    <div key={idx} className={styles.bubbleField}>
                        <i title='Disable' className="fa fa-times" style={{ float: 'right', cursor: 'pointer' }} aria-hidden="true" onClick={() => this.onDisableConfirmation(item.id)} />
                        <img className={styles.bubbleArea} alt='No Image available' src={item.image} />
                        <div className={styles.bubbleText}>{item.title}</div>
                    </div>
                ))}
            </div>
            <div className={styles.storyFormSection}>
                <h1>Create Stories</h1>
                <Select className={styles.typeSelect}
                    value={selectedType}
                    onChange={(e) => this.typeHandleChange(e)}
                    options={storyType.map((item, i) => {
                        return { value: item, label: item }
                    })}></Select>
            </div>
            {
                selectedType == 'Seller' ? this.renderSellerSection() :
                    selectedType == 'Store' ? this.renderStoreSection() : ''
            }
            {
                selectedType == 'Store' ?
                    (selectedStoreType == 'Existing' ?
                        this.renderExistingStoreSection() : selectedStoreType == 'New' ?
                            this.renderNewStoreSection() : '') : ''
            }
            {selectedType != '' && <div>
                <h4>Upload Image(for stories): </h4>
                <div style={{ display: 'flex' }}>
                    <div className={styles.fileUpload} style={{ width: '25%' }}>
                        <Dropzone onDrop={this.handleShopOnDrop.bind(this)} accept="image/*" multiple={false}>
                            <p>Select a product image file to upload</p>
                        </Dropzone>
                    </div>
                    {previewFile.length > 0 ? <div>
                        {previewFile.map((file) => {
                            if (file.type.match(/^image/)) {
                                return <img className={styles.storeDetailImg} alt='No Image available' src={file.preview} />
                            }
                        })}
                    </div> : null}
                </div>
            </div>}
            {
                selectedType != '' && selectedStoreType == 'New' &&
                <div>
                    <button className={styles.storiesBtn} style={{ cursor: !isFilterDisabled && 'not-allowed', marginRight: '1em' }} onClick={() => this.filterClickHandler('apply')} disabled={!isFilterDisabled}>Apply Filter</button>
                    <button className={styles.storiesBtn} onClick={() => this.filterClickHandler('clear')}>Reset Filter</button>
                </div>
            }
            {afterFilterChange && selectedType != "" && selectedStoreType != "" && <DragDrog itemList={itemList} isAfterChange={afterFilterChange} updatedSkuList={data => this.createSkuList(data)} />}
            <button className={styles.storiesBtn} style={{ cursor: !isDisabled && 'not-allowed' }} onClick={this.createStore.bind(this)} disabled={!isDisabled}>Create</button>
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchStories,
        fetchShopCatalog,
        fetchFilterData,
        createNewStore,
        createStories,
        getAllStores,
        getAllSellers,
        deactivateStory
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        stories: state.stories,
        shopCatalog: state.shopCatalog,
        allStore: state.entireStore,
        allSeller: state.entireSeller
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Stories);