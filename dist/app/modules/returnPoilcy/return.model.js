"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const returnPolicySchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
});
const returnPolicyModel = (0, mongoose_1.model)(`ReturnPolicy`, returnPolicySchema);
exports.default = returnPolicyModel;
