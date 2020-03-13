import moment from 'moment';
import React from 'react';

export const logisticsDeliveryNCRColumns = [
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

