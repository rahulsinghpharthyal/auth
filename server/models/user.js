// Packages:-
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png",
    },
    refreshToken: {
        type: String,
    },

},{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;