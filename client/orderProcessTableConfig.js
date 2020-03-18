import moment from 'moment';
import React from 'react';

export const logisticsDeliveryNCRColumns = [
    {
        Header: 'Status',
        accessor: 'orderlineProcess.deliveryLogisticResourceAssigned.status',
    },
    {
        Header: 'Delivery Runner Contact',
        accessor: 'orderlineProcess.deliverylogisticResourceInfo.runnerContact',
    }, {
        Header: 'Delivery Runner Id',
        accessor: 'orderlineProcess.deliverylogisticResourceInfo.runnerId',
    }, {
        Header: 'Delivery Runner Name',
        accessor: 'orderlineProcess.deliverylogisticResourceInfo.runnerName',
    }, {
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
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
        id: 'deliveryDate',
        Header: 'Delivery Date',
        accessor: o => moment(o.deliveryDateUTC).format('DD-MM-YYYY'),
    }
];

export const logisticsDeliveryNonNCRColumns = [
    {
        Header: 'Status',
        accessor: 'orderlineProcess.deliveryLogisticResourceAssigned.status',
    },
    {
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
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
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
        id: 'deliveryDate',
        Header: 'Delivery Date',
        accessor: o => moment(o.deliveryDateUTC).format('DD-MM-YYYY'),
    }
];

export const logisticsPickupNCRColumns = [
    {
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
        Header: 'Pickup Runner Contact',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerContact',
    }, {
        Header: 'Pickup Runner Id',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerId',
    }, {
        Header: 'Pickup Runner Name',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerName',
    }, {
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
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
        id: 'pickupDate',
        Header: 'Pickup Date',
        accessor: o => moment(o.pickupDateUTC).format('DD-MM-YYYY'),
    }
];

export const logisticsPickupNonNCRColumns = [
    {
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
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
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
        id: 'pickupDate',
        Header: 'Pickup Date',
        accessor: o => moment(o.pickupDateUTC).format('DD-MM-YYYY'),
    }
];

export const qaDeductionsColumns = [
    {
        Header: 'QC3 Resolved By',
        accessor: 'orderlineProcess.qc3.resolvedBy',
    }, {
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
    }, {
        Header: 'Product Name',
        accessor: 'product.name',
    }, {
        Header: 'Product Look No.',
        accessor: 'product.lookNumber',
    }, {
        Header: 'SKU',
        accessor: 'product.sku',
    }
];

export const qaPostOrderColumns = [
    {
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
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
    }, {
        Header: 'Product Name',
        accessor: 'product.name',
    }, {
        Header: 'Product Look No.',
        accessor: 'product.lookNumber',
    }, {
        Header: 'SKU',
        accessor: 'product.sku',
    }
];

export const refundColumns = [
    {
        Header: 'Refund',
        accessor: 'orderlineProcess.refundAmount',
    }, {
        Header: 'Damage',
        accessor: 'orderlineProcess.calulatedDamageAmount',
    }, {
        id: 'netAmount',
        Header: 'Net Amount',
        accessor: o => o.price + o.deposit,
    }, {
        Header: 'Price',
        accessor: 'price',
    }, {
        Header: 'Deposit',
        accessor: 'deposit',
    }, {
        Header: 'Payment Status',
        accessor: 'parentOrder.status',
    }, {
        Header: 'Reason',
        accessor: 'orderlineProcess.damageReason',
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
        Header: 'Refund Calculation Resolved By',
        accessor: 'orderlineProcess.refundCalculated.resolvedBy',
    }, {
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
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
    }
];

export const runnerDeliveryColumns = [
    {
        id: 'Collectable Amount',
        Header: 'Collectable Amount',
        accessor: 'orderlineProcess.collectableAmount',
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
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
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
        id: 'deliveryDate',
        Header: 'Delivery Date',
        accessor: o => moment(o.deliveryDateUTC).format('DD-MM-YYYY'),
    }
];

export const runnerPickupColumns = [
    {
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
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
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
        id: 'pickupDate',
        Header: 'Pickup Date',
        accessor: o => moment(o.pickupDateUTC).format('DD-MM-YYYY'),
    }
];

export const warehouseDispatchColumns = [{
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
    Header: 'Dispatched Status',
    accessor: 'orderlineProcess.dispatched.status',
}, {
    id: 'Order Id',
    Header: 'Order Id',
    accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
}, {
    Header: 'SKU',
    accessor: 'product.sku',
}, {
    id: 'dispatchDate',
    Header: 'Dispatch Date',
    accessor: o => moment(o.dispatchDateUTC).format('DD-MM-YYYY'),
}
];

