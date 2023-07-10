"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const citySchema = new mongoose_1.Schema({
    city_name: {
        type: String,
        required: true,
    },
    delivery_fee: {
        type: Number,
    },
}, { _id: false });
const stateSchema = new mongoose_1.Schema({
    state_name: {
        type: String,
        required: true,
    },
    state_code: {
        type: String,
        required: true,
    },
    cities: [citySchema],
    delivery_fee: {
        type: Number,
    },
}, { _id: false });
const countrySchema = new mongoose_1.Schema({
    country: {
        type: String,
        required: true,
        unique: true,
    },
    country_code: {
        type: String,
        required: true,
        unique: true,
    },
    phoneCode: {
        type: String,
        required: true,
    },
    states: [stateSchema],
});
const deliveryFeeModel = (0, mongoose_1.model)('DeliveryFee', countrySchema);
exports.default = deliveryFeeModel;
