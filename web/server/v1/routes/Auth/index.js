// imports
const express = require("express");

// controllers
const authControllers = require("../../controllers/Auth");

// route initiate
const router = express.Router();

router.get('/shopDetails', authControllers.getShopDetails);

module.exports = router;
