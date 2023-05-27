import mongoose from "mongoose";

//conversation id is the unique _id default field for a conversation object
const globalChatSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
})

//check if already schema, if not create a new schema
const GlobalChat = mongoose.models.GlobalChat || mongoose.model('global_chat', globalChatSchema)
export default GlobalChat;