export const warehouseReceiveColumns = [
    {
        id: 'orderlineProcess.received.expectedEndTime',
        Header: 'ETA',
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
        Header: 'Pick-up Status',
        accessor: 'orderlineProcess.picked.status',
    }, {
        Header: 'Pickup AWB No',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.awbNo',
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
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
    }, {
        Header: 'SKU',
        accessor: 'product.sku',
    }, {
        id: 'receivedDate',
        Header: 'Receival Date',
        accessor: o => moment(o.receivedDateUTC).format('DD-MM-YYYY'),
    }
];

export const completeOrderProcessColumns = [
    {
        id: 'Order Id',
        Header: 'Order Id',
        accessor: o => `${o.parentOrder.frontendOrderId}_${o.product.sku}`,
    }, {
        id: 'orderDate',
        Header: 'Order Date',
        accessor: o => moment(o.parentOrder.orderDate).format('lll'),
    }, {
        Header: 'SKU',
        accessor: 'product.sku',
    }, {
        Header: 'Order Status',
        accessor: 'parentOrder.status',
    }, {
        Header: 'Orderline Status',
        accessor: 'currentStatus',
    }, {
        Header: 'Order Modifier',
        accessor: 'parentOrder.modifier',
    }, {
        Header: 'Order Process Status',
        accessor: 'orderlineProcess.status',
    }, {
        id: 'Is Order Active',
        Header: 'Is Order Active',
        accessor: o => !o.orderlineProcess ? "-" : o.orderlineProcess.active ? "Yes" : "No",
    }, {
        id: 'Destination',
        Header: 'Destination',
        accessor: o => !o.orderlineProcess ? "-" : o.orderlineProcess.isOutstation ? "NON NCR" : "NCR"
    }, {
        id: 'Next Action SLA',
        Header: 'Next Action SLA',
        accessor: o => o.orderlineProcess && o.orderlineProcess.nextActionSla ? moment(o.orderlineProcess.nextActionSla).format('lll') : '',
    }, {
        Header: 'Delivery Logistic Status',
        accessor: 'orderlineProcess.deliveryLogisticResourceAssigned.status',
    }, {
        Header: 'Delivery Assigned By',
        accessor: 'orderlineProcess.deliveryLogisticResourceAssigned.resolvedBy',
    }, {
        id: 'Delivery Logistic EndTime',
        Header: 'Delivery Logistic EndTime',
        accessor: o => o.orderlineProcess && o.orderlineProcess.deliveryLogisticResourceAssigned ? moment(o.orderlineProcess.deliveryLogisticResourceAssigned.endTime).format('lll') : '',
    }, {
        Header: 'Dispatched Status',
        accessor: 'orderlineProcess.dispatched.status',
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
        Header: 'Dispatched Assigned By',
        accessor: 'orderlineProcess.dispatched.resolvedBy',
    }, {
        Header: 'Delivery Runner Id',
        accessor: 'orderlineProcess.deliverylogisticResourceInfo.runnerId',
    }, {
        Header: 'Delivery Runner Name',
        accessor: 'orderlineProcess.deliverylogisticResourceInfo.runnerName',
    }, {
        Header: 'Delivery Runner Contact',
        accessor: 'orderlineProcess.deliverylogisticResourceInfo.runnerContact',
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
        id: 'OutForDelivery ETA',
        Header: 'OutForDelivery ETA',
        accessor: o => o.orderlineProcess && o.orderlineProcess.outForDelivery ? moment(o.orderlineProcess.outForDelivery.expectedEndTime).format('lll') : '',
    }, {
        Header: 'Delivery Status',
        accessor: 'orderlineProcess.delivered.status',
    }, {
        id: 'delivered.endTime',
        Header: 'Delivery End Time',
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
        Header: 'Pickup Resolved By',
        accessor: 'orderlineProcess.pickupLogisticResourceAssigned.resolvedBy',
    }, {
        Header: 'Pickup Status',
        accessor: 'orderlineProcess.pickupLogisticResourceAssigned.status',
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
        Header: 'Pickup Runner Contact',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerContact',
    }, {
        Header: 'Pickup Runner Id',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerId',
    }, {
        Header: 'Pickup Runner Name',
        accessor: 'orderlineProcess.pickuplogisticResourceInfo.runnerName',
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
        Header: 'Picked By',
        accessor: 'orderlineProcess.picked.resolvedBy',
    }, {
        Header: 'Pick-up Status',
        accessor: 'orderlineProcess.picked.status',
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
        Header: 'Received By',
        accessor: 'orderlineProcess.received.resolvedBy',
    }, {
        Header: 'Received Status',
        accessor: 'orderlineProcess.received.status',
    }, {
        id: 'orderlineProcess.received.expectedEndTime',
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
        id: 'received.endTime',
        Header: 'Received Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.received && o.orderlineProcess.received.endTime ? moment(o.orderlineProcess.received.endTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['received.endTime']) {
                if (moment(o.row['received.endTime']).isAfter(moment(o.row['received.expectedEndTime']))) {
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
        Header: 'QC3 Resolved By',
        accessor: 'orderlineProcess.qc3.resolvedBy',
    }, {
        Header: 'QC3 Current Status',
        accessor: 'orderlineProcess.qc3.status',
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
        id: 'qc3.endTime',
        Header: 'QC3 Logistic End Time',
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
        Header: 'QC3 Result Failure reason',
        accessor: 'orderlineProcess.qc3Result.failReason',
    }, {
        id: 'Is QC3 Result Passed',
        Header: 'Is QC3 Result Passed',
        accessor: o => !o.orderlineProcess ? "-" : o.orderlineProcess.qc3Result && o.orderlineProcess.qc3Result.pass ? "Yes" : "No"
    }, {
        Header: 'QC3 Result Additional Remarks ',
        accessor: 'orderlineProcess.qc3Result.remarks',
    }, {
        Header: 'Damage Reason',
        accessor: 'orderlineProcess.damageReason',
    }, {
        Header: 'Damage Amount',
        accessor: 'orderlineProcess.calulatedDamageAmount',
    }, {
        Header: 'Refund Calculation Resolved By',
        accessor: 'orderlineProcess.refundCalculated.resolvedBy',
    }, {
        Header: 'Refund Calculation Status',
        accessor: 'orderlineProcess.refundCalculated.status',
    }, {
        id: 'RefundCalculated.expectedEndTime',
        Header: 'RefundCalculated Expected End Time',
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
        id: 'RefundCalculated.endTime',
        Header: 'RefundCalculated End Time',
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
        Header: 'Refund Amount',
        accessor: 'orderlineProcess.refundAmount',
    }, {
        id: 'netAmount',
        Header: 'Net Amount',
        accessor: o => o.price + o.deposit,
    }, {
        Header: 'Refund Approved By',
        accessor: 'orderlineProcess.refundApproved.resolvedBy',
    }, {
        Header: 'Refund Approved Status',
        accessor: 'orderlineProcess.refundApproved.status',
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
        id: 'refundApproved.endTime',
        Header: 'Refund Approved Time',
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
        id: 'Collectable Amount By Runner',
        Header: 'Collectable Amount',
        accessor: 'orderlineProcess.collectableAmount',
    }, {
        id: 'orderlineProcess.received.expectedEndTime',
        Header: 'Receiving Expected End Time',
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
        id: 'received.endTime',
        Header: 'Receiving Time',
        accessor: o => o.orderlineProcess && o.orderlineProcess.received && o.orderlineProcess.received.endTime ? moment(o.orderlineProcess.received.endTime).format('lll') : '',
        getProps: (state, o, column) => {
            if (o && o.row['received.endTime']) {
                if (moment(o.row['received.endTime']).isAfter(moment(o.row['received.expectedEndTime']))) {
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
        Header: 'Measurements',
        accessor: 'measurementStatus',
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
    }, {
        id: 'Price',
        Header: 'Price',
        accessor: o => !isNaN(o.price) ? Math.round(o.price) : "-"
    }, {
        id: 'Deposit',
        Header: 'Deposit',
        accessor: o => !isNaN(o.deposit) ? Math.round(o.deposit) : "-"
    }, {
        id: 'orderType',
        Header: 'orderType',
        accessor: "orderType"
    }, {
        id: 'isSixDayRental',
        Header: 'isSixDayRental',
        accessor: o => o.isSixDayRental ? "Yes" : "No"
    }, {
        id: 'dispatchDate',
        Header: 'Dispatch Date',
        accessor: o => moment(o.dispatchDateUTC).format('DD-MM-YYYY'),
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
        id: 'receivedDate',
        Header: 'Receival Date',
        accessor: o => moment(o.receivedDateUTC).format('DD-MM-YYYY'),
    }, {
        Header: 'Product Name',
        accessor: 'product.name',
    }, {
        Header: "Product's Designer",
        accessor: 'product.designer',
    }, {
        Header: 'Owner',
        accessor: 'product.owner',
    }, {
        Header: 'Product Look No.',
        accessor: 'product.lookNumber',
    }
];