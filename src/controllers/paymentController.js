const path = require('path');
/** Services */
const { createCheckoutSession } = require('../services/paymongoService');
/** Utilities */
const { formatPaymentAmount } = require('../utils/amountUtil');
const { generateReferenceCode } = require('../utils/codeGeneratorUtil');
/** Validations */
const paymentValidation = require('../validation/paymentValidation');

/** Create payment */
module.exports.createPaymentController = async (req, res) => {
	try {
		/** Validate body */
		const data = req.body;
		const validatedData = paymentValidation.validatePaymentSchema(data);
		if (validatedData.error) return res.status(400).json({ success: false, message: validatedData.error.message });
		/** Reference number */
		const refNum = generateReferenceCode("REF");
		/** Create checkout session */
		const checkoutSessionData = await createCheckoutSession({
			description: validatedData.value['description'],
			billing_name: validatedData.value['billing_name'],
			billing_email: validatedData.value['billing_email'],
			billing_phone: validatedData.value['billing_phone'],
			line_item_amount: formatPaymentAmount(validatedData.value['line_item_amount']),
			line_item_name: validatedData.value['line_item_name'],
			line_item_quantity: validatedData.value['line_item_quantity'],
			currency: validatedData.value['currency'],
			payment_method: validatedData.value['payment_method'],
			cancel_url: `${process.env.BASE_URL}/v1/payments/cancelled?ref=${refNum}`,
			success_url: `${process.env.BASE_URL}/v1/payments/success?ref=${refNum}`,
			reference_number: refNum,
		});
		/** Response */
		res.status(200).json({
			success: true,
			message: "Success",
			data: {
				id: checkoutSessionData['id'],
				type: checkoutSessionData['type'],
				checkout_url: checkoutSessionData['attributes']['checkout_url'],
			}
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false, message: "An error occured" });
	}
};

/** Update payment success */
module.exports.updatePaymentSuccessController = async (req, res) => {
	try {
		/** Validate query */
		const data = req.query;
		const validatedQueryData = paymentValidation.validatePaymentStatusUpdateSchema(data);
		if (validatedQueryData.error) return res.status(400).json({ success: false, message: validatedData.error.message });
		/** Response */
		res.redirect('/v1/payments/success');
	} catch (err) {
		console.log(err);
		return res.redirect('/v1/payments/failed');
	}
};

/** Update payment cancelled */
module.exports.updatePaymentCancelledController = async (req, res) => {
	try {
		/** Validate query */
		const data = req.query;
		const validatedQueryData = paymentValidation.validatePaymentStatusUpdateSchema(data);
		if (validatedQueryData.error) return res.status(400).json({ success: false, message: validatedData.error.message });
		/** Response */
		res.redirect('/v1/payments/cancelled');
	} catch (err) {
		console.log(err);
		return res.redirect('/v1/payments/failed');
	}
};

/** Get payment success screen */
module.exports.getPaymentSuccessScreenController = async (req, res) => {
	try {
		/** Response */
		res.sendFile(path.join(__dirname, '..', 'public', 'success.html'));
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false, message: "An error occured" });
	}
};

/** Get payment cancelled screen */
module.exports.getPaymentCancelledScreenController = async (req, res) => {
	try {
		/** Response */
		res.sendFile(path.join(__dirname, '..', 'public', 'cancelled.html'));
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false, message: "An error occured" });
	}
};

/** Get payment failed screen */
module.exports.getPaymentFailedScreenController = async (req, res) => {
	try {
		/** Response */
		res.sendFile(path.join(__dirname, '..', 'public', 'failed.html'));
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false, message: "An error occured" });
	}
};