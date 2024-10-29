const Partner = require("../models/partners.model.js");
const shopifySessions = require("../models/shopifySessions.model.js");
const jwt = require('jsonwebtoken');
const shopifySessions = require("../models/shopifySessions.model.js");

exports.isShopActive = async (req, res, next) => {
    const { shop, host } = req.query;

    await Partner.create({ myshopify_domain: "demo__1" });

    if (!shop) {
        next();
        return;
    }
    const isShopAvailable = await shopifySessions.findOne({ shop });
    if (isShopAvailable === null || !isShopAvailable.isActive) {
        if (isShopAvailable === null) {
            await shopifySessions.create({ shop, isActive: false });
        } else if (!isShopAvailable.isActive) {
            await shopifySessions.findOneAndUpdate({ shop }, { isActive: false });
        }
        next();
        // res.redirect(`/api/auth?shop=${shop}&host=${host}`);
    } else {
        next();
    }
};

exports.adminAuth = async (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token', err });
        }

        // Check if user has the admin role
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // If everything is good, proceed to the next middleware or route handler
        req.user = decoded;
        next();
    });
}


exports.isShopActive = async (req, res, next) => {
    const { shop, host } = req.query;

    await Partner.create({ myshopify_domain: "demo__1" });

    if (!shop) {
        next();
        return;
    }
    const isShopAvailable = await shopifySessions.findOne({ shop });
    if (isShopAvailable === null || !isShopAvailable.isActive) {
        if (isShopAvailable === null) {
            await shopifySessions.create({ shop, isActive: false });
        } else if (!isShopAvailable.isActive) {
            await shopifySessions.findOneAndUpdate({ shop }, { isActive: false });
        }
        next();
    // res.redirect(`/api/auth?shop=${shop}&host=${host}`);
    } else {
        next();
    }
};