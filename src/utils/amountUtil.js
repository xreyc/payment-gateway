module.exports.formatPaymentAmount = (amount) => {
	// Check if the input is a number
	if (typeof amount !== 'number') {
		throw new Error('Input must be a number');
	}
	// Multiply by 100 to shift decimal places two places to the right
	const formattedAmount = Math.round(amount * 100);
	return formattedAmount;
}