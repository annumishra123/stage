import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const materialSchema = new Schema({
    title: {
        type: 'String',
        required: true,
        unique: true
    },
    measurementType: {
        type: 'String',
        enum: ['meters', 'pieces'],
        required: true
    },
    availableQuantity: {
        type: 'Number',
        required: true
    },
    price: {
        type: 'Number',
        required: true
    },
    alertOffset: {
        type: 'Number',
        required: true
    },
    alert: {
        type: 'Boolean',
        required: true,
        default: false
    }
});

export default mongoose.model('Material', materialSchema);