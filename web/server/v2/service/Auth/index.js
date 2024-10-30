const ShopifySessions = require('../../models/shopifySessions.model.js');

// return shop details by shop name
exports.getShopDetails = async (shop) => {
    console.log('-----------------------------------------v2 version ');
    const shopDetails = await ShopifySessions.findOne({ shop });
    return shopDetails;
}