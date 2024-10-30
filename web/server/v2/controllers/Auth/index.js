// services
const authService = require("../../service/Auth");

// Response handlers
const { sendResponse } = require("../../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../../constants/messages.js");
const { statusCode } = require("../../constants/statusCodes.js");

// create access token controller
exports.getShopDetails = async (req, res) => {
    try {
        const shopName = req.currentShop;
        const result = await authService.getShopDetails(shopName);
        if (!result) {
            return sendResponse(res, statusCode.NOT_FOUND, false, `Shop details ${ErrorMessage.NOT_FOUND}`);
        }
        return sendResponse(res, statusCode.OK, true, `Shop details ${SuccessMessage.DATA_FETCHED}`, result);
    } catch (error) {
        console.log('catch for getShopDetails Error :', error)
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
