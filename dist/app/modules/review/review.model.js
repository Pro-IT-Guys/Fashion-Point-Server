"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
});
const reviewModel = (0, mongoose_1.model)(`Review`, reviewSchema);
exports.default = reviewModel;
