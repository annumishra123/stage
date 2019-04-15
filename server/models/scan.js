import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const scanSchema = new Schema({
    sku: {
        type: 'String',
        required: true,
    },
    location: {
        type: 'String',
        enum: ['store-hkv', 'store-rjg', 'cafe-we', 'office', 'customer', 'dc', 'popup'],
        required: true
    },
    scannedBy: {
        type: 'String',
        required: true
    },
    reason: {
        type: 'String',
        enum: ['item received', 'send to hkv', 'send to rajouri', 'send to cafe-we', 'send to office', 'send to customer', 'send to dc', 'send to popup', 'reconcile'],
        required: true
    },
    timestamp: {
        type: 'Date',
        required: true,
    }
});

export default mongoose.model('Scan', scanSchema);