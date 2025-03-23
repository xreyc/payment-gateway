const axios = require('axios');

module.exports.createCheckoutSession = async (data) => {
	try {
		const paymongo_public_key = process.env.PAYMONGO_PUBLIC_KEY;
		const paymongo_secret_key = process.env.PAYMONGO_SECRET_KEY;

		let base64EncodedKey = "";

		if (process.env.STAGE == "prod") {
			// NOTE: UNCOMMENT THIS ON REAL PRODUCTION
			// base64EncodedKey = Buffer.from(`${paymongo_public_key}:${paymongo_secret_key}`).toString('base64');
			base64EncodedKey = Buffer.from(paymongo_secret_key).toString('base64');
		} else {
			base64EncodedKey = Buffer.from(paymongo_secret_key).toString('base64');
		}

		const response = await axios.post(
			'https://api.paymongo.com/v1/checkout_sessions',
			{
				data: {
					attributes: {
						billing: {
							name: data['billing_name'],
							email: data['billing_email'],
							phone: data['billing_phone']
						},
						send_email_receipt: false,
						show_description: true,
						show_line_items: true,
						description: data['description'],
						line_items: [
							{
								currency: data['currency'],
								amount: data['line_item_amount'],
								name: data['line_item_name'],
								quantity: data['line_item_quantity']
							}
						],
						payment_method_types: [data['payment_method']],
						cancel_url: data['cancel_url'],
						success_url: data['success_url'],
						reference_number: data['reference_number'],
					}
				}
			},
			{
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Basic ${base64EncodedKey}`
				}
			}
		);
		const results = response.data['data'];
		return results;
	} catch (err) {
		throw err;
	}
}

module.exports.getCheckoutSession = async (data) => {
	try {
		const paymongo_public_key = process.env.PAYMONGO_PUBLIC_KEY;
		const paymongo_secret_key = process.env.PAYMONGO_SECRET_KEY;

		let base64EncodedKey = "";

		if (process.env.STAGE == "prod") {
			base64EncodedKey = Buffer.from(`${paymongo_public_key}:${paymongo_secret_key}`).toString('base64');
		} else {
			base64EncodedKey = Buffer.from(paymongo_secret_key).toString('base64');
		}

		const response = await axios.get(
			`https://api.paymongo.com/v1/checkout_sessions/${data['checkout_session_id']}`,
			{
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Basic ${base64EncodedKey}`
				}
			}
		);
		const results = response.data['data'];
		return results;
	} catch (err) {
		throw err;
	}
}