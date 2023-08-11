const express = require("express");
const router = new express.Router();
const cardValidatorController = require("../controller/cardValidator.controller");

router.post("/validateCardNumber", cardValidatorController.validateCardNumber);

module.exports = router;
