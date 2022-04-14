const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    file: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    UserId: {
        type: String,
        required: true,
    }
});

exports.Post = new mongoose.model("Post", postSchema);
exports.userSchema = postSchema;
