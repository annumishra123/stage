import moment from 'moment';

const clientConfig = {
    serviceCities: [{
        city: 'Delhi',
        state: 'Delhi'
    }, {
        city: 'Mumbai',
        state: 'Maharashtra'
    }, {
        city: 'Chandigarh',
        state: 'Chandigarh'
    }, {
        city: 'Ludhiana',
        state: 'Punjab'
    }, {
        city: 'Gurgaon',
        state: 'Haryana'
    }, {
        city: 'Noida',
        state: 'Uttar Pradesh'
    }, {
        city: 'Faridabad',
        state: 'Haryana'
    }, {
        city: 'Ghaziabad',
        state: 'Uttar Pradesh'
    }, {
        city: 'Bangalore',
        state: 'Karnataka'
    }, {
        city: 'Hyderabad',
        state: 'Andhra Pradesh'
    }, {
        city: 'Kolkata',
        state: 'West Bengal'
    }, {
        city: 'Pune',
        state: 'Maharashtra'
    }, {
        city: 'Jaipur',
        state: 'Rajasthan'
    }, {
        city: 'Lucknow',
        state: 'Uttar Pradesh'
    }, {
        city: 'Ahmedabad',
        state: 'Gujrat'
    }, {
        city: 'Nagpur',
        state: 'Maharashtra'
    }, {
        city: 'Indore',
        state: 'Madhya Pradesh'
    }, {
        city: 'Surat',
        state: 'Gujrat'
    }, {
        city: 'Dehradun',
        state: 'Uttarakhand'
    }, {
        city: 'Chennai',
        state: 'TamilNadu'
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
        'outfit now looking old'
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
        'razorpay'
    ],
    deliveryColumns: [{
        Header: 'Order Id',
        accessor: 'parentOrder.frontendOrderId'
    }, {
        Header: 'Email Id',
        accessor: 'profile.email'
    }, {
        id: 'name',
        Header: 'Name',
        accessor: o => o.profile.firstName + ' ' + o.profile.lastName
    }, {
        Header: 'Phone',
        accessor: 'profile.phoneNumber'
    }, {
        Header: 'Address',
        accessor: 'deliveryAddress.address'
    }, {
        Header: 'City',
        accessor: 'deliveryAddress.city'
    }, {
        Header: 'State',
        accessor: 'deliveryAddress.state'
    }, {
        Header: 'Pincode',
        accessor: 'deliveryAddress.pincode'
    }, {
        Header: 'Product Name',
        accessor: 'product.name'
    }, {
        Header: 'SKU',
        accessor: 'product.sku'
    }, {
        Header: 'Designer',
        accessor: 'product.designer'
    }, {
        id: 'orderDate',
        Header: 'Order Date',
        accessor: o => moment(o.parentOrder.orderDate).format("dddd, MMMM Do YYYY, h:mm:ss a")
    }, {
        id: 'deliveryDate',
        Header: 'Delivery Date',
        accessor: o => moment(o.deliveryDateUTC).format("l")
    }, {
        id: 'occasionDate',
        Header: 'Occasion Date',
        accessor: o => moment(o.occasionDateUTC).format("l")
    }, {
        id: 'pickupDate',
        Header: 'Pickup Date',
        accessor: o => moment(o.pickupDateUTC).format("l")
    }, {
        id: 'grossAmount',
        Header: 'Gross Amount',
        accessor: o => o.originalPrice + o.originalDeposit
    }, {
        id: 'discount',
        Header: 'Discount',
        accessor: o => o.originalPrice - o.price
    }, {
        id: 'netAmount',
        Header: 'Net Amount',
        accessor: o => o.price + o.deposit
    }, {
        Header: 'Rental',
        accessor: 'price'
    }, {
        Header: 'Deposit',
        accessor: 'deposit'
    }, {
        Header: 'Retail Price',
        accessor: 'product.retailprice'
    }, {
        Header: 'Status',
        accessor: 'parentOrder.status'
    }, {
        Header: 'Payment Type',
        accessor: 'parentOrder.paymentType'
    }, {
        Header: 'Discount Coupon',
        accessor: 'parentOrder.discountCoupon'
    }],

    rentalColumns: [{
        Header: 'Order Id',
        accessor: 'frontendOrderId'
    }, {
        Header: 'User Id',
        accessor: 'userId'
    }, {
        id: 'dateOrder',
        Header: 'Date Of Order',
        accessor: o => moment(o.orderDate).format("dddd, MMMM Do YYYY, h:mm:ss a")
    }, {
        Header: 'Status',
        accessor: 'status'
    }],

    shopColumns: [{
        Header: 'Order Id',
        accessor: 'frontendOrderId'
    }, {
        Header: 'User Id',
        accessor: 'userId'
    }, {
        id: 'dateOrder',
        Header: 'Date Of Order',
        accessor: o => moment(o.orderDate).format("dddd, MMMM Do YYYY, h:mm:ss a")
    }, {
        Header: 'Status',
        accessor: 'status'
    }]
}


export default clientConfig;