import moment from 'moment';
import React from 'react';

// Import Style
import styles from 'modules/Scan/components/scan.css';

const clientConfig = {
  daysBeforeDeliveryOrPickup: 10,
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
    city: 'Jodhpur',
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
    state: 'Tamil Nadu',
  }, {
    city: 'Goa',
    state: 'Goa',
  }, {
    city: 'Other',
    state: 'Other',
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
    'medical emergency',
    'did not like the outfit',
    'chose another service'
  ],
  rentProductStatus: { 'enable': 'Active', 'temporary-disable': 'Temporary Disable', 'permanent-disable': 'Permanent Disable' },
  scanLocations: { 'store-sdn': 'Sadhna Store', 'warehouse-sdn': 'Sadhna Warehouse', 'store-hkv': 'Hauz Khas Store', 'store-scw': 'City Walk Store', 'office': 'Office', 'customer': 'Customer', 'dc': 'Dry Cleaning', 'popup': 'Pop-Up', 'warehouse-nfc': 'NFC Warehouse', 'bus': 'Bus' },
  scanReasons: ['item received', 'send to sadhna warehouse', 'send to sadhna store', 'send to hkv', 'send to nfc', 'send to city walk', 'send to office', 'send to customer', 'send to dc', 'send to popup', 'send to bus', 'reconcile'],
  targetURL: 'https://staging.stage3.co',
  paymentMethods: [
    'bank deposit',
    'PAYU',
    'cheque',
    'COD',
    'FREE',
    'razorpay',
    'advance cash paid',
    'rent paid COD',
    '10 percent rent paid online',
    '10 percent rent paid COD',
    'Paytm',
    'Rent Paid Paytm',
    'Rent Paid Razorpay',
    'Security Paid Razorpay',
    'Security Paid Paytm',
    'Pine Labs',
    'Rent Paid Pine Labs',
    'Security Paid Pine Labs',
  ],
  rentDeliveryColumns: [{
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
    Header: 'Owner',
    accessor: 'product.owner',
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
    accessor: o => o.orderType.split('_')[1],
  }, {
    id: 'quality',
    Header: 'Quality',
    accessor: 'qcStatus'
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
  orderProcessColumns: [{
    id: 'Order Id',
    Header: 'Order Id',
    accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
  }, {
    Header: 'Active',
    accessor: 'orderlineProcess.active',
  }, {
    Header: 'Damaged Amount',
    accessor: 'orderlineProcess.calulatedDamageAmount',
  }, {
    Header: 'Damage Reason',
    accessor: 'orderlineProcess.damageReason',
  }, {
    id: 'Delivered EndTime',
    Header: 'Delivered EndTime',
    accessor: o => o.orderlineProcess && o.orderlineProcess.delivered && o.orderlineProcess.delivered.endTime ? moment(o.orderlineProcess.delivered.endTime).format('lll') : '',
  }, {
    id: 'Delivered Expected EndTime',
    Header: 'Delivered Expected EndTime',
    accessor: o => o.orderlineProcess && o.orderlineProcess.delivered && o.orderlineProcess.delivered.expectedEndTime ? moment(o.orderlineProcess.delivered.expectedEndTime).format('lll') : '',
  }, {
    Header: 'Delivered Resolved By',
    accessor: 'orderlineProcess.delivered.resolvedBy',
  }, {
    Header: 'Delivered Status',
    accessor: 'orderlineProcess.delivered.status',
  }, {
    Header: 'Delivery AWB No',
    accessor: 'orderlineProcess.deliverylogisticResourceInfo.awbNo',
  }, {
    id: 'deliveryLink',
    Header: 'Delivery link',
    accessor: o => o.orderlineProcess && o.orderlineProcess.deliverylogisticResourceInfo && o.orderlineProcess.deliverylogisticResourceInfo.link ? <a href={o.orderlineProcess.deliverylogisticResourceInfo.link} target="blank">Link</a> : 'N/A',
  }, {
    id: 'Delivery Message',
    Header: 'Delivery Message',
    accessor: o => o.orderlineProcess && o.orderlineProcess.deliverylogisticResourceInfo && o.orderlineProcess.deliverylogisticResourceInfo.message ? JSON.parse(o.orderlineProcess.deliverylogisticResourceInfo.message).WayBillGenerationStatus.StatusInformation : '',
  }, {
    Header: 'Delivery Runner Contact',
    accessor: 'orderlineProcess.deliverylogisticResourceInfo.runnerContact',
  }, {
    Header: 'Delivery Runner Id',
    accessor: 'orderlineProcess.deliverylogisticResourceInfo.runnerId',
  }, {
    Header: 'Delivery Runner Name',
    accessor: 'orderlineProcess.deliverylogisticResourceInfo.runnerName',
  }, {
    id: 'dispatched.endTime',
    Header: 'Dispatched End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.dispatched && o.orderlineProcess.dispatched.endTime ? moment(o.orderlineProcess.dispatched.endTime).format('lll') : ''
  }, {
    id: 'Dispatched Expected End Time',
    Header: 'Dispatched Expected End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.dispatched && o.orderlineProcess.dispatched.expectedEndTime ? moment(o.orderlineProcess.dispatched.expectedEndTime).format('lll') : '',
  }, {
    Header: 'Dispatched Resolved By',
    accessor: 'orderlineProcess.dispatched.resolvedBy',
  }, {
    Header: 'Dispatched Status',
    accessor: 'orderlineProcess.dispatched.status',
  }, {
    id: 'Next Action SLA',
    Header: 'Next Action SLA',
    accessor: o => o.orderlineProcess && o.orderlineProcess.nextActionSla ? moment(o.orderlineProcess.nextActionSla).format('lll') : '',
  }, {
    Header: 'OutForDelivery End Time',
    accessor: 'orderlineProcess.outForDelivery.endTime',
  }, {
    id: 'OutForDelivery Expected End Time ',
    Header: 'OutForDelivery Expected End Time ',
    accessor: o => o.orderlineProcess && o.orderlineProcess.outForDelivery && o.orderlineProcess.outForDelivery.expectedEndTime ? moment(o.orderlineProcess.outForDelivery.expectedEndTime).format('lll') : '',
  }, {
    Header: 'OutForDelivery Resolved By',
    accessor: 'orderlineProcess.outForDelivery.resolvedBy',
  }, {
    Header: 'OutForDelivery Status',
    accessor: 'orderlineProcess.outForDelivery.status',
  }, {
    id: 'Out For Pickup End Time',
    Header: 'Out For Pickup End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.outForPickup && o.orderlineProcess.outForPickup.endTime ? moment(o.orderlineProcess.outForPickup.endTime).format('lll') : '',
  }, {
    id: 'Out For Pickup Expected End Time',
    Header: 'Out For Pickup Expected End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.outForPickup && o.orderlineProcess.outForPickup.expectedEndTime ? moment(o.orderlineProcess.outForPickup.expectedEndTime).format('lll') : '',
  }, {
    Header: 'Out For Pickup Resolved By',
    accessor: 'orderlineProcess.outForPickup.resolvedBy',
  }, {
    Header: 'Out For Pickup Status',
    accessor: 'orderlineProcess.outForPickup.status',
  }, {
    Header: 'OutStation',
    accessor: 'orderlineProcess.outstation',
  }, {
    id: 'Picked End Time',
    Header: 'Picked End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.picked && o.orderlineProcess.picked.endTime ? moment(o.orderlineProcess.picked.endTime).format('lll') : '',
  }, {
    id: 'Picked Expected End Time',
    Header: 'Picked Expected End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.picked && o.orderlineProcess.picked.expectedEndTime ? moment(o.orderlineProcess.picked.expectedEndTime).format('lll') : '',
  }, {
    Header: 'Picked Resolved By',
    accessor: 'orderlineProcess.picked.resolvedBy',
  }, {
    Header: 'Picked Status',
    accessor: 'orderlineProcess.picked.status',
  }, {
    Header: 'Pickup Active',
    accessor: 'orderlineProcess.pickupActive',
  }, {
    id: 'Pickup Logistic End Time',
    Header: 'Pickup Logistic End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.pickupLogisticResourceAssigned && o.orderlineProcess.pickupLogisticResourceAssigned.endTime ? moment(o.orderlineProcess.pickupLogisticResourceAssigned.endTime).format('lll') : '',
  }, {
    id: 'Pickup Logistic Expected End Time',
    Header: 'Pickup Logistic Expected End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.pickupLogisticResourceAssigned && o.orderlineProcess.pickupLogisticResourceAssigned.expectedEndTime ? moment(o.orderlineProcess.pickupLogisticResourceAssigned.expectedEndTime).format('lll') : '',
  }, {
    Header: 'Pickup Logistic Resolved By',
    accessor: 'orderlineProcess.pickupLogisticResourceAssigned.resolvedBy',
  }, {
    Header: 'Pickup Logistic Status',
    accessor: 'orderlineProcess.pickupLogisticResourceAssigned.status',
  }, {
    Header: 'Pickup Logistic AWB No',
    accessor: 'orderlineProcess.pickuplogisticResourceInfo.awbNo',
  }, {
    Header: 'Pickup Logistic Link',
    accessor: 'orderlineProcess.pickuplogisticResourceInfo.link',
  }, {
    Header: 'Pickup Logistic Message',
    accessor: 'orderlineProcess.pickuplogisticResourceInfo.message',
  }, {
    Header: 'Pickup Logistic Runner Contact',
    accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerContact',
  }, {
    Header: 'Pickup Logistic Runner Id',
    accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerId',
  }, {
    Header: 'Pickup Logistic Runner Name',
    accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerName',
  }, {
    id: 'QC3 End Time',
    Header: 'QC3 End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.qc3 && o.orderlineProcess.qc3.endTime ? moment(o.orderlineProcess.qc3.endTime).format('lll') : '',
  }, {
    id: 'QC3 Expected End Time',
    Header: 'QC3 Expected End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.qc3 && o.orderlineProcess.qc3.expectedEndTime ? moment(o.orderlineProcess.qc3.expectedEndTime).format('lll') : '',
  }, {
    Header: 'QC3 Resolved By',
    accessor: 'orderlineProcess.qc3.resolvedBy',
  }, {
    Header: 'QC3 Status',
    accessor: 'orderlineProcess.qc3.status',
  }, {
    Header: 'QC3 Result Failure reason',
    accessor: 'orderlineProcess.qc3Result.failReason',
  }, {
    Header: 'QC3 Result Passed',
    accessor: 'orderlineProcess.qc3Result.pass',
  }, {
    Header: 'QC3 Result Remarks ',
    accessor: 'orderlineProcess.qc3Result.remarks',
  }, {
    id: 'Received End Time',
    Header: 'Received End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.received && o.orderlineProcess.received.endTime ? moment(o.orderlineProcess.received.endTime).format('lll') : '',
  }, {
    id: 'Received Expected End Time',
    Header: 'Received Expected End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.received && o.orderlineProcess.received.expectedEndTime ? moment(o.orderlineProcess.received.expectedEndTime).format('lll') : '',
  }, {
    Header: 'Received Resolved By',
    accessor: 'orderlineProcess.received.resolvedBy',
  }, {
    Header: 'Received Status',
    accessor: 'orderlineProcess.received.status',
  }, {
    Header: 'Refund Amount',
    accessor: 'orderlineProcess.refundAmount',
  }, {
    id: 'Refund Approved End Time',
    Header: 'Refund Approved End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.refundApproved && o.orderlineProcess.refundApproved.endTime ? moment(o.orderlineProcess.refundApproved.endTime).format('lll') : '',
  }, {
    id: 'Refund Approved Expected End Time',
    Header: 'Refund Approved Expected End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.refundApproved && o.orderlineProcess.refundApproved.expectedEndTime ? moment(o.orderlineProcess.refundApproved.expectedEndTime).format('lll') : '',
  }, {
    Header: 'Refund Approved Resolved By',
    accessor: 'orderlineProcess.refundApproved.resolvedBy',
  }, {
    Header: 'Refund Approved Status',
    accessor: 'orderlineProcess.refundApproved.status',
  }, {
    id: 'Refund Calculation End Time',
    Header: 'Refund Calculation End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.refundCalculated && o.orderlineProcess.refundCalculated.endTime ? moment(o.orderlineProcess.refundCalculated.endTime).format('lll') : '',
  }, {
    id: 'Refund Calculation Expected End Time',
    Header: 'Refund Calculation Expected End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.refundCalculated && o.orderlineProcess.refundCalculated.expectedEndTime ? moment(o.orderlineProcess.refundCalculated.expectedEndTime).format('lll') : '',
  }, {
    Header: 'Refund Calculation Resolved By',
    accessor: 'orderlineProcess.refundCalculated.resolvedBy',
  }, {
    Header: 'Refund Calculation Status',
    accessor: 'orderlineProcess.refundCalculated.status',
  }, {
    Header: 'Refund Reason ',
    accessor: 'orderlineProcess.refundReason',
  }, {
    Header: 'Status',
    accessor: 'orderlineProcess.status',
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
    Header: 'Owner',
    accessor: 'product.owner',
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
    accessor: o => o.orderType.split('_')[1],
  }, {
    id: 'quality',
    Header: 'Quality',
    accessor: 'qcStatus'
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
  shopDeliveryColumns: [{
    Header: 'Order Id',
    accessor: 'parentOrder.frontendOrderId',
  }, {
    Header: 'Email Id',
    accessor: 'user.email',
  }, {
    id: 'name',
    Header: 'Name',
    accessor: o => o.user.firstName + ' ' + o.user.lastName,
  }, {
    Header: 'Phone',
    accessor: 'user.phoneNumber',
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
    Header: 'SKU',
    accessor: 'product.sku',
  }, {
    Header: 'Designer',
    accessor: 'product.designer',
  }, {
    id: 'orderDate',
    Header: 'Order Date',
    accessor: o => moment(o.parentOrder.orderDate).format('lll'),
  }, {
    Header: 'Discounted Price',
    accessor: 'discountedPrice',
  }, {
    Header: 'Original Price',
    accessor: 'originalPrice',
  }, {
    Header: 'Status',
    accessor: 'status',
  }, {
    Header: 'Payment Type',
    accessor: 'parentOrder.paymentType',
  }, {
    Header: 'Discount Coupon',
    accessor: 'parentOrder.discountCoupon',
  }, {
    Header: 'Source',
    accessor: 'source',
  }, {
    id: 'cod charges',
    Header: 'COD Charges',
    accessor: 'additionalCharges',
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
  }, {
    Header: 'Source',
    accessor: 'source',
  }],
  orderSource: [
    'store-hkv',
    'store-scw',
    'store-sdn',
    'office',
    'phone',
    'whatsapp',
    'sheet',
  ],
  customerSource: [
    'store-hkv',
    'store-scw',
    'store-sdn',
    'office',
    'phone',
    'whatsapp',
  ],
  shopLooksColumns: [{
    Header: 'SKU',
    accessor: 'sku',
    filterable: false,
    sortable: false
  }, {
    id: 'image1',
    Header: 'Image 1',
    accessor: o => o.image1 ? <a target="blank" href={o.image1}>Link</a> : '-',
    filterable: false,
    sortable: false
  }, {
    id: 'image2',
    Header: 'Image 2',
    accessor: o => o.image2 ? <a target="blank" href={o.image2}>Link</a> : '-',
    filterable: false,
    sortable: false
  }, {
    id: 'image3',
    Header: 'Image 3',
    accessor: o => o.image3 ? <a target="blank" href={o.image3}>Link</a> : '-',
    filterable: false,
    sortable: false
  }, {
    id: 'image4',
    Header: 'Image 4',
    accessor: o => o.image4 ? <a target="blank" href={o.image4}>Link</a> : '-',
    filterable: false,
    sortable: false
  }, {
    id: 'video',
    Header: 'Video',
    accessor: o => o.video ? <a target="blank" href={o.video}>Link</a> : '-',
    filterable: false,
    sortable: false
  }, {
    Header: 'Name',
    accessor: 'name',
    filterable: false,
    sortable: false
  }, {
    Header: 'Description',
    accessor: 'description',
    filterable: false,
    sortable: false
  }, {
    Header: 'Gender',
    accessor: 'gender',
    filterable: false,
    sortable: false
  }, {
    Header: 'Price',
    accessor: 'saleprice',
    filterable: false,
    sortable: false,
    width: 180
  }, {
    Header: ' Original Price',
    accessor: 'originalretailprice',
    filterable: false,
    sortable: false
  }, {
    Header: 'Status',
    accessor: 'status',
    filterable: false,
    sortable: false
  }, {
    Header: 'Size',
    accessor: 'size',
    filterable: false,
    sortable: false
  }, {
    Header: 'Condition',
    accessor: 'condition',
    filterable: false,
    sortable: false
  }, {
    Header: 'Color',
    accessor: 'color',
    filterable: false,
    sortable: false
  }, {
    Header: 'Category',
    accessor: 'categories',
    filterable: false,
    sortable: false
  }, {
    Header: 'Sub Category',
    accessor: 'subcategories',
    filterable: false,
    sortable: false
  }, {
    Header: 'Sequence',
    accessor: 'sequence',
    filterable: false,
    sortable: false
  }, {
    Header: 'Seller',
    accessor: 'seller',
    filterable: false,
    sortable: false
  }, {
    Header: 'Tags',
    accessor: 'tags',
    filterable: false,
    sortable: false
  }, {
    Header: 'Quantity',
    accessor: 'quantity',
    filterable: false,
    sortable: false
  }, {
    Header: 'Brand',
    accessor: 'brand',
    filterable: false,
    sortable: false
  }, {
    Header: 'Shipping Size',
    accessor: 'shippingsize',
    filterable: false,
    sortable: false
  }, {
    Header: 'Uploaded Time',
    id: 'uploadtime',
    filterable: false,
    sortable: false,
    accessor: o => moment(o.uploadtime).format('lll'),
    width: 180
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
    id: 'status',
    Header: 'Status',
    accessor: o => {
      if (o.status == false) {
        return 'false';
      } else {
        return 'true';
      }
    },
  }, {
    id: 'returned',
    Header: 'Returned',
    accessor: o => {
      if (o.returned == false) {
        return 'false';
      } else {
        return 'true';
      }
    },
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
  }, {
    id: 'returned',
    Header: 'Returned',
    accessor: o => {
      if (o.returned == false) {
        return 'No';
      } else {
        return 'Yes';
      }
    }
  }, {
    id: 'image',
    Header: 'Image',
    accessor: o => <a target="blank" href={o.frontimage}>Link</a>,
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
        return 'No';
      } else {
        return 'Yes';
      }
    },
  }],
  designerOrderColumns: [{
    Header: 'Order Id',
    accessor: 'orderId',
  }, {
    id: 'name',
    Header: 'Name',
    accessor: o => <a target="blank" href={o.image}>
      {o.outfitname}
    </a>,
  }, {
    id: 'orderDate',
    Header: 'Order Date',
    accessor: o => moment(o.orderDate).format('lll'),
  }, {
    id: 'pickupDate',
    Header: 'Service Date',
    accessor: o => moment(o.pickupDateUTC).format('lll'),
  }, {
    id: 'rent',
    Header: 'Rent',
    accessor: o => o.rentPaid,
  }, {
    id: 'share',
    Header: 'Share',
    accessor: o => {
      if (o.rentPaid > 1050) {
        return ((o.rentPaid * (o.share / 100)) / 1.12).toFixed(2);
      } else {
        return ((o.rentPaid * (o.share / 100)) / 1.05).toFixed(2);
      }
    },
  }, {
    id: 'gst',
    Header: 'GST',
    accessor: o => {
      if (o.rentPaid > 1050) {
        return (((o.rentPaid * (o.share / 100)) / 1.12) > 1050 ? ((o.rentPaid * (o.share / 100)) / 1.12) * 0.12 : ((o.rentPaid * (o.share / 100)) / 1.12) * 0.05).toFixed(2);
      } else {
        return (((o.rentPaid * (o.share / 100)) / 1.05) > 1050 ? ((o.rentPaid * (o.share / 100)) / 1.05) * 0.12 : ((o.rentPaid * (o.share / 100)) / 1.05) * 0.05).toFixed(2);
      }
    },
  }],
  cloudinaryURL: 'https://api.cloudinary.com/v1_1/stage3/image/upload',
  cloudinarySecret: 'vTv6e1DZArggBN4v_uj7UdDBwaU',
  cloudinaryKey: '788223477814326',
  instagramFeedColumns: [{
    Header: 'Title',
    accessor: 'title',
  }, {
    Header: 'URL',
    accessor: 'url',
  }, {
    Header: 'Type',
    accessor: 'type',
  }, {
    id: 'image',
    Header: 'Image',
    accessor: o => {
      return <a target="blank" href={o.image}>Link</a>;
    },
  }, {
    id: 'date',
    Header: 'Created',
    accessor: o => {
      return moment(o.createdTimestamp * 1000).format('lll');
    },
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
    'sleeves',
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
    },
  }],
  rentalCouponColumns: [{
    Header: 'Name',
    accessor: 'couponText',
  }, {
    Header: 'Type',
    accessor: 'type',
  }, {
    id: 'configs',
    Header: 'Description',
    accessor: o => {
      return Object.keys(o.configs).map((config) => {
        return ' ' + config + ': ' + o.configs[config];
      }).join(',');
    },
  }, {
    id: 'created',
    Header: 'Created',
    accessor: o => {
      return moment(o.creationTime).format('lll');
    },
  }, {
    id: 'validity',
    Header: 'Validity',
    accessor: o => {
      return moment(o.dateTillValidMillisUTC).format('lll');
    },
  }, {
    id: 'isAdvertized',
    Header: 'Advertized',
    accessor: o => { return o.isAdvertized ? 'Yes' : 'No'; },
  }, {
    id: 'isDeleted',
    Header: 'Deleted',
    accessor: o => { return o.isDeleted ? 'Yes' : 'No'; },
  }, {
    id: 'isReusable',
    Header: 'Reusable',
    accessor: o => { return o.isReusable ? 'Yes' : 'No'; },
  }],
  taskColumns: [{
    id: 'name',
    Header: 'Name',
    accessor: o => {
      if (o.profile) {
        return o.profile.firstName + ' ' + o.profile.lastName;
      } else {
        if (o.name) {
          return o.name;
        } else {
          return 'Not Provided';
        }
      }
    },
  }, {
    Header: 'Phone',
    accessor: 'phoneNumber',
  }, {
    Header: 'Context',
    accessor: 'primaryCallbackContext',
  }],
  contextColumns: [{
    Header: 'Label',
    accessor: 'actionLabel',
  }, {
    Header: 'Score',
    accessor: 'priorityScore',
  }, {
    Header: 'Level',
    accessor: 'priorityLevel',
  }, {
    Header: 'Resolution Time (sec)',
    accessor: 'slaSeconds',
  }, {
    Header: 'Description',
    accessor: 'description',
  }, {
    id: 'deleted',
    Header: 'Deleted',
    accessor: o => {
      return o.deleted ? 'Yes' : 'No';
    },
  }],
  dispositionColumns: [{
    Header: 'Label',
    accessor: 'label',
  }, {
    Header: 'Score',
    accessor: 'priorityScore',
  }, {
    id: 'rechurn',
    Header: 'Rechurn',
    accessor: o => {
      return o.rechurn ? 'Yes' : 'No';
    },
  }, {
    Header: 'Rechurn Interval (sec)',
    accessor: 'rechurnDelaySeconds',
  }],
  uploadSheetColumns: [{
    id: 'date',
    Header: 'Upload Date',
    accessor: o => {
      return moment(o.date).format('lll')
    },
  }, {
    id: 'id',
    Header: 'File Name',
    accessor: o => {
      return o.link.split('/')[2]
    },
  }, {
    Header: 'Category',
    accessor: 'type',
  }],
  wayBillColumns: [{
    Header: 'AWB No.',
    accessor: 'awbNumber',
  }, {
    Header: 'CCRCRDREF',
    accessor: 'ccrcrdref',
  }, {
    id: 'date',
    Header: 'Created On',
    accessor: o => {
      return moment(o.createdDate).format('lll');
    },
  }, {
    Header: 'Created By',
    accessor: 'creationUser',
  }, {
    Header: 'Area Code',
    accessor: 'destinationArea',
  }, {
    Header: 'Location Code',
    accessor: 'destinationLocation',
  }, {
    id: 'link',
    Header: 'Link',
    accessor: o => {
      return <a href={o.mediaLink} target="blank">Download</a>;
    },
  }, {
    Header: 'Status',
    accessor: 'status',
  }],
  rentalStoreColumns: [{
    Header: 'Title',
    accessor: 'title',
  }, {
    id: 'looks',
    Header: 'Looks',
    accessor: o => o.looks.join(',')
  }, {
    id: 'created',
    Header: 'Created',
    accessor: o => {
      return moment(o.createdOn).format('lll');
    },
  }, {
    Header: 'URL',
    accessor: 'url',
  }],
  userColumns: [{
    Header: 'Email',
    accessor: 'email',
  }, {
    Header: 'Name',
    accessor: 'name',
  }, {
    Header: 'Role',
    accessor: 'role',
  }, {
    Header: 'Owner',
    accessor: 'owner',
  }, {
    Header: 'Phone Number',
    accessor: 'phoneNumber',
  }, {
    id: 'created',
    Header: 'Created',
    accessor: o => {
      return moment(o.dateAdded).format('lll');
    },
  }],
  rawMaterialColumns: [{
    Header: 'Title',
    accessor: 'title',
  }, {
    id: 'alert',
    Header: 'Status',
    accessor: o => {
      if (o.alert) {
        return <p><img src="https://ik.imagekit.io/stage3/tr:n-web/icon-alert1.png" /></p>
      } else {
        return <p><img src="https://ik.imagekit.io/stage3/tr:n-web/icon-ok2.png" /></p>
      }
    },
  }, {
    Header: 'Measurement Type',
    accessor: 'measurementType',
  }, {
    Header: 'Available Quantity',
    accessor: 'availableQuantity',
  }, {
    Header: 'Price',
    accessor: 'price',
  }, {
    Header: 'Alert Offset',
    accessor: 'alertOffset',
  }, {
    id: 'created',
    Header: 'Created',
    accessor: o => {
      return moment(o.creationTime).format('lll');
    },
  }],
  outfitColumns: [{
    Header: 'Title',
    accessor: 'title',
  }, {
    id: 'composition',
    Header: 'Composition',
    accessor: o => {
      return JSON.stringify(o.composition);
    }
  }, {
    Header: 'Available Quantity',
    accessor: 'availableQuantity',
  }, {
    Header: 'Sold Quantity',
    accessor: 'soldQuantity',
  }, {
    Header: 'Pipeline',
    accessor: 'pipelineQuantity',
  }, {
    Header: 'Pipeline Offset',
    accessor: 'pipelineOffset',
  }, {
    id: 'created',
    Header: 'Created',
    accessor: o => {
      return moment(o.creationTime).format('lll');
    },
  }],
  refundLogsColumns: [{
    Header: 'Customer',
    accessor: 'customerId',
  }, {
    Header: 'Order Id',
    accessor: 'orderId',
  }, {
    Header: 'Look Number',
    accessor: 'looknumber',
  }, {
    Header: 'Refund Amount',
    accessor: 'amount',
  }, {
    Header: 'Created By',
    accessor: 'createdBy',
  }, {
    id: 'createdDate',
    Header: 'Created Date',
    accessor: o => {
      return moment(o.createdDate).format('lll');
    },
  }],
  customerIdRefundsColumns: [{
    id: 'refundStatus',
    Header: 'Refund Status',
    accessor: o => {
      return o.refunded ? 'Yes' : 'No';
    },
  }, {
    id: 'refundedDate',
    Header: 'Refunded Date',
    accessor: o => {
      return o.refundedDate ? moment(o.refundedDate).format('lll') : '-';
    },
  }, {
    Header: 'Look Number',
    accessor: 'looknumber',
  }, {
    Header: 'Refund Amount',
    accessor: 'amount',
  }, {
    Header: 'Created By',
    accessor: 'createdBy',
  }, {
    id: 'createdDate',
    Header: 'Created Date',
    accessor: o => {
      return moment(o.createdDate).format('lll');
    },
  }],
  scanLogsColumns: [{
    Header: 'SKU',
    accessor: 'sku',
  }, {
    Header: 'Scanned By',
    accessor: 'scannedBy',
  }, {
    Header: 'Scan Reason',
    accessor: 'reason',
  }, {
    id: 'timestamp',
    Header: 'Scan Time',
    accessor: o => {
      return moment(o.timestamp).format('lll');
    },
  }, {
    Header: 'Location',
    accessor: 'location',
  }, {
    id: 'alert',
    Header: 'Alert',
    accessor: o => {
      let scanTimestamp = moment(o.timestamp);
      let interval = moment().diff(scanTimestamp, 'hours');
      if (interval > 72 && o.location !== 'customer') {
        return <p><img src="https://ik.imagekit.io/stage3/icon-alert.png" className={styles.alertimg} /></p>
      } else {
        return <p><img src="https://ik.imagekit.io/stage3/tr:n-web/icon-ok2.png" className={styles.alertimg} /></p>
      }
    },
  }],
  locationLogsColumns: [{
    Header: 'SKU',
    accessor: 'sku',
  }, {
    Header: 'Look',
    accessor: 'url',
  }, {
    Header: 'Last Location',
    accessor: 'location',
  }, {
    Header: 'Home Location',
    accessor: 'homeLocation',
  }, {
    Header: 'Scanned By',
    accessor: 'latestScan.scannedBy',
  }, {
    Header: 'Scan Reason',
    accessor: 'latestScan.reason',
  }, {
    id: 'timestamp',
    Header: 'Scan Time',
    accessor: o => {
      return o.latestScan ? moment(o.latestScan.timestamp).format('lll') : 'Not Scanned';
    },
  }, {
    id: 'alert',
    Header: 'Alert',
    accessor: o => {
      if (o.latestScan) {
        let scanTimestamp = moment(o.latestScan.timestamp);
        let interval = moment().diff(scanTimestamp, 'hours');
        if (interval > 72 && o.location !== 'customer') {
          return <p><img src="https://ik.imagekit.io/stage3/icon-alert.png" className={styles.alertimg} /></p>
        } else {
          return <p><img src="https://ik.imagekit.io/stage3/tr:n-web/icon-ok2.png" className={styles.alertimg} /></p>
        }
      }
    },
  }]
};

export default clientConfig;
