"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cuponSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    usedBy: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    expireDate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
const cuponModel = (0, mongoose_1.model)('Cupon', cuponSchema);
exports.default = cuponModel;
