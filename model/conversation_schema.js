import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants_email: {
        type: [String],
        required: true
    }
})

//check if already schema, if not create a new schema
const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema)
export default Conversation;