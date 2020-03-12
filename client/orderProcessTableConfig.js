import moment from 'moment';
import React from 'react';

export const logisticsDeliveryNCRColumns = [
    {
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
    }, {
        Header: 'Is Order Active',
        accessor: 'orderlineProcess.active',
    }, {
        id: 'delivered.endTime',
        Header: 'Delivered EndTime',
        accessor: o => o.orderlineProcess && o.orderlineProcess.delivered && o.orderlineProcess.delivered.endTime ? moment(o.orderlineProcess.delivered.endTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['delivered.endTime']) {
                if (o.row['delivered.expectedEndTime'] && moment(o.row['delivered.endTime']).isAfter(moment(o.row['delivered.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
            return {};
        }
    }, {
        id: 'delivered.expectedEndTime',
        Header: 'Delivered Expected EndTime',
        accessor: o => o.orderlineProcess && o.orderlineProcess.delivered && o.orderlineProcess.delivered.expectedEndTime ? moment(o.orderlineProcess.delivered.expectedEndTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['delivered']) {
                if (!o.row['delivered.endTime']) {

                    if (o.row['delivered.expectedEndTime'] && moment().isAfter(moment(o.row['delivered.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['delivered.expectedEndTime']).isAfter(moment())) {
                        return {
                            style: {
                                backgroundColor: 'yellow'
                            }
                        };
                    }
                    else if (moment().isAfter(moment(o.row['delivered.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                }
                else {
                    if (o.row['delivered.expectedEndTime'] && moment(o.row['delivered.endTime']).isAfter(moment(o.row['delivered.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                    else {
                        return {
                            style: {
                                backgroundColor: 'green'
                            }
                        };
                    }
                }
            }
            return {};
        }
    }, {
        Header: 'Delivery Resolvement done By',
        accessor: 'orderlineProcess.delivered.resolvedBy',
    }, {
        Header: 'Delivery Status',
        accessor: 'orderlineProcess.delivered.status',
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
        Header: 'Dispatch Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.dispatched && o.orderlineProcess.dispatched.endTime ? moment(o.orderlineProcess.dispatched.endTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['dispatched.endTime']) {
                if (moment(o.row['dispatched.endTime']).isAfter(moment(o.row['dispatched.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
            return {};
        }
    }, {
        id: 'dispatched.expectedEndTime',
        Header: 'Dispatch Expected Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.dispatched && o.orderlineProcess.dispatched.expectedEndTime ? moment(o.orderlineProcess.dispatched.expectedEndTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['dispatched']) {
                if (!o.row['dispatched.endTime']) {

                    if (o.row['dispatched.expectedEndTime'] && moment().isAfter(moment(o.row['dispatched.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['dispatched.expectedEndTime']).isAfter(moment())) {
                        return {
                            style: {
                                backgroundColor: 'yellow'
                            }
                        };
                    }
                    else if (moment().isAfter(moment(o.row['dispatched.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                }
                else {
                    if (o.row['dispatched.expectedEndTime'] && moment(o.row['dispatched.endTime']).isAfter(moment(o.row['dispatched.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                    else {
                        return {
                            style: {
                                backgroundColor: 'green'
                            }
                        };
                    }
                }
            }
            return {};
        }
    }, {
        Header: 'Dispatch Resolved By',
        accessor: 'orderlineProcess.dispatched.resolvedBy',
    }, {
        Header: 'Dispatched Status',
        accessor: 'orderlineProcess.dispatched.status',
    }, {
        id: 'Next Action SLA',
        Header: 'Next Action SLA',
        accessor: o => o.orderlineProcess && o.orderlineProcess.nextActionSla ? moment(o.orderlineProcess.nextActionSla).format('lll') : '',
    }, {
        Header: 'Order Status',
        accessor: 'orderlineProcess.status',
    }, {
        Header: 'Non NCR order',
        accessor: 'orderlineProcess.outstation',
    }, {
        Header: 'Customer Email Id',
        accessor: 'profile.email',
    }, {
        id: 'name',
        Header: 'Customer Name',
        accessor: o => o.profile.firstName + ' ' + o.profile.lastName,
    }, {
        Header: 'Customer Phone Number',
        accessor: 'profile.phoneNumber',
    }, {
        Header: 'Customer Address',
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
        Header: 'Product Look No.',
        accessor: 'product.lookNumber',
    }, {
        id: 'gender',
        Header: 'Gender',
        accessor: o => o.product.url ? o.product.url.split('/')[0] : '',
    }, {
        Header: 'SKU',
        accessor: 'product.sku',
    }, {
        id: 'deliveryDate',
        Header: 'Delivery Date',
        accessor: o => moment(o.deliveryDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'occasionDate',
        Header: 'Occasion Date',
        accessor: o => moment(o.occasionDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'netAmount',
        Header: 'Net Amount',
        accessor: o => o.price + o.deposit,
    }, {
        Header: 'Payment Status',
        accessor: 'currentStatus',
    }, {
        Header: 'Payment Type',
        accessor: 'parentOrder.paymentType',
    },
];

export const logisticsDeliveryNonNCRColumns = [
    {
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
    }, {
        Header: 'Is Order Active',
        accessor: 'orderlineProcess.active',
    }, {
        id: 'delivered.endTime',
        Header: 'Delivered EndTime',
        accessor: o => o.orderlineProcess && o.orderlineProcess.delivered && o.orderlineProcess.delivered.endTime ? moment(o.orderlineProcess.delivered.endTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['delivered.endTime']) {
                if (o.row['delivered.expectedEndTime'] && moment(o.row['delivered.endTime']).isAfter(moment(o.row['delivered.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
            return {};
        }
    }, {
        id: 'delivered.expectedEndTime',
        Header: 'Delivered Expected EndTime',
        accessor: o => o.orderlineProcess && o.orderlineProcess.delivered && o.orderlineProcess.delivered.expectedEndTime ? moment(o.orderlineProcess.delivered.expectedEndTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['delivered']) {
                if (!o.row['delivered.endTime']) {
                    if (o.row['delivered.expectedEndTime'] && moment().isAfter(moment(o.row['delivered.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['delivered.expectedEndTime']).isAfter(moment())) {
                        return {
                            style: {
                                backgroundColor: 'yellow'
                            }
                        };
                    }
                    else if (moment().isAfter(moment(o.row['delivered.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    } else {
                        return {};
                    }
                } else {
                    if (o.row['delivered.expectedEndTime'] && moment(o.row['delivered.endTime']).isAfter(moment(o.row['delivered.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                    else {
                        return {
                            style: {
                                backgroundColor: 'green'
                            }
                        };
                    }
                }
            } else {
                return {};
            }
        }
    }, {
        Header: 'Delivery Resolvement done By',
        accessor: 'orderlineProcess.delivered.resolvedBy',
    }, {
        Header: 'Delivery Status',
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
        Header: 'OutForDelivery Time',
        accessor: 'orderlineProcess.outForDelivery.endTime',
    }, {
        id: 'OutForDelivery Expected Time ',
        Header: 'OutForDelivery Expected End Time ',
        accessor: o => o.orderlineProcess && o.orderlineProcess.outForDelivery && o.orderlineProcess.outForDelivery.expectedEndTime ? moment(o.orderlineProcess.outForDelivery.expectedEndTime).format('lll') : '',
    }, {
        Header: 'Non NCR order',
        accessor: 'orderlineProcess.outstation',
    }, {
        Header: 'Order Status',
        accessor: 'orderlineProcess.status',
    }, {
        Header: 'Customer Email Id',
        accessor: 'profile.email',
    }, {
        id: 'name',
        Header: 'Customer Name',
        accessor: o => o.profile.firstName + ' ' + o.profile.lastName,
    }, {
        Header: 'Customer Phone Number',
        accessor: 'profile.phoneNumber',
    }, {
        Header: 'Customer Address',
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
        Header: 'Product Look No.',
        accessor: 'product.lookNumber',
    }, {
        id: 'gender',
        Header: 'Gender',
        accessor: o => o.product.url ? o.product.url.split('/')[0] : '',
    }, {
        Header: 'SKU',
        accessor: 'product.sku',
    }, {
        id: 'deliveryDate',
        Header: 'Delivery Date',
        accessor: o => moment(o.deliveryDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'occasionDate',
        Header: 'Occasion Date',
        accessor: o => moment(o.occasionDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'netAmount',
        Header: 'Net Amount',
        accessor: o => o.price + o.deposit,
    }, {
        Header: 'Payment Status',
        accessor: 'currentStatus',
    }, {
        Header: 'Payment Type',
        accessor: 'parentOrder.paymentType',
    },
];

export const logisticsPickupNCRColumns = [
    {
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
    }, {
        Header: 'Is Order Active',
        accessor: 'orderlineProcess.active',
    }, {
        Header: 'Non NCR order',
        accessor: 'orderlineProcess.outstation',
    }, {
        id: 'picked.endTime',
        Header: 'Picked End Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.picked && o.orderlineProcess.picked.endTime ? moment(o.orderlineProcess.picked.endTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['picked.endTime']) {
                if (o.row['picked.expectedEndTime'] && moment(o.row['picked.endTime']).isAfter(moment(o.row['picked.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
            return {};
        }
    }, {
        id: 'picked.expectedEndTime',
        Header: 'Picked Expected End Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.picked && o.orderlineProcess.picked.expectedEndTime ? moment(o.orderlineProcess.picked.expectedEndTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['picked']) {
                if (!o.row['picked.endTime']) {

                    if (o.row['picked.expectedEndTime'] && moment().isAfter(moment(o.row['picked.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['picked.expectedEndTime']).isAfter(moment())) {
                        return {
                            style: {
                                backgroundColor: 'yellow'
                            }
                        };
                    }
                    else if (moment().isAfter(moment(o.row['picked.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                }
                else {
                    if (o.row['picked.expectedEndTime'] && moment(o.row['picked.endTime']).isAfter(moment(o.row['picked.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                    else {
                        return {
                            style: {
                                backgroundColor: 'green'
                            }
                        };
                    }
                }
            }
            return {};
        }
    }, {
        Header: 'Pick-up Resolved By',
        accessor: 'orderlineProcess.picked.resolvedBy',
    }, {
        Header: 'Pick-up Status',
        accessor: 'orderlineProcess.picked.status',
    }, {
        Header: 'Is Pick-up Active',
        accessor: 'orderlineProcess.pickupActive',
    }, {
        id: 'pickupLogisticResourceAssigned.endTime',
        Header: 'Pickup Logistic End Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.pickupLogisticResourceAssigned && o.orderlineProcess.pickupLogisticResourceAssigned.endTime ? moment(o.orderlineProcess.pickupLogisticResourceAssigned.endTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['pickupLogisticResourceAssigned.endTime']) {
                if (o.row['pickupLogisticResourceAssigned.expectedEndTime'] && moment(o.row['pickupLogisticResourceAssigned.endTime']).isAfter(moment(o.row['pickupLogisticResourceAssigned.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
            return {};
        }
    }, {
        id: 'pickupLogisticResourceAssigned.expectedEndTime',
        Header: 'Pickup Logistic Expected End Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.pickupLogisticResourceAssigned && o.orderlineProcess.pickupLogisticResourceAssigned.expectedEndTime ? moment(o.orderlineProcess.pickupLogisticResourceAssigned.expectedEndTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['pickupLogisticResourceAssigned']) {
                if (!o.row['pickupLogisticResourceAssigned.endTime']) {

                    if (o.row['pickupLogisticResourceAssigned.expectedEndTime'] && moment().isAfter(moment(o.row['pickupLogisticResourceAssigned.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['pickupLogisticResourceAssigned.expectedEndTime']).isAfter(moment())) {
                        return {
                            style: {
                                backgroundColor: 'yellow'
                            }
                        };
                    }
                    else if (moment().isAfter(moment(o.row['pickupLogisticResourceAssigned.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                }
                else {
                    if (o.row['pickupLogisticResourceAssigned.expectedEndTime'] && moment(o.row['pickupLogisticResourceAssigned.endTime']).isAfter(moment(o.row['pickupLogisticResourceAssigned.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                    else {
                        return {
                            style: {
                                backgroundColor: 'green'
                            }
                        };
                    }
                }
            }
            return {};
        }
    }, {
        Header: 'Pickup Resolved By',
        accessor: 'orderlineProcess.pickupLogisticResourceAssigned.resolvedBy',
    }, {
        Header: 'Pickup Status',
        accessor: 'orderlineProcess.pickupLogisticResourceAssigned.status',
    }, {
        Header: 'Pickup Link',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.link',
    }, {
        Header: 'Pickup Message',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.message',
    }, {
        Header: 'Pickup Runner Contact',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerContact',
    }, {
        Header: 'Pickup Runner Id',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerId',
    }, {
        Header: 'Pickup Runner Name',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerName',
    }, {
        Header: 'Customer Email Id',
        accessor: 'profile.email',
    }, {
        id: 'name',
        Header: 'Customer Name',
        accessor: o => o.profile.firstName + ' ' + o.profile.lastName,
    }, {
        Header: 'Customer Phone Number',
        accessor: 'profile.phoneNumber',
    }, {
        Header: 'Customer Address',
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
        Header: 'Product Look No.',
        accessor: 'product.lookNumber',
    }, {
        id: 'gender',
        Header: 'Gender',
        accessor: o => o.product.url ? o.product.url.split('/')[0] : '',
    }, {
        Header: 'SKU',
        accessor: 'product.sku',
    }, {
        id: 'deliveryDate',
        Header: 'Delivery Date',
        accessor: o => moment(o.deliveryDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'occasionDate',
        Header: 'Occasion Date',
        accessor: o => moment(o.occasionDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'netAmount',
        Header: 'Net Amount',
        accessor: o => o.price + o.deposit,
    }, {
        Header: 'Payment Status',
        accessor: 'currentStatus',
    }, {
        Header: 'Payment Type',
        accessor: 'parentOrder.paymentType',
    },
];

export const logisticsPickupNonNCRColumns = [
    {
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
    }, {
        Header: 'Is Order Active',
        accessor: 'orderlineProcess.active',
    }, {
        id: 'picked.endTime',
        Header: 'Picked End Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.picked && o.orderlineProcess.picked.endTime ? moment(o.orderlineProcess.picked.endTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['picked.endTime']) {
                if (o.row['picked.expectedEndTime'] && moment(o.row['picked.endTime']).isAfter(moment(o.row['picked.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
            return {};
        }
    }, {
        id: 'picked.expectedEndTime',
        Header: 'Picked Expected End Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.picked && o.orderlineProcess.picked.expectedEndTime ? moment(o.orderlineProcess.picked.expectedEndTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['picked']) {
                if (!o.row['picked.endTime']) {

                    if (o.row['picked.expectedEndTime'] && moment().isAfter(moment(o.row['picked.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['picked.expectedEndTime']).isAfter(moment())) {
                        return {
                            style: {
                                backgroundColor: 'yellow'
                            }
                        };
                    }
                    else if (moment().isAfter(moment(o.row['picked.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                }
                else {
                    if (o.row['picked.expectedEndTime'] && moment(o.row['picked.endTime']).isAfter(moment(o.row['picked.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                    else {
                        return {
                            style: {
                                backgroundColor: 'green'
                            }
                        };
                    }
                }
            }
            return {};
        }
    }, {
        Header: 'Non NCR order',
        accessor: 'orderlineProcess.outstation',
    }, {
        Header: 'Pick-up Resolved By',
        accessor: 'orderlineProcess.picked.resolvedBy',
    }, {
        Header: 'Pick-up Status',
        accessor: 'orderlineProcess.picked.status',
    }, {
        Header: 'Is Pick-up Active',
        accessor: 'orderlineProcess.pickupActive',
    }, {
        id: 'pickupLogisticResourceAssigned.endTime',
        Header: 'Pickup Logistic End Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.pickupLogisticResourceAssigned && o.orderlineProcess.pickupLogisticResourceAssigned.endTime ? moment(o.orderlineProcess.pickupLogisticResourceAssigned.endTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['pickupLogisticResourceAssigned.endTime']) {
                if (o.row['pickupLogisticResourceAssigned.expectedEndTime'] && moment(o.row['pickupLogisticResourceAssigned.endTime']).isAfter(moment(o.row['pickupLogisticResourceAssigned.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
            return {};
        }
    }, {
        id: 'pickupLogisticResourceAssigned.expectedEndTime',
        Header: 'Pickup Logistic Expected End Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.pickupLogisticResourceAssigned && o.orderlineProcess.pickupLogisticResourceAssigned.expectedEndTime ? moment(o.orderlineProcess.pickupLogisticResourceAssigned.expectedEndTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['pickupLogisticResourceAssigned']) {
                if (!o.row['pickupLogisticResourceAssigned.endTime']) {

                    if (o.row['pickupLogisticResourceAssigned.expectedEndTime'] && moment().isAfter(moment(o.row['pickupLogisticResourceAssigned.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['pickupLogisticResourceAssigned.expectedEndTime']).isAfter(moment())) {
                        return {
                            style: {
                                backgroundColor: 'yellow'
                            }
                        };
                    }
                    else if (moment().isAfter(moment(o.row['pickupLogisticResourceAssigned.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                }
                else {
                    if (o.row['pickupLogisticResourceAssigned.expectedEndTime'] && moment(o.row['pickupLogisticResourceAssigned.endTime']).isAfter(moment(o.row['pickupLogisticResourceAssigned.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                    else {
                        return {
                            style: {
                                backgroundColor: 'green'
                            }
                        };
                    }
                }
            }
            return {};
        }
    }, {
        Header: 'Pickup Resolved By',
        accessor: 'orderlineProcess.pickupLogisticResourceAssigned.resolvedBy',
    }, {
        Header: 'Pickup Status',
        accessor: 'orderlineProcess.pickupLogisticResourceAssigned.status',
    }, {
        Header: 'Pickup AWB No',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.awbNo',
    }, {
        Header: 'Pickup Link',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.link',
    }, {
        Header: 'Pickup Message',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.message',
    }, {
        Header: 'Pickup Runner Contact',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerContact',
    }, {
        Header: 'Pickup Runner Id',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerId',
    }, {
        Header: 'Pickup Runner Name',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerName',
    }, {
        Header: 'Customer Email Id',
        accessor: 'profile.email',
    }, {
        id: 'name',
        Header: 'Customer Name',
        accessor: o => o.profile.firstName + ' ' + o.profile.lastName,
    }, {
        Header: 'Customer Phone Number',
        accessor: 'profile.phoneNumber',
    }, {
        Header: 'Customer Address',
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
        Header: 'Product Look No.',
        accessor: 'product.lookNumber',
    }, {
        id: 'gender',
        Header: 'Gender',
        accessor: o => o.product.url ? o.product.url.split('/')[0] : '',
    }, {
        Header: 'SKU',
        accessor: 'product.sku',
    }, {
        id: 'deliveryDate',
        Header: 'Delivery Date',
        accessor: o => moment(o.deliveryDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'occasionDate',
        Header: 'Occasion Date',
        accessor: o => moment(o.occasionDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'netAmount',
        Header: 'Net Amount',
        accessor: o => o.price + o.deposit,
    }, {
        Header: 'Payment Status',
        accessor: 'currentStatus',
    }, {
        Header: 'Payment Type',
        accessor: 'parentOrder.paymentType',
    },
];

export const qaDeductionsColumns = [
    {
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
    }, {
        Header: 'Is Order Active',
        accessor: 'orderlineProcess.active',
    }, {
        Header: 'Damaged Amount',
        accessor: 'orderlineProcess.calulatedDamageAmount',
    }, {
        Header: 'Damage Reason',
        accessor: 'orderlineProcess.damageReason',
    }, {
        Header: 'QC3 Resolved By',
        accessor: 'orderlineProcess.qc3.resolvedBy',
    }, {
        Header: 'QC3 Current Status',
        accessor: 'orderlineProcess.qc3.status',
    }, {
        Header: 'QC3 Result Failure reason',
        accessor: 'orderlineProcess.qc3Result.failReason',
    }, {
        Header: 'Is QC3 Result Passed',
        accessor: 'orderlineProcess.qc3Result.pass',
    }, {
        Header: 'QC3 Result Additional Remarks ',
        accessor: 'orderlineProcess.qc3Result.remarks',
    }, {
        Header: 'Receiving Resolved By',
        accessor: 'orderlineProcess.received.resolvedBy',
    }, {
        Header: 'Receiving Status',
        accessor: 'orderlineProcess.received.status',
    }, {
        Header: 'Order Status',
        accessor: 'orderlineProcess.status',
    }, {
        Header: 'Customer Email Id',
        accessor: 'profile.email',
    }, {
        id: 'name',
        Header: 'Customer Name',
        accessor: o => o.profile.firstName + ' ' + o.profile.lastName,
    }, {
        Header: 'Customer Phone Number',
        accessor: 'profile.phoneNumber',
    }, {
        Header: 'Customer Address',
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
        Header: 'Product Look No.',
        accessor: 'product.lookNumber',
    }, {
        id: 'gender',
        Header: 'Gender',
        accessor: o => o.product.url ? o.product.url.split('/')[0] : '',
    }, {
        Header: 'SKU',
        accessor: 'product.sku',
    }, {
        id: 'deliveryDate',
        Header: 'Delivery Date',
        accessor: o => moment(o.deliveryDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'occasionDate',
        Header: 'Occasion Date',
        accessor: o => moment(o.occasionDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'netAmount',
        Header: 'Net Amount',
        accessor: o => o.price + o.deposit,
    }, {
        Header: 'Payment Status',
        accessor: 'currentStatus',
    }, {
        Header: 'Payment Type',
        accessor: 'parentOrder.paymentType',
    },
];

export const qaPostOrderColumns = [{
    id: 'Order Id',
    Header: 'Order Id',
    accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
}, {
    Header: 'Is Order Active',
    accessor: 'orderlineProcess.active',
}, {
    id: 'qc3.endTime',
    Header: 'QC3 End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.qc3 && o.orderlineProcess.qc3.endTime ? moment(o.orderlineProcess.qc3.endTime).format('lll') : '',
    getProps: (state, o, column) => {
        if (o && o.row['qc3.endTime']) {
            if (o.row['qc3.expectedEndTime'] && moment(o.row['qc3.endTime']).isAfter(moment(o.row['qc3.expectedEndTime']))) {
                return {
                    style: {
                        backgroundColor: 'red'
                    }
                };
            }
            else {
                return {
                    style: {
                        backgroundColor: 'green'
                    }
                };
            }
        }
        return {};
    }
}, {
    id: 'qc3.expectedEndTime',
    Header: 'QC3 Expected End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.qc3 && o.orderlineProcess.qc3.expectedEndTime ? moment(o.orderlineProcess.qc3.expectedEndTime).format('lll') : '',
    getProps: (state, o, column) => {
        if (o && o.row['qc3']) {
            if (!o.row['qc3.endTime']) {

                if (o.row['qc3.expectedEndTime'] && moment().isAfter(moment(o.row['qc3.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['qc3.expectedEndTime']).isAfter(moment())) {
                    return {
                        style: {
                            backgroundColor: 'yellow'
                        }
                    };
                }
                else if (moment().isAfter(moment(o.row['qc3.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
            }
            else {
                if (o.row['qc3.expectedEndTime'] && moment(o.row['qc3.endTime']).isAfter(moment(o.row['qc3.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
        }
        return {};
    }
}, {
    Header: 'QC3 Resolved By',
    accessor: 'orderlineProcess.qc3.resolvedBy',
}, {
    Header: 'QC3 Current Status',
    accessor: 'orderlineProcess.qc3.status',
}, {
    Header: 'QC3 Result Failure reason',
    accessor: 'orderlineProcess.qc3Result.failReason',
}, {
    Header: 'Is QC3 Result Passed',
    accessor: 'orderlineProcess.qc3Result.pass',
}, {
    Header: 'QC3 Result Additional Remarks ',
    accessor: 'orderlineProcess.qc3Result.remarks',
}, {
    id: 'received.endTime',
    Header: 'Received End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.received && o.orderlineProcess.received.endTime ? moment(o.orderlineProcess.received.endTime).format('lll') : '',
    getProps: (state, o, column) => {
        if (o && o.row['received.endTime']) {
            if (o.row['received.expectedEndTime'] && moment(o.row['received.endTime']).isAfter(moment(o.row['received.expectedEndTime']))) {
                return {
                    style: {
                        backgroundColor: 'red'
                    }
                };
            }
            else {
                return {
                    style: {
                        backgroundColor: 'green'
                    }
                };
            }
        }
        return {};
    }
}, {
    id: 'received.expectedEndTime',
    Header: 'Received Expected End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.received && o.orderlineProcess.received.expectedEndTime ? moment(o.orderlineProcess.received.expectedEndTime).format('lll') : '',
    getProps: (state, o, column) => {
        if (o && o.row['received']) {
            if (!o.row['received.endTime']) {

                if (o.row['received.expectedEndTime'] && moment().isAfter(moment(o.row['received.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['received.expectedEndTime']).isAfter(moment())) {
                    return {
                        style: {
                            backgroundColor: 'yellow'
                        }
                    };
                }
                else if (moment().isAfter(moment(o.row['received.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
            }
            else {
                if (o.row['received.expectedEndTime'] && moment(o.row['received.endTime']).isAfter(moment(o.row['received.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
        }
        return {};
    }
}, {
    Header: 'Customer Email Id',
    accessor: 'profile.email',
}, {
    id: 'name',
    Header: 'Customer Name',
    accessor: o => o.profile.firstName + ' ' + o.profile.lastName,
}, {
    Header: 'Customer Phone Number',
    accessor: 'profile.phoneNumber',
}, {
    Header: 'Customer Address',
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
    Header: 'Product Look No.',
    accessor: 'product.lookNumber',
}, {
    id: 'gender',
    Header: 'Gender',
    accessor: o => o.product.url ? o.product.url.split('/')[0] : '',
}, {
    Header: 'SKU',
    accessor: 'product.sku',
}, {
    id: 'deliveryDate',
    Header: 'Delivery Date',
    accessor: o => moment(o.deliveryDateUTC).format('DD-MM-YYYY'),
}, {
    id: 'occasionDate',
    Header: 'Occasion Date',
    accessor: o => moment(o.occasionDateUTC).format('DD-MM-YYYY'),
}, {
    id: 'netAmount',
    Header: 'Net Amount',
    accessor: o => o.price + o.deposit,
}, {
    Header: 'Payment Status',
    accessor: 'currentStatus',
}, {
    Header: 'Payment Type',
    accessor: 'parentOrder.paymentType',
},
];

export const refundColumns = [{
    id: 'Order Id',
    Header: 'Order Id',
    accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
}, {
    Header: 'Is Order Active',
    accessor: 'orderlineProcess.active',
}, {
    Header: 'Refund Amount',
    accessor: 'orderlineProcess.refundAmount',
}, {
    id: 'refundApproved.endTime',
    Header: 'Refund Approved End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.refundApproved && o.orderlineProcess.refundApproved.endTime ? moment(o.orderlineProcess.refundApproved.endTime).format('lll') : '',
    getProps: (state, o, column) => {
        if (o && o.row['refundApproved.endTime']) {
            if (o.row['refundApproved.expectedEndTime'] && moment(o.row['refundApproved.endTime']).isAfter(moment(o.row['refundApproved.expectedEndTime']))) {
                return {
                    style: {
                        backgroundColor: 'red'
                    }
                };
            }
            else {
                return {
                    style: {
                        backgroundColor: 'green'
                    }
                };
            }
        }
        return {};
    }
}, {
    id: 'refundApproved.expectedEndTime',
    Header: 'Refund Approved Expected End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.refundApproved && o.orderlineProcess.refundApproved.expectedEndTime ? moment(o.orderlineProcess.refundApproved.expectedEndTime).format('lll') : '',
    getProps: (state, o, column) => {
        if (o && o.row['refundApproved']) {
            if (!o.row['refundApproved.endTime']) {

                if (o.row['refundApproved.expectedEndTime'] && moment().isAfter(moment(o.row['refundApproved.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['refundApproved.expectedEndTime']).isAfter(moment())) {
                    return {
                        style: {
                            backgroundColor: 'yellow'
                        }
                    };
                }
                else if (moment().isAfter(moment(o.row['refundApproved.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
            }
            else {
                if (o.row['refundApproved.expectedEndTime'] && moment(o.row['refundApproved.endTime']).isAfter(moment(o.row['refundApproved.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
        }
        return {};
    }
}, {
    Header: 'Refund Approved Resolved By',
    accessor: 'orderlineProcess.refundApproved.resolvedBy',
}, {
    Header: 'Refund Approved Status',
    accessor: 'orderlineProcess.refundApproved.status',
}, {
    id: 'refundCalculated.endTime',
    Header: 'Refund Calculation End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.refundCalculated && o.orderlineProcess.refundCalculated.endTime ? moment(o.orderlineProcess.refundCalculated.endTime).format('lll') : '',
    getProps: (state, o, column) => {
        if (o && o.row['refundCalculated.endTime']) {
            if (o.row['refundCalculated.expectedEndTime'] && moment(o.row['refundCalculated.endTime']).isAfter(moment(o.row['refundCalculated.expectedEndTime']))) {
                return {
                    style: {
                        backgroundColor: 'red'
                    }
                };
            }
            else {
                return {
                    style: {
                        backgroundColor: 'green'
                    }
                };
            }
        }
        return {};
    }
}, {
    id: 'refundCalculated.expectedEndTime',
    Header: 'Refund Calculation Expected End Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.refundCalculated && o.orderlineProcess.refundCalculated.expectedEndTime ? moment(o.orderlineProcess.refundCalculated.expectedEndTime).format('lll') : '',
    getProps: (state, o, column) => {
        if (o && o.row['refundCalculated']) {
            if (!o.row['refundCalculated.endTime']) {

                if (o.row['refundCalculated.expectedEndTime'] && moment().isAfter(moment(o.row['refundCalculated.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['refundCalculated.expectedEndTime']).isAfter(moment())) {
                    return {
                        style: {
                            backgroundColor: 'yellow'
                        }
                    };
                }
                else if (moment().isAfter(moment(o.row['refundCalculated.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
            }
            else {
                if (o.row['refundCalculated.expectedEndTime'] && moment(o.row['refundCalculated.endTime']).isAfter(moment(o.row['refundCalculated.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
        }
        return {};
    }
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
    Header: 'Order Status',
    accessor: 'orderlineProcess.status',
}, {
    Header: 'Customer Email Id',
    accessor: 'profile.email',
}, {
    id: 'name',
    Header: 'Customer Name',
    accessor: o => o.profile.firstName + ' ' + o.profile.lastName,
}, {
    Header: 'Customer Phone Number',
    accessor: 'profile.phoneNumber',
}, {
    Header: 'Customer Address',
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
    Header: 'Product Look No.',
    accessor: 'product.lookNumber',
}, {
    id: 'gender',
    Header: 'Gender',
    accessor: o => o.product.url ? o.product.url.split('/')[0] : '',
}, {
    Header: 'SKU',
    accessor: 'product.sku',
}, {
    id: 'deliveryDate',
    Header: 'Delivery Date',
    accessor: o => moment(o.deliveryDateUTC).format('DD-MM-YYYY'),
}, {
    id: 'occasionDate',
    Header: 'Occasion Date',
    accessor: o => moment(o.occasionDateUTC).format('DD-MM-YYYY'),
}, {
    id: 'netAmount',
    Header: 'Net Amount',
    accessor: o => o.price + o.deposit,
}, {
    Header: 'Payment Status',
    accessor: 'currentStatus',
}, {
    Header: 'Payment Type',
    accessor: 'parentOrder.paymentType',
}
];

export const runnerDeliveryColumns = [
    {
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
    }, {
        Header: 'Is Order Active',
        accessor: 'orderlineProcess.active',
    }, {
        id: 'delivered.endTime',
        Header: 'Delivered EndTime',
        accessor: o => o.orderlineProcess && o.orderlineProcess.delivered && o.orderlineProcess.delivered.endTime ? moment(o.orderlineProcess.delivered.endTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['delivered.endTime']) {
                if (o.row['delivered.expectedEndTime'] && moment(o.row['delivered.endTime']).isAfter(moment(o.row['delivered.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
            return {};
        }
    }, {
        id: 'delivered.expectedEndTime',
        Header: 'Delivered Expected EndTime',
        accessor: o => o.orderlineProcess && o.orderlineProcess.delivered && o.orderlineProcess.delivered.expectedEndTime ? moment(o.orderlineProcess.delivered.expectedEndTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['delivered']) {
                if (!o.row['delivered.endTime']) {

                    if (o.row['delivered.expectedEndTime'] && moment().isAfter(moment(o.row['delivered.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['delivered.expectedEndTime']).isAfter(moment())) {
                        return {
                            style: {
                                backgroundColor: 'yellow'
                            }
                        };
                    }
                    else if (moment().isAfter(moment(o.row['delivered.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                }
                else {
                    if (o.row['delivered.expectedEndTime'] && moment(o.row['delivered.endTime']).isAfter(moment(o.row['delivered.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                    else {
                        return {
                            style: {
                                backgroundColor: 'green'
                            }
                        };
                    }
                }
            }
            return {};
        }
    }, {
        Header: 'Delivery Status',
        accessor: 'orderlineProcess.delivered.status',
    }, {
        id: 'deliveryLink',
        Header: 'Delivery link',
        accessor: o => o.orderlineProcess && o.orderlineProcess.deliverylogisticResourceInfo && o.orderlineProcess.deliverylogisticResourceInfo.link ? <a href={o.orderlineProcess.deliverylogisticResourceInfo.link} target="blank">Link</a> : 'N/A',
    }, {
        id: 'Delivery Message',
        Header: 'Delivery Message',
        accessor: o => o.orderlineProcess && o.orderlineProcess.deliverylogisticResourceInfo && o.orderlineProcess.deliverylogisticResourceInfo.message ? JSON.parse(o.orderlineProcess.deliverylogisticResourceInfo.message).WayBillGenerationStatus.StatusInformation : '',
    }, {
        Header: 'OutForDelivery Status',
        accessor: 'orderlineProcess.outForDelivery.status',
    }, {
        Header: 'Order Status',
        accessor: 'orderlineProcess.status',
    }, {
        Header: 'Customer Email Id',
        accessor: 'profile.email',
    }, {
        id: 'name',
        Header: 'Customer Name',
        accessor: o => o.profile.firstName + ' ' + o.profile.lastName,
    }, {
        Header: 'Customer Phone Number',
        accessor: 'profile.phoneNumber',
    }, {
        Header: 'Customer Address',
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
        Header: 'Product Look No.',
        accessor: 'product.lookNumber',
    }, {
        id: 'gender',
        Header: 'Gender',
        accessor: o => o.product.url ? o.product.url.split('/')[0] : '',
    }, {
        Header: 'SKU',
        accessor: 'product.sku',
    }, {
        id: 'deliveryDate',
        Header: 'Delivery Date',
        accessor: o => moment(o.deliveryDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'occasionDate',
        Header: 'Occasion Date',
        accessor: o => moment(o.occasionDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'netAmount',
        Header: 'Net Amount',
        accessor: o => o.price + o.deposit,
    }, {
        Header: 'Payment Status',
        accessor: 'currentStatus',
    }, {
        Header: 'Payment Type',
        accessor: 'parentOrder.paymentType',
    },
];

export const runnerPickupColumns = [
    {
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
    }, {
        Header: 'Is Order Active',
        accessor: 'orderlineProcess.active',
    }, {
        id: 'outForPickup.endTime',
        Header: 'Out For Pickup End Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.outForPickup && o.orderlineProcess.outForPickup.endTime ? moment(o.orderlineProcess.outForPickup.endTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['outForPickup.endTime']) {
                if (o.row['outForPickup.expectedEndTime'] && moment(o.row['outForPickup.endTime']).isAfter(moment(o.row['outForPickup.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
            return {};
        }
    }, {
        id: 'outForPickup.expectedEndTime',
        Header: 'Out For Pickup Expected End Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.outForPickup && o.orderlineProcess.outForPickup.expectedEndTime ? moment(o.orderlineProcess.outForPickup.expectedEndTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['outForPickup']) {
                if (!o.row['outForPickup.endTime']) {

                    if (o.row['outForPickup.expectedEndTime'] && moment().isAfter(moment(o.row['outForPickup.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['outForPickup.expectedEndTime']).isAfter(moment())) {
                        return {
                            style: {
                                backgroundColor: 'yellow'
                            }
                        };
                    }
                    else if (moment().isAfter(moment(o.row['outForPickup.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                }
                else {
                    if (o.row['outForPickup.expectedEndTime'] && moment(o.row['outForPickup.endTime']).isAfter(moment(o.row['outForPickup.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                    else {
                        return {
                            style: {
                                backgroundColor: 'green'
                            }
                        };
                    }
                }
            }
            return {};
        }
    }, {
        Header: 'Out For Pickup Status',
        accessor: 'orderlineProcess.outForPickup.status',
    }, {
        id: 'picked.endTime',
        Header: 'Picked End Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.picked && o.orderlineProcess.picked.endTime ? moment(o.orderlineProcess.picked.endTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['picked.endTime']) {
                if (o.row['picked.expectedEndTime'] && moment(o.row['picked.endTime']).isAfter(moment(o.row['picked.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
            return {};
        }
    }, {
        id: 'picked.expectedEndTime',
        Header: 'Picked Expected End Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.picked && o.orderlineProcess.picked.expectedEndTime ? moment(o.orderlineProcess.picked.expectedEndTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['picked']) {
                if (!o.row['picked.endTime']) {

                    if (o.row['picked.expectedEndTime'] && moment().isAfter(moment(o.row['picked.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['picked.expectedEndTime']).isAfter(moment())) {
                        return {
                            style: {
                                backgroundColor: 'yellow'
                            }
                        };
                    }
                    else if (moment().isAfter(moment(o.row['picked.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                }
                else {
                    if (o.row['picked.expectedEndTime'] && moment(o.row['picked.endTime']).isAfter(moment(o.row['picked.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                    else {
                        return {
                            style: {
                                backgroundColor: 'green'
                            }
                        };
                    }
                }
            }
            return {};
        }
    }, {
        Header: 'Pick-up Status',
        accessor: 'orderlineProcess.picked.status',
    }, {
        Header: 'Customer Email Id',
        accessor: 'profile.email',
    }, {
        id: 'name',
        Header: 'Customer Name',
        accessor: o => o.profile.firstName + ' ' + o.profile.lastName,
    }, {
        Header: 'Customer Phone Number',
        accessor: 'profile.phoneNumber',
    }, {
        Header: 'Customer Address',
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
        Header: 'Product Look No.',
        accessor: 'product.lookNumber',
    }, {
        id: 'gender',
        Header: 'Gender',
        accessor: o => o.product.url ? o.product.url.split('/')[0] : '',
    }, {
        Header: 'SKU',
        accessor: 'product.sku',
    }, {
        id: 'deliveryDate',
        Header: 'Delivery Date',
        accessor: o => moment(o.deliveryDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'occasionDate',
        Header: 'Occasion Date',
        accessor: o => moment(o.occasionDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'netAmount',
        Header: 'Net Amount',
        accessor: o => o.price + o.deposit,
    }, {
        Header: 'Payment Status',
        accessor: 'currentStatus',
    }, {
        Header: 'Payment Type',
        accessor: 'parentOrder.paymentType',
    },
];

export const warehouseDispatchColumns = [{
    id: 'Order Id',
    Header: 'Order Id',
    accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
}, {
    Header: 'Is Order Active',
    accessor: 'orderlineProcess.active',
}, {
    Header: 'Delivery Status',
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
    Header: 'Dispatch Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.dispatched && o.orderlineProcess.dispatched.endTime ? moment(o.orderlineProcess.dispatched.endTime).format('lll') : '',
    getProps: (state, o, column) => {
        if (o && o.row['dispatched.endTime']) {
            if (moment(o.row['dispatched.endTime']).isAfter(moment(o.row['dispatched.expectedEndTime']))) {
                return {
                    style: {
                        backgroundColor: 'red'
                    }
                };
            }
            else {
                return {
                    style: {
                        backgroundColor: 'green'
                    }
                };
            }
        }
        return {};
    }
}, {
    id: 'dispatched.expectedEndTime',
    Header: 'Dispatch Expected Time',
    accessor: o => o.orderlineProcess && o.orderlineProcess.dispatched && o.orderlineProcess.dispatched.expectedEndTime ? moment(o.orderlineProcess.dispatched.expectedEndTime).format('lll') : '',
    getProps: (state, o, column) => {
        if (o && o.row['dispatched']) {
            if (!o.row['dispatched.endTime']) {

                if (o.row['dispatched.expectedEndTime'] && moment().isAfter(moment(o.row['dispatched.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['dispatched.expectedEndTime']).isAfter(moment())) {
                    return {
                        style: {
                            backgroundColor: 'yellow'
                        }
                    };
                }
                else if (moment().isAfter(moment(o.row['dispatched.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
            }
            else {
                if (o.row['dispatched.expectedEndTime'] && moment(o.row['dispatched.endTime']).isAfter(moment(o.row['dispatched.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
        }
        return {};
    }
}, {
    Header: 'Dispatch Resolved By',
    accessor: 'orderlineProcess.dispatched.resolvedBy',
}, {
    Header: 'Dispatched Status',
    accessor: 'orderlineProcess.dispatched.status',
}, {
    id: 'Next Action SLA',
    Header: 'Next Action SLA',
    accessor: o => o.orderlineProcess && o.orderlineProcess.nextActionSla ? moment(o.orderlineProcess.nextActionSla).format('lll') : '',
}, {
    Header: 'Order Status',
    accessor: 'orderlineProcess.status',
}, {
    Header: 'Customer Email Id',
    accessor: 'profile.email',
}, {
    id: 'name',
    Header: 'Customer Name',
    accessor: o => o.profile.firstName + ' ' + o.profile.lastName,
}, {
    Header: 'Customer Phone Number',
    accessor: 'profile.phoneNumber',
}, {
    Header: 'Customer Address',
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
    Header: 'Product Look No.',
    accessor: 'product.lookNumber',
}, {
    id: 'gender',
    Header: 'Gender',
    accessor: o => o.product.url ? o.product.url.split('/')[0] : '',
}, {
    Header: 'SKU',
    accessor: 'product.sku',
}, {
    Header: "Product's Designer",
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
    id: 'netAmount',
    Header: 'Net Amount',
    accessor: o => o.price + o.deposit,
}, {
    Header: 'Rental Amount',
    accessor: 'price',
}, {
    Header: 'Deposit Amount',
    accessor: 'deposit',
}, {
    id: 'loss',
    Header: 'Loss',
    accessor: o => o.price - o.invoicePrice,
}, {
    Header: 'Payment Status',
    accessor: 'currentStatus',
}, {
    Header: 'Payment Type',
    accessor: 'parentOrder.paymentType',
},
];

export const warehouseReceiveColumns = [
    {
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
    }, {
        Header: 'Is Order Active',
        accessor: 'orderlineProcess.active',
    }, {
        Header: 'Non NCR order',
        accessor: 'orderlineProcess.outstation',
    }, {
        id: 'picked.endTime',
        Header: 'Picked End Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.picked && o.orderlineProcess.picked.endTime ? moment(o.orderlineProcess.picked.endTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['picked.endTime']) {
                if (o.row['picked.expectedEndTime'] && moment(o.row['picked.endTime']).isAfter(moment(o.row['picked.expectedEndTime']))) {
                    return {
                        style: {
                            backgroundColor: 'red'
                        }
                    };
                }
                else {
                    return {
                        style: {
                            backgroundColor: 'green'
                        }
                    };
                }
            }
            return {};
        }
    }, {
        id: 'picked.expectedEndTime',
        Header: 'Picked Expected End Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.picked && o.orderlineProcess.picked.expectedEndTime ? moment(o.orderlineProcess.picked.expectedEndTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['picked']) {
                if (!o.row['picked.endTime']) {

                    if (o.row['picked.expectedEndTime'] && moment().isAfter(moment(o.row['picked.expectedEndTime']).subtract(6, 'hours')) && moment(o.row['picked.expectedEndTime']).isAfter(moment())) {
                        return {
                            style: {
                                backgroundColor: 'yellow'
                            }
                        };
                    }
                    else if (moment().isAfter(moment(o.row['picked.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                }
                else {
                    if (o.row['picked.expectedEndTime'] && moment(o.row['picked.endTime']).isAfter(moment(o.row['picked.expectedEndTime']))) {
                        return {
                            style: {
                                backgroundColor: 'red'
                            }
                        };
                    }
                    else {
                        return {
                            style: {
                                backgroundColor: 'green'
                            }
                        };
                    }
                }
            }
            return {};
        }
    }, {
        Header: 'Pick-up Status',
        accessor: 'orderlineProcess.picked.status',
    }, {
        Header: 'Is Pick-up Active',
        accessor: 'orderlineProcess.pickupActive',
    }, {
        Header: 'Pick-up Status',
        accessor: 'orderlineProcess.picked.status',
    }, {
        Header: 'Is Pick-up Active',
        accessor: 'orderlineProcess.pickupActive',
    }, {
        Header: 'Pickup AWB No',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.awbNo',
    }, {
        Header: 'Pickup Link',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.link',
    }, {
        Header: 'Pickup Message',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.message',
    }, {
        Header: 'Pickup Runner Contact',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerContact',
    }, {
        Header: 'Pickup Runner Id',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerId',
    }, {
        Header: 'Pickup Runner Name',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerName',
    }, {
        Header: 'Customer Email Id',
        accessor: 'profile.email',
    }, {
        id: 'name',
        Header: 'Customer Name',
        accessor: o => o.profile.firstName + ' ' + o.profile.lastName,
    }, {
        Header: 'Customer Phone Number',
        accessor: 'profile.phoneNumber',
    }, {
        Header: 'Customer Address',
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
        Header: 'Product Look No.',
        accessor: 'product.lookNumber',
    }, {
        id: 'gender',
        Header: 'Gender',
        accessor: o => o.product.url ? o.product.url.split('/')[0] : '',
    }, {
        Header: 'SKU',
        accessor: 'product.sku',
    }, {
        id: 'deliveryDate',
        Header: 'Delivery Date',
        accessor: o => moment(o.deliveryDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'occasionDate',
        Header: 'Occasion Date',
        accessor: o => moment(o.occasionDateUTC).format('DD-MM-YYYY'),
    }, {
        id: 'netAmount',
        Header: 'Net Amount',
        accessor: o => o.price + o.deposit,
    }, {
        Header: 'Payment Status',
        accessor: 'currentStatus',
    }, {
        Header: 'Payment Type',
        accessor: 'parentOrder.paymentType',
    },
];

