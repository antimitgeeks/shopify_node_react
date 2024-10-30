const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    device_id: {
        type: String,
    },
    device_name: {
        type: String,
    },
    fcm_token: {
        type: String,
    },
    partner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Partner"
    },
    id: {
        type: String
    },
    abandonedNotification: {
        type: Date
    },
    profileImage: {
        type: String
    },
},
    { 'timestamps': true }

);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
