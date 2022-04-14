const Joi = require("joi");
const authSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(8).max(20).required(),
    image_url: Joi.string().required(),
});

module.exports = authSchema;
