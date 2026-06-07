import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pastData: {
        type: Map,
        of: {
            revenue: {
                type: Number,
                default: 0,
            },
            members: {
                type: Number,
                default: 0,
            },
        },
        default: {},
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
    planEndDate: {
        type: Date,
        required: true,
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;