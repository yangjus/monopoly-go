import mongoose from "mongoose";
import { stickers } from "../constants/stickers";

const initialInventory = new Array(stickers.length).fill(0);

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: false
    },
    invite: {
        type: String,
        required: false
    },
    social: {
        type: String,
        required: true
    },
    trusted: {
        type: Boolean,
        required: true
    },
    inventory: {
        type: [Number],
        required: true
    },
})
//check if already schema, if not create a new schema
const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User;