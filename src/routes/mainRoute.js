const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
	res.status(200).json({
		name: "https://payments.medlexer.com",
		version: 1
	});
});

module.exports = router;