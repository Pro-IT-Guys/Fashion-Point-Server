"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const offerSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    product: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    ],
    discountPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    startFrom: {
        type: Date,
        required: true,
    },
    endAt: {
        type: Date,
        required: true,
    },
    isVisible: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const offerModel = (0, mongoose_1.model)('Offer', offerSchema);
exports.default = offerModel;
