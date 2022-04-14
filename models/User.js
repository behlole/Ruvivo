const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 25,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true
    }
});

exports.User = new mongoose.model("User", userSchema);
exports.userSchema = userSchema;
