import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const scanSchema = new Schema({
    sku: {
        type: 'String',
        required: true,
    },
    location: {
        type: 'String',
        enum: ['store-sdn', 'warehouse-sdn', 'store-hkv', 'store-scw', 'cafe-we', 'office', 'customer', 'dc', 'popup', 'warehouse-nfc', 'bus'],
        required: true
    },
    scannedBy: {
        type: 'String',
        required: true
    },
    reason: {
        type: 'String',
        enum: ['item received', 'send to sadhna warehouse', 'send to sadhna store', 'send to nfc', 'send to hkv', 'send to city walk', 'send to office', 'send to customer', 'send to dc', 'send to popup', 'send to bus', 'reconcile'],
        required: true
    },
    timestamp: {
        type: 'Date',
        required: true,
    }
});

export default mongoose.model('Scan', scanSchema);