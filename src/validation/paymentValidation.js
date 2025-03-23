const Joi = require('joi');

/** Payment validation */
const paymentSchema = Joi.object({
	description: Joi.string().required(),
	billing_name: Joi.string().required(),
	billing_email: Joi.string().required(),
	billing_phone: Joi.string().required(),
	line_item_amount: Joi.number().required(),
	line_item_name: Joi.string().required(),
	line_item_quantity: Joi.number().required(),
	currency: Joi.string().required(),
	payment_method: Joi.string().valid('card', 'gcash', 'paymaya', 'grab_pay').required(),
});
module.exports.validatePaymentSchema = (data) => {
	return paymentSchema.validate(data);
}

/** Payment status update validation */
const paymentStatusUpdateSchema = Joi.object({
	ref: Joi.string().required(),
});
module.exports.validatePaymentStatusUpdateSchema = (data) => {
	return paymentStatusUpdateSchema.validate(data);
}