const Joi = require("joi");
const postSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    file: Joi.string().required(),
    UserId: Joi.string().required(),
});

module.exports = postSchema;
