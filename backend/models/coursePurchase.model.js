import mongoose from "mongoose";

const coursePurchaseSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    paymentId: {
        type: String,
        required: true
    },
    transactionId: {
        type: String, // Remove unique: true if present
        default: null
    }
}, { timestamps: true });

const CoursePurchase = mongoose.model('CoursePurchase', coursePurchaseSchema);

export default CoursePurchase;