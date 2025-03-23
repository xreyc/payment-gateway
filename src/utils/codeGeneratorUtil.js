const crypto = require('crypto');

module.exports.generateRandomCode = (minNum, maxNum) => {
	const randomNumber = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
	const authorizationCode = crypto.randomBytes(randomNumber).toString('base64');
	return authorizationCode;
}

module.exports.generateReferenceCode = (prefix) => {
	const timestamp = Date.now();
	const randomFourDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
	return `${prefix}${timestamp}${randomFourDigits}`;
}

module.exports.generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
}