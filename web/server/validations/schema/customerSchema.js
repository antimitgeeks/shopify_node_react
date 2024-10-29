const Joi = require("joi");

exports.addCustomerSchema = Joi.object({
    device_id: Joi.string().required(),
    device_name: Joi.string().required(),
    fcm_token: Joi.string().allow("").required(),
});

exports.login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    _id: Joi.string().required(),
});

exports.customerRegisterSchema = Joi.object({
    firstName: Joi.string().allow("", null).optional(),
    email: Joi.string().email().allow("", null).optional(),
    password: Joi.string().allow("", null).optional(),
    lastName: Joi.string().allow("", null).optional(),
    phone: Joi.string().allow("", null).optional(),
    acceptsMarketing: Joi.boolean().required(),
});

exports.getCustomerSchema = Joi.object({
    id: Joi.string().required()
});

exports.supportSchema = Joi.object({
    type: Joi.string().valid('support', 'delete').required(),
    customerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    number: Joi.string().required(),
    message: Joi.string().min(15).optional(),
})

exports.updateCustomerSchema = Joi.object({
    firstName: Joi.string().allow("", null).optional(),
    lastName: Joi.string().allow("", null).optional(),
    profileImage: Joi.string().allow("", null).optional(),
    phone: Joi.string().allow("", null).optional(),
    customerId: Joi.string().required(),
})

// Define schema for delivery address
const deliveryAddressSchema = Joi.object({
    address1: Joi.string().required(),
    address2: Joi.string().allow('').optional(),
    city: Joi.string().required(),
    province: Joi.string().required(),
    country: Joi.string().required(),
    zip: Joi.string().required()
});

// Define schema for buyer identity
const buyerIdentitySchema = Joi.object({
    email: Joi.string().email().required(),
    countryCode: Joi.string().required(),
    deliveryAddressPreferences: Joi.object({
        deliveryAddress: deliveryAddressSchema.required()
    }).required()
});

// Define schema for attributes
const attributesSchema = Joi.object({
    key: Joi.string().required(),
    value: Joi.string().required()
});

exports.addCartSchema = Joi.object({
    lines: Joi.array().items(Joi.object()).min(1).required(),
    buyerIdentity: buyerIdentitySchema.optional(),
    attributes: attributesSchema.optional()
})

exports.addCartItemsSchema = Joi.object({
    lines: Joi.array().items(Joi.object()).min(1).required(),
})

exports.addCartVariantQuantitySchema = Joi.object({
    lines: Joi.array().items(Joi.object()).min(1).required(),
})

exports.removeCartItemsSchema = Joi.object({
    lines: Joi.string().required()
})

exports.discountCodeSchema = Joi.object({
    discountCode: Joi.string().required(),
    priceRuleId: Joi.string().required()
})

exports.deleteDiscountCodeSchema = Joi.object({
    discountId: Joi.string().required(),
    priceRuleId: Joi.string().required()
})

exports.notesSchema = Joi.object({
    notes: Joi.string().required().required()
})

exports.favoriteAddSchema = Joi.object({
    customerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    productIds: Joi.array().items(Joi.string().required()).min(1).required()
})

exports.favoriteListSchema = Joi.object({
    customerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
})

exports.favoriteRemoveSchema = Joi.object({
    customerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    productId: Joi.string().required().required()
})

exports.addAddressSchema = Joi.object({
    address1: Joi.string().required(),
    // address2: Joi.string().min(3).required(),
    city: Joi.string().required(),
    // company: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    province: Joi.string().required(),
    country: Joi.string().required(),
    zip: Joi.string().required(),
    name: Joi.string().required(),
    province_code: Joi.string().allow(null, "").optional(),
    country_code: Joi.string().required(),
    country_name: Joi.string().required(),
})

exports.updateAddressSchema = Joi.object({
    id: Joi.string().required(),
    address1: Joi.string().required(),
    // address2: Joi.string().min(3).required(),
    city: Joi.string().min(2).required(),
    // company: Joi.string().optional(),
    firstName: Joi.string().allow(null, "").optional(),
    lastName: Joi.string().allow(null, "").optional(),
    phone: Joi.string().allow(null, "").optional(),
    province: Joi.string().allow(null, "").optional(),
    country: Joi.string().allow(null, "").optional(),
    zip: Joi.string().allow(null, "").optional(),
    name: Joi.string().allow(null, "").optional(),
    province_code: Joi.string().allow(null, "").optional(),
    country_code: Joi.string().allow(null, "").optional(),
    country_name: Joi.string().allow(null, "").optional(),
})

exports.removeSingleAddressSchema = Joi.object({
    accessToken: Joi.string().required(),
    id: Joi.string().required()
})

exports.filterCollectionHandleSchema = Joi.object({
    handle: Joi.string().optional(),
    cursor: Joi.string().optional(),
})

exports.relatedProductsSchema = Joi.object({
    id: Joi.string().required()
})

exports.discountPriceRuleSchema = Joi.object({
    title: Joi.string().required(),
    target_type: Joi.string().valid('line_item', 'shipping_line', 'each').required(),
    target_selection: Joi.string().valid('all', 'entitled', 'explicit').required(),
    allocation_method: Joi.string().valid('across', 'each').required(),
    value_type: Joi.string().valid('fixed_amount', 'percentage').required(),
    value: Joi.number().required(),
    customer_selection: Joi.string().valid('all', 'custom').required(),
    starts_at: Joi.date().iso().required(),
    ends_at: Joi.date().iso().required(),
    prerequisite_collection_ids: Joi.array().items(Joi.number()).optional(),
    entitled_product_ids: Joi.array().items(Joi.number()).optional(),
    prerequisite_to_entitlement_quantity_ratio: Joi.object({
        prerequisite_quantity: Joi.number().optional(),
        entitled_quantity: Joi.number().optional()
    }).optional(),
    allocation_limit: Joi.number().optional()
})


exports.updateDeviceNameSchema = Joi.object({
    deviceName: Joi.string().allow("", null).optional(),
    token: Joi.string().allow("", null).optional(),

})