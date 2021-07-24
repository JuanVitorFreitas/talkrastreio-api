const { Router } = require("express");
const trackingController = require("./controller/trackingController");

const router = Router();

router.post('/',trackingController.fetchTracking);


module.exports = router;