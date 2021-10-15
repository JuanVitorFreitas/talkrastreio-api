const { Router } = require("express");
const trackingController = require("./controller/trackingController");
const trackingValidations = require("./validations/trackingValidations");

const router = Router();

router.post('/tracking/:code',
	trackingValidations.fetchTracking,
	trackingController.fetchTracking);


module.exports = router;