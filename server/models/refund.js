import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const refundLogSchema = new Schema({
    orderId: {
        type: 'String'
    },
    orderLineId: {
        type: 'String'
    },
    createdDate: {
        type: 'Date',
        default: Date.now
    },
    createdBy: {
        type: 'String',
    },
    amount: {
        type: 'Number',
    },
    looknumber: {
        type: 'String',
    },
    customerId: {
        type: 'String',
    },
    refunded: {
        type: 'Boolean'
    },
    refundedDate: {
        type: 'Date'
    },
    phoneNumber: {
        type: 'Number',
    },
    accountHolder: {
        type: 'String'
    },
    accountType: {
        type: 'String'
    },
    bank: {
        type: 'String'
    },
    branch: {
        type: 'String'
    },
    accountNumber: {
        type: 'String'
    },
    ifscCode: {
        type: 'String'
    },
    bankDetailsProvidedOn: {
        type: 'Date'
    },
    bankDetailsProvided: {
        type: 'Boolean'
    }
});

export default mongoose.model('RefundLog', refundLogSchema);