import moment from 'moment';
import React from 'react';

const clientConfig = {
  serviceCities: [{
    city: 'Delhi',
    state: 'Delhi',
  }, {
    city: 'Mumbai',
    state: 'Maharashtra',
  }, {
    city: 'Chandigarh',
    state: 'Chandigarh',
  }, {
    city: 'Ludhiana',
    state: 'Punjab',
  }, {
    city: 'Gurgaon',
    state: 'Haryana',
  }, {
    city: 'Noida',
    state: 'Uttar Pradesh',
  }, {
    city: 'Faridabad',
    state: 'Haryana',
  }, {
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
  }, {
    city: 'Bangalore',
    state: 'Karnataka',
  }, {
    city: 'Hyderabad',
    state: 'Andhra Pradesh',
  }, {
    city: 'Kolkata',
    state: 'West Bengal',
  }, {
    city: 'Pune',
    state: 'Maharashtra',
  }, {
    city: 'Jaipur',
    state: 'Rajasthan',
  }, {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
  }, {
    city: 'Ahmedabad',
    state: 'Gujrat',
  }, {
    city: 'Nagpur',
    state: 'Maharashtra',
  }, {
    city: 'Indore',
    state: 'Madhya Pradesh',
  }, {
    city: 'Surat',
    state: 'Gujrat',
  }, {
    city: 'Dehradun',
    state: 'Uttarakhand',
  }, {
    city: 'Chennai',
    state: 'TamilNadu',
  }],
  cancelReasons: [
    'customer not interested',
    'orderverification failure',
    'customer denied accepting order',
    'customer not available',
    'measurements cant be altered',
    'outfit altered customer measurements wrong',
    'booked outfit for another date',
    'booked another outfit',
    'did not provide measurements',
    'event cancelled',
    'outfit disabled',
    'defect in outfit',
    'measurements didn’t fit',
    'outfit now looking old',
  ],
  targetURL: 'https://staging.stage3.co',
  paymentMethods: [
    'bank deposit',
    'Bluedart COD',
    'cheque',
    'COD',
    'FREE',
    'ICICI',
    'payu',
    'payumoney',
    'razorpay',
    'Mswipe',
    'ezetap',
    'advance cash paid'
  ],
  deliveryColumns: [{
    Header: 'Order Id',
    accessor: 'parentOrder.frontendOrderId',
  }, {
    Header: 'Email Id',
    accessor: 'profile.email',
  }, {
    id: 'name',
    Header: 'Name',
    accessor: o => o.profile.firstName + ' ' + o.profile.lastName,
  }, {
    Header: 'Phone',
    accessor: 'profile.phoneNumber',
  }, {
    Header: 'Address',
    accessor: 'deliveryAddress.address',
  }, {
    Header: 'City',
    accessor: 'deliveryAddress.city',
  }, {
    Header: 'State',
    accessor: 'deliveryAddress.state',
  }, {
    Header: 'Pincode',
    accessor: 'deliveryAddress.pincode',
  }, {
    Header: 'Product Name',
    accessor: 'product.name',
  }, {
    Header: 'Look No.',
    accessor: 'product.lookNumber',
  }, {
    id: 'gender',
    Header: 'Gender',
    accessor: o => o.product.url ? o.product.url.split('/')[0] : '',
  }, {
    Header: 'SKU',
    accessor: 'product.sku',
  }, {
    Header: 'Designer',
    accessor: 'product.designer',
  }, {
    Header: 'Measurements',
    accessor: 'measurementStatus',
  }, {
    id: 'orderDate',
    Header: 'Order Date',
    accessor: o => moment(o.parentOrder.orderDate).format('lll'),
  }, {
    id: 'deliveryDate',
    Header: 'Delivery Date',
    accessor: o => moment(o.deliveryDateUTC).format('DD-MM-YYYY'),
  }, {
    id: 'occasionDate',
    Header: 'Occasion Date',
    accessor: o => moment(o.occasionDateUTC).format('DD-MM-YYYY'),
  }, {
    id: 'pickupDate',
    Header: 'Pickup Date',
    accessor: o => moment(o.pickupDateUTC).format('DD-MM-YYYY'),
  }, {
    id: 'grossAmount',
    Header: 'Gross Amount',
    accessor: o => o.originalPrice + o.originalDeposit,
  }, {
    id: 'discount',
    Header: 'Discount',
    accessor: o => o.originalPrice - o.price,
  }, {
    id: 'netAmount',
    Header: 'Net Amount',
    accessor: o => o.price + o.deposit,
  }, {
    Header: 'Rental',
    accessor: 'price',
  }, {
    Header: 'Deposit',
    accessor: 'deposit',
  }, {
    Header: 'Deposit',
    accessor: 'deposit',
  }, {
    id: 'loss',
    Header: 'Loss',
    accessor: o => o.price - o.invoicePrice,
  }, {
    Header: 'Status',
    accessor: 'currentStatus',
  }, {
    Header: 'Payment Type',
    accessor: 'parentOrder.paymentType',
  }, {
    Header: 'Discount Coupon',
    accessor: 'parentOrder.discountCoupon',
  }, {
    id: 'source',
    Header: 'Source',
    accessor: o => o.orderType.split('_')[1]
  }],
  rentalColumns: [{
    Header: 'Order Id',
    accessor: 'frontendOrderId',
  }, {
    Header: 'User Id',
    accessor: 'userId',
  }, {
    id: 'dateOrder',
    Header: 'Date Of Order',
    accessor: o => moment(o.orderDate).format('lll'),
  }, {
    Header: 'Status',
    accessor: 'status',
  }],
  shopColumns: [{
    Header: 'Order Id',
    accessor: 'frontendOrderId',
  }, {
    Header: 'User Id',
    accessor: 'userId',
  }, {
    id: 'dateOrder',
    Header: 'Date Of Order',
    accessor: o => moment(o.orderDate).format('lll'),
  }, {
    Header: 'Status',
    accessor: 'status',
  }],
  orderSource: [
    'store-hkv',
    'store-rjg',
    'office',
    'phone',
    'whatsapp',
    'sheet',
  ],
  customerSource: [
    'store-hkv',
    'store-rjg',
    'office',
    'phone',
    'whatsapp',
  ],
  shopLooksColumns: [{
    Header: 'SKU',
    accessor: 'sku',
  }, {
    Header: 'Name',
    accessor: 'name',
  }, {
    id: 'image',
    Header: 'Image',
    accessor: o => <a target="blank" href={o.frontimage}>Link</a>,
  }, {
    Header: 'Location',
    accessor: 'location',
  }],
  rentLooksColumns: [{
    Header: 'Look No.',
    accessor: 'looknumber',
  }, {
    Header: 'SKU',
    accessor: 'sku',
  }, {
    Header: 'Name',
    accessor: 'name',
  }, {
    Header: 'Owner',
    accessor: 'owner',
  }, {
    id: 'image',
    Header: 'Image',
    accessor: o => <a target="blank" href={o.frontimage}>Link</a>,
  }, {
    Header: 'Location',
    accessor: 'location',
  }],
  rentAccessoriesColumns: [{
    Header: 'SKU',
    accessor: 'sku',
  }, {
    Header: 'Name',
    accessor: 'name',
  }, {
    id: 'image',
    Header: 'Image',
    accessor: o => <a target="blank" href={o.image}>Link</a>,
  }, {
    Header: 'Location',
    accessor: 'location',
  }],
  designerInventoryColumns: [{
    Header: 'Name',
    accessor: 'name',
  }, {
    id: '3day',
    Header: '3 Days Rental',
    accessor: o => Math.round(o.discountedrentalprice * 3),
  }, {
    id: '6day',
    Header: '6 Days Rental',
    accessor: o => Math.round(o.discountedrentalprice * 4.2),
  }],
  ownersColumns: [{
    Header: 'Name',
    accessor: 'ownername',
  }, {
    id: 'Revenue Share',
    Header: 'Revenue Share (%)',
    accessor: 'revenueshare',
  }, {
    id: 'Gst',
    Header: 'GST',
    accessor: o => {
      if (o.gst == false) {
        return 'No'
      } else {
        return 'Yes'
      }
    }
  }],
  designerOrderColumns: [{
    Header: 'Order Id',
    accessor: 'orderId'
  }, {
    id: 'name',
    Header: 'Name',
    accessor: o => <a target="blank" href={o.image}>
      {o.outfitname}
    </a>
  }, {
    id: 'orderDate',
    Header: 'Order Date',
    accessor: o => moment(o.orderDate).format("lll")
  }, {
    id: 'pickupDate',
    Header: 'Service Date',
    accessor: o => moment(o.pickupDateUTC).format("lll")
  }, {
    id: 'rent',
    Header: 'Rent',
    accessor: o => o.rentPaid
  }, {
    id: 'share',
    Header: 'Share',
    accessor: o => {
      if (o.rentPaid > 999) {
        return ((o.rentPaid * (o.share / 100)) / 1.12).toFixed(2);
      } else {
        return ((o.rentPaid * (o.share / 100)) / 1.05).toFixed(2);
      }
    }
  }, {
    id: 'gst',
    Header: 'GST',
    accessor: o => {
      if (o.rentPaid > 999) {
        return (((o.rentPaid * (o.share / 100)) / 1.12) > 999 ? ((o.rentPaid * (o.share / 100)) / 1.12) * 0.12 : ((o.rentPaid * (o.share / 100)) / 1.12) * 0.05).toFixed(2);
      } else {
        return (((o.rentPaid * (o.share / 100)) / 1.05) > 999 ? ((o.rentPaid * (o.share / 100)) / 1.05) * 0.12 : ((o.rentPaid * (o.share / 100)) / 1.05) * 0.05).toFixed(2);
      }
    }
  }],
  cloudinaryURL: 'https://api.cloudinary.com/v1_1/stage3/image/upload',
  cloudinarySecret: 'vTv6e1DZArggBN4v_uj7UdDBwaU',
  cloudinaryKey: '788223477814326',
  instagramFeedColumns: [{
    Header: 'Title',
    accessor: 'title'
  }, {
    Header: 'URL',
    accessor: 'url'
  }, {
    Header: 'Type',
    accessor: 'type',
  }, {
    id: 'image',
    Header: 'Image',
    accessor: o => {
      return <a target="blank" href={o.image}>
        Link
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 </a>;
    }
  }, {
    id: 'date',
    Header: 'Created',
    accessor: o => {
      return moment(o.createdTimestamp * 1000).format("lll");
    }
  }],
  measurements: [
    'chest',
    'bicep',
    'underBust',
    'mainWaist',
    'lowWaist',
    'hip',
    'shoulder',
    'thigh',
    'trouserLength',
    'stomach',
    'crotch',
    'neck',
    'inseem',
    'sleeves'
  ],
  shopStockColumns: [{
    Header: 'SKU',
    accessor: 'sku',
  }, {
    Header: 'Name',
    accessor: 'product.name',
  }, {
    Header: 'Status',
    accessor: 'product.status',
  }, {
    Header: 'Quantity',
    accessor: 'product.quantity',
  }, {
    Header: 'Available',
    accessor: 'numberOfQuantitesAvailable',
  }, {
    Header: 'Ordered',
    accessor: 'numberOfOrdersPlaced',
  }, {
    Header: 'Cancelled',
    accessor: 'numberOfOrdersCancelled',
  }, {
    id: 'sold',
    Header: 'Sold',
    accessor: o => {
      return o.numberOfOrdersPlaced - o.numberOfOrdersCancelled;
    }
  }]
}


export default clientConfig;