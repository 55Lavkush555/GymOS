import mongoose from 'mongoose';
const { Schema } = mongoose;

const attendanceSchema = new Schema({
    ownerClerkId: {
        type: String,
        required: true,
    },
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true,
        unique: true,
    },
    totalVisits: {
        type: Number,
        default: 0,
    },
    attendanceRecords: {
        type: [Date],
        default: [],
    },
},
    {
        timestamps: true,
    }

);

const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
export default Attendance;