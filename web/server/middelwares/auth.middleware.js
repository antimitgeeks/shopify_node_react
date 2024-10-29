const { shopify } = require("../../shopify.js");
// Response handlers
const { sendResponse } = require("../utils/sendResponse.js");
const { ErrorMessage } = require("../constants/messages.js");
const { statusCode } = require("../constants/statusCodes.js");
// const partnerService = require("../service/partner.service.js");

exports.shopAuthenticate = async (request, response, next) => {
    try {

        // Extract the 'shop' parameter from the request query parameters.
        const { shop } = request.query;

        // Check if 'shop' parameter is not provided.
        if (!shop) {
            return sendResponse(response, statusCode.NOT_FOUND, ErrorMessage.SHOP_UNAVAILABLE);
        }
        next();
    } catch (error) {
        console.log(error);
        return sendResponse(response, statusCode.INTERNAL_SERVER_ERROR, ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};

exports.authenticateUser = async (req, res, next) => {
    // check first api/ route session exist or not 
    const session = res.locals?.shopify?.session
    // Extract the 'shop' parameter from the request query parameters.
    let shop = req.query.shop || session?.shop;
    let storeName = await shopify.config.sessionStorage.findSessionsByShop(shop);
    if (!shop) {
        return sendResponse(res, statusCode.BAD_REQUEST, ErrorMessage.SHOP_UNAVAILABLE);
    }
    if (storeName?.length) {
        if (shop === storeName[0].shop) {
            res.locals.shopify = storeName[0];
            req.currentShop = storeName[0].shop;
            // set current partner info
            // req.currentPartnerInfo = await partnerService.getPartnerInfo(shop);
            next();
        } else {
            return sendResponse(res, statusCode.BAD_REQUEST, ErrorMessage.NOT_AUTHORIZED);
        }
    } else {
        return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.SHOP_INVALID);
    }

};