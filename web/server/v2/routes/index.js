const express = require("express");
const authRoutes = require("./Auth");

const router = express.Router();

router.use("/auth", authRoutes);

module.exports = router;
