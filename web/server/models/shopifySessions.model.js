const mongoose = require("mongoose");

const shopifySessionsSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    shop: {
        type: String,
    },
    state: {
        type: String,
    },
    isOnline: {
        type: Boolean,
    },
    scope: {
        type: String,
    },
    accessToken: {
        type: String,
    }
},
    { 'timestamps': true }

);

const ShopifySessions = mongoose.model("shopify_sessions", shopifySessionsSchema);

module.exports = ShopifySessions;
