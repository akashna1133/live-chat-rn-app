const Joi = require("joi");

exports.sendMessageSchema = Joi.object({
  fromUserId: Joi.string().uuid().required(),
  toUserId: Joi.string().uuid().required(),
  content: Joi.string().min(1).required(),
});
