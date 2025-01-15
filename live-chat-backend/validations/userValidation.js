const Joi = require("joi");

exports.registerUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
});
