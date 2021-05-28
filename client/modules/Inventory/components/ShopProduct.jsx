import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { fetchShopProduct, updateShopProduct, updateProductImage } from '../InventoryActions';
import clientConfig from '../../../config';
import * as constants from '../constants';
import axios from 'axios';
import DropzoneComp from './DropzoneComp';

// Import Style
import styles from './inventory.css';

class ShopProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: '',
			viewOrderDetails: false,
			tabIndex: 0,
			shopProduct: null,
			genderSelected: '',
			selectedSize: '',
			selectedCondition: '',
			selectedCategory: '',
			selectedSubCategory: '',
			selectedColor: '',
			selectedBrand: '',
			selectedApproveStatus: false,
			selectedTag: ''
		}
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.props.fetchShopProduct(this.props.params.id);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.shopProduct) {
			this.setState({
				shopProduct: nextProps.shopProduct,
				genderSelected: nextProps.shopProduct.gender,
				selectedSize: nextProps.shopProduct.size,
				selectedCondition: nextProps.shopProduct.condition,
				selectedCategory: nextProps.shopProduct.categories,
				selectedSubCategory: nextProps.shopProduct.subcategories,
				selectedColor: nextProps.shopProduct.color,
				selectedBrand: nextProps.shopProduct.brand,
				selectedApproveStatus: nextProps.shopProduct.approved,
				selectedTag: nextProps.shopProduct.tags
			});
		}
	}

	handleChange(e) {
		let { name, value } = e.target;
		switch (name) {
			case 'name':
				this.state.shopProduct.name = value;
				break;
			case 'description':
				this.state.shopProduct.description = value;
				break;
			case 'originalretailprice':
				this.state.shopProduct.originalretailprice = value;
				break;
			case 'gender':
				this.state.shopProduct.gender = value;
				this.setState({ genderSelected: value });
				break;
			case 'status':
				this.state.shopProduct.status = value;
				break;
			case 'size':
				this.state.shopProduct.size = value;
				this.setState({ selectedSize: value });
				break;
			case 'seller':
				this.state.shopProduct.seller = value;
				break;
			case 'condition':
				this.state.shopProduct.condition = value;
				this.setState({ selectedCondition: value });
				break;
			case 'saleprice':
				this.state.shopProduct.saleprice = value;
				break;
			case 'sequence':
				this.state.shopProduct.sequence = value;
				break;
			case 'color':
				this.state.shopProduct.color = value;
				this.setState({ selectedColor: value });
				break;
			case 'categories':
				this.state.shopProduct.categories = [value];
				this.setState({ selectedCategory: value });
				break;
			case 'subcategories':
				this.state.shopProduct.subcategories = [value];
				this.setState({ selectedSubCategory: value });
				break;
			case 'tags':
				this.state.shopProduct.tags = [value];
				// this.setState({ selectedTag: value });
				break;
			case 'quantity':
				this.state.shopProduct.quantity = value;
				break;
			case 'notes':
				this.state.shopProduct.notes = value;
				break;
			case 'brand':
				this.state.shopProduct.brand = value;
				this.setState({ selectedBrand: value });
				break;
			case 'approved':
				let updateCombo = value == 'true' ? true : false;
				this.state.shopProduct.approved = updateCombo;
				this.setState({ selectedApproveStatus: updateCombo });
				break;
			case 'shippingsize':
				this.state.shopProduct.shippingsize = value;
				break;
		}
	}

	updateShopProductDetails() {
		this.props.updateShopProduct(this.state.shopProduct, this.props.user);
		alert("Product Updated Successfully!!!");
		// browserHistory.goBack();  // if needs to go back to previous screen
	}

	handleUpload(key, val, type) {
		if (this.state.shopProduct.hasOwnProperty(key)) {
			this.state.shopProduct[key] = val;
		}
		this.setState({ shopProduct: Object.assign({ [key]: val }, this.state.shopProduct) });
	}

	createDropzoneElement() {
		let dropzoneList = [];
		for (let i = 1; i < 6; i++) {
			dropzoneList.push(<DropzoneComp title={i < 5 ? `Image ${i}` : 'Video'} type={i < 5 ? 'image' : 'video'} handleUpload={(key, val, type) => this.handleUpload(key, val, type)} />)
		}
		return dropzoneList;
	}

	render() {
		const { shopProduct, selectedCondition, genderSelected, selectedSize, selectedCategory, selectedSubCategory, selectedColor, selectedBrand, selectedApproveStatus, selectedTag } = this.state;
		if (shopProduct) {
			const { sku, name, description, originalretailprice, gender, status, size, seller, condition, saleprice, sequence, color, categories,
				subcategories, tags, quantity, notes, brand, approved, shippingsize, image1, image2, image3, image4, video } = shopProduct;
			return (<div className={styles.productDetailSection}>
				<h1>Inventory Product detail</h1>
				<br />
				<button className={styles.backBtn} onClick={() => browserHistory.goBack()}><i className="login__backicon__a-Exb fa fa-chevron-left" aria-hidden="true" /> Back</button>
				<div className={ styles.shopInventoryContainer }>
				<div className={styles.productDetailField}>
					<h4>Sku: </h4>
					<input type="text" name="sku" className={styles.productDetailFieldWidth} value={sku} disabled={true} />
				</div>
				<div className={styles.productDetailField}>
					<h4>Name: </h4>
					<input type="text" name="name" className={styles.productDetailFieldWidth} defaultValue={name} onChange={this.handleChange} />
				</div>
				<div className={styles.productDetailField}>
					<h4>Brand: </h4>
					<select
						name="brand"
						className={styles.productDetailFieldWidth}
						value={selectedBrand}
						onChange={this.handleChange}
					>
						{constants.brandList.sort((val, nextVal) => val.toLowerCase().localeCompare(nextVal.toLowerCase()))
							.map(item => <option value={item}>{item}</option>)}
					</select>
				</div>
				<div className={styles.productDetailField}>
					<h4>Description: </h4>
					<textarea type="text" name="description" className={styles.productDetailFieldWidth} defaultValue={description} onChange={this.handleChange} />
				</div>
				<div className={styles.productDetailField}>
					<h4>Gender: </h4>
					<div style={{ display: 'flex' }}>
						{
							constants.genderList.map(item => <div className={ styles.genderCol }>
								<input type="radio" value={item} name="gender"
									checked={genderSelected === item}
									onChange={this.handleChange} />{item}
							</div>
							)
						}
					</div>
				</div>
				<div className={styles.productDetailField}>
					<h4>Condition: </h4>
					<select
						name="condition"
						className={styles.productDetailFieldWidth}
						value={selectedCondition}
						onChange={this.handleChange}
					>
						{constants.clothConditionList.sort((val, nextVal) => val.toLowerCase().localeCompare(nextVal.toLowerCase()))
							.map(item => <option value={item}>{item}</option>)}
					</select>
				</div>
				<div className={styles.productDetailField}>
					<h4>Size: </h4>
					<select
						name="size"
						className={styles.productDetailFieldWidth}
						value={selectedSize}
						onChange={this.handleChange}
					>
						{constants.sizeList.sort((val, nextVal) => val.toLowerCase().localeCompare(nextVal.toLowerCase()))
							.map(item => <option value={item}>{item}</option>)}
					</select>
				</div>
				<div className={styles.productDetailField}>
					<h4>Category: </h4>
					<select
						name="categories"
						className={styles.productDetailFieldWidth}
						value={selectedCategory}
						onChange={this.handleChange}
					>
						{constants.clothCategoryList.sort((val, nextVal) => val.toLowerCase().localeCompare(nextVal.toLowerCase()))
							.map(item => <option value={item}>{item}</option>)}
					</select>
				</div>
				<div className={styles.productDetailField}>
					<h4>Sub Category: </h4>
					<select
						name="subcategories"
						className={styles.productDetailFieldWidth}
						value={selectedSubCategory}
						onChange={this.handleChange}
					>
						{constants.clothSubCategoryList.sort((val, nextVal) => val.toLowerCase().localeCompare(nextVal.toLowerCase()))
							.map(item => <option value={item}>{item}</option>)}
					</select>
				</div>
				<div className={styles.productDetailField}>
					<h4>Color: </h4>
					<select
						name="color"
						className={styles.productDetailFieldWidth}
						value={selectedColor}
						onChange={this.handleChange}
					>
						{constants.colorList.sort((val, nextVal) => val.toLowerCase().localeCompare(nextVal.toLowerCase()))
							.map(item => <option value={item}>{item}</option>)}
					</select>
				</div>
				<div className={styles.productDetailField}>
					<h4>Tags: </h4>
					<input type="text" name="tags" className={styles.productDetailFieldWidth} defaultValue={tags} onChange={this.handleChange} />
					{/* <select
						name="tags"
						className={styles.productDetailFieldWidth}
						value={selectedTag}
						onChange={this.handleChange}
					>
						{constants.tagsList.sort((val, nextVal) => val.toLowerCase().localeCompare(nextVal.toLowerCase()))
							.map(item => <option value={item}>{item}</option>)}
					</select> */}
				</div>
				<div className={styles.productDetailField}>
					<h4>Retail Price: </h4>
					<input type="number" name="originalretailprice" className={styles.productDetailFieldWidth} defaultValue={originalretailprice} onChange={this.handleChange} />
				</div>
				<div className={styles.productDetailField}>
					<h4>Sale Price: </h4>
					<input type="number" name="saleprice" className={styles.productDetailFieldWidth} defaultValue={saleprice} onChange={this.handleChange} />
				</div>
				<div className={styles.productDetailField}>
					<h4>Quantity: </h4>
					<input type="number" name="quantity" className={styles.productDetailFieldWidth} defaultValue={quantity} onChange={this.handleChange} />
				</div>
				<div className={styles.productDetailField}>
					<h4>Status: </h4>
					<input type="text" name="status" className={styles.productDetailFieldWidth} defaultValue={status} onChange={this.handleChange} />
				</div>
				<div className={styles.productDetailField}>
					<h4>Sequence: </h4>
					<input type="number" name="sequence" className={styles.productDetailFieldWidth} defaultValue={sequence} onChange={this.handleChange} />
				</div>
				<div className={styles.productDetailField}>
					<h4>Shipping Size: </h4>
					<input type="number" name="shippingsize" className={styles.productDetailFieldWidth} defaultValue={shippingsize} onChange={this.handleChange} />
				</div>
				<div className={styles.productDetailField}>
					<h4>Seller: </h4>
					<input type="text" name="seller" className={styles.productDetailFieldWidth} defaultValue={seller} onChange={this.handleChange} />
				</div>
				<div className={styles.productDetailField}>
					<h4>Notes: </h4>
					<textarea type="text" name="notes" className={styles.productDetailFieldWidth} defaultValue={notes} onChange={this.handleChange} />
				</div>
				<div className={styles.productDetailField}>
					<h4>Approve: </h4>
					<select
						name="approved"
						className={styles.productDetailFieldWidth}
						value={selectedApproveStatus}
						onChange={this.handleChange}
					>
						{constants.approvalStatus.map((item, key) => <option key={key} value={item.key}>{item.value}</option>)};
					</select>
				</div>
				<div className={styles.productDetailImages}>
					<h4>Images/Video: </h4>
					{image1 && typeof (image1) != 'object' && <img id='image1' className={styles.productDetailImg} src={`${image1}`} />}
					{image2 && typeof (image2) != 'object' && <img id='image2' className={styles.productDetailImg} src={`${image2}`} />}
					{image3 && typeof (image3) != 'object' && <img id='image3' className={styles.productDetailImg} src={`${image3}`} />}
					{image4 && typeof (image4) != 'object' && <img id='image4' className={styles.productDetailImg} src={`${image4}`} />}
					<br />
					{
						video && typeof (video) != 'object' && <video id='video' className={styles.productDetailVideo} src={`${video}`} controls type="video/mp4" />
					}
				</div>
				<div className={ styles.dropzoneContainer }>
					{this.createDropzoneElement()}
				</div>
				<button className={styles.productDetailBtn} onClick={this.updateShopProductDetails.bind(this)}>Update Product</button>
				</div>
			</div>)
		}
		else {
			return null;
		}
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchShopProduct,
		updateShopProduct,
		updateProductImage
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		user: state.auth.email,
		shopProduct: state.shopProduct
	};
}

export default connect(mapStateToProps, matchDispatchToProps)(ShopProduct);