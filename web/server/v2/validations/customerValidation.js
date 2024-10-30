const schema = require("./schema/customerSchema.js");
const { statusCode } = require("../constants/statusCodes.js");

exports.addCustomer = async (req, res, next) => {
    const { error } = schema.addCustomerSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

exports.login = async (req, res, next) => {
    const { error } = schema.login.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

exports.customerRegister = async (req, res, next) => {
    const { error } = schema.customerRegisterSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

exports.getCustomer = async (req, res, next) => {
    const { error } = schema.getCustomerSchema.validate(req.params);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

exports.customerSupport = async (req, res, next) => {
    const { error } = schema.supportSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.updateCustomer = async (req, res, next) => {
    const { error } = schema.updateCustomerSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}


exports.updateDeviceName = async (req, res, next) => {
    const { error } = schema.updateDeviceNameSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.addCart = async (req, res, next) => {
    const { error } = schema.addCartSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.addCartItems = async (req, res, next) => {
    const { error } = schema.addCartItemsSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.addCartVariantQuantity = async (req, res, next) => {
    const { error } = schema.addCartVariantQuantitySchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.removeCartItems = async (req, res, next) => {
    const { error } = schema.removeCartItemsSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.discountCode = async (req, res, next) => {
    const { error } = schema.discountCodeSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.deleteDiscountCode = async (req, res, next) => {
    const { error } = schema.deleteDiscountCodeSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.notes = async (req, res, next) => {
    const { error } = schema.notesSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.favoriteAdd = async (req, res, next) => {
    const { error } = schema.favoriteAddSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.favoriteList = async (req, res, next) => {
    const { error } = schema.favoriteListSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.favoriteRemove = async (req, res, next) => {
    const { error } = schema.favoriteRemoveSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.addAddress = async (req, res, next) => {
    const { error } = schema.addAddressSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.updateAddress = async (req, res, next) => {
    const { error } = schema.updateAddressSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}


exports.removeSingleAddress = async (req, res, next) => {
    const { error } = schema.removeSingleAddressSchema.validate({
        accessToken: req.query.accessToken,
        id: req.body.id
    });
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.filterCollectionHandle = async (req, res, next) => {
    const { error } = schema.filterCollectionHandleSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.relatedProducts = async (req, res, next) => {
    const { error } = schema.relatedProductsSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.discountPriceRule = async (req, res, next) => {
    const { error } = schema.discountPriceRuleSchema.validate(req.body?.price_rule);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}
