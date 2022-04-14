const {User} = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authSchema = require("../Helpers/UserSchemaValidator");

module.exports = {
    index: (req, res) => {
        return res.json({message: 'Hello World !'})
    },
    register: async (req, res) => {
        try {

            const validationResult = await authSchema.validateAsync(req.body);
            let user = await User.findOne({email: req.body.email});
            if (user) {
                res.send({error: "User Already Exists"});
            }
            const token = jwt.sign(
                {
                    email: req.body.email,
                    password: req.body.email,
                },
                process.env.JWT_SECRET,
                {expiresIn: "20m"}
            );

            user = new User({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                image: req.body.image_url
            });
            const result = await user.save();
            let user_to_return = {
                _id: result._id,
                email: result.email,
                image: result.image,
            }
            if (!user) {
                res.send({error: "No User Entered"});
            }
            // delete result.password;
            res.send({
                user: user_to_return,
                token: token
            });

        } catch (e) {
            res.send({
                message: e.message,
            })
        }

    },
    login: async (req, res) => {
        const user = await User.findOne({email: req.body.email});
        const secret = process.env.JWT_SECRET;
        if (!user) {
            return res.status(404).json({error: "No user found!"});
        }
        let token = null;
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            token = jwt.sign(
                {
                    userId: user._id,
                },
                secret,
                {expiresIn: "1d"}
            );
            res.header("x-auth-token", token);
        } else {
            res.status(400).send("Wrong Password");
        }
        res.send(
            {
                user: user,
                token: token
            }
        );
    },
}

