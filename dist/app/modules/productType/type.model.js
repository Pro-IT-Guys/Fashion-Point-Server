"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const typeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });
const typeModel = (0, mongoose_1.model)('ProductType', typeSchema);
exports.default = typeModel;
