import mongoose from "mongoose";

//conversation id is the unique _id default field for a conversation object
const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
})

//check if already schema, if not create a new schema
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)
export default Message;