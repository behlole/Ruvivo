const {Post} = require("../models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const postSchema = require("../Helpers/postSchemaValidator");

module.exports = {
    index: async (req, res) => {
        let posts = null;
        console.log(req.body.UserId)
        if (req.param("id"))
            posts = await Post.findOne({_id: req.param("id"), UserId: req.body.UserId});
        else
            posts = await Post.find({UserId: req.body.UserId});
        return res.json(
            {
                posts: posts,
                message: "Posts fetched successfully"
            }
        );
    },
    create: async (req, res) => {
        try {
            console.log(req.file);
            req.body.file = req.file.path;
            const validationResult = await postSchema.validateAsync(req.body);

            let post = await Post.create(req.body);
            return res.send({
                post: post,
                message: "Post created successfully"
            })

        } catch (e) {
            res.send({
                message: e.message
            })
        }
    },
    delete: async (req, res) => {
        try {
            if (req.param("id")) {
                let post = await Post.findOne({_id: req.param("id"), UserId: req.body.UserId});
                if (!post) {
                    throw Error("No Post found");
                } else {
                    Post.deleteOne({_id: req.param("id"), UserId: req.body.UserId}).then(function () {
                        res.send({
                            "message": "Post Deleted Successfully",
                            "post": post
                        }) // Success
                    }).catch(function (error) {
                        throw Error(error.message)// Failure
                    });
                }
            } else {
                throw Error("ID Not found");
            }
        } catch (e) {
            res.send({
                message: e.message
            })
        }
    }
}

