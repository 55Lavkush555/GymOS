import mongoose from 'mongoose';
const { Schema } = mongoose;

const memberSchema = new Schema({
    ownerId: {
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
    joinedAt: {
        type: Date,
        default: Date.now,
    },
    planEndDate: {
        type: Date,
        required: true,
    },
    age: {
        type: Number,
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