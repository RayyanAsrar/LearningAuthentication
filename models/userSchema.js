// construct user schema and model for Sign Up API with fullName,LastName,gender, email , password
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    gender
        : {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
const User = mongoose.model("User", userSchema);

export default User;