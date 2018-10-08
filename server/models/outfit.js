import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const outfitSchema = new Schema({
    title: {
        type: 'String',
        required: true
    },
    composition: {
        type: 'Object',
        required: true
    },
    availableQuantity: {
        type: 'Number',
        required: true,
    },
    soldQuantity: {
        type: 'Number',
        required: true
    },
    pipelineQuantity: {
        type: 'Number',
        required: true
    },
    pipelineOffset: {
        type: 'Number',
        required: true
    },
});

export default mongoose.model('Outfit', outfitSchema);