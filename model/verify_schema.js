import mongoose from "mongoose";

const verifySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    email_verified: {
        type: Boolean,
        required: true
    }
})

//check if already schema, if not create a new schema
const Verify = mongoose.models.Verify || mongoose.model('Verify', verifySchema)
export default Verify;