import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const refundLogSchema = new Schema({
    orderId: {
        type: 'String',
        required: true,
    },
    orderLineId: {
        type: 'String',
        required: true
    },
    createdDate: {
        type: 'Date',
        default: Date.now,
        required: true
    },
    createdBy: {
        type: 'String',
        required: true
    },
    amount: {
        type: 'Number',
        required: true
    },
    looknumber: {
        type: 'String',
        required: true
    },
    customerId: {
        type: 'String',
        required: true
    },
    refunded: {
        type: 'Boolean',
        required: true,
        default: false
    }
});

export default mongoose.model('RefundLog', refundLogSchema);