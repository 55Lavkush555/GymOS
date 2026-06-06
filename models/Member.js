import mongoose from 'mongoose';
const { Schema } = mongoose;

const memberSchema = new Schema({
    ownerClerkId: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    age: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    notes: {
        type: String,
    }
});

const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);
export default Member;