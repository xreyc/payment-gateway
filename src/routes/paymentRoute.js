const { Router } = require('express');
const {
	createPaymentController,
	updatePaymentSuccessController,
	getPaymentSuccessScreenController,
	getPaymentCancelledScreenController,
	getPaymentFailedScreenController
} = require('../controllers/paymentController');

const router = Router();

router.post('/', createPaymentController);
router.get('/verify_success', updatePaymentSuccessController);
router.get('/verify_cancelled', updatePaymentSuccessController);
router.get('/success', getPaymentSuccessScreenController);
router.get('/cancelled', getPaymentCancelledScreenController);
router.get('/failed', getPaymentFailedScreenController);

module.exports = router;