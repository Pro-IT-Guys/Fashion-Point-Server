"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_constant_1 = require("../../constant/shared.constant");
const formatArrayFields = (req, res, next) => {
    shared_constant_1.fieldsForFormatArray.forEach(field => {
        if (req.body[field] && typeof req.body[field] === 'string') {
            req.body[field] = req.body[field].split(',').map((s) => s.trim());
        }
    });
    next();
};
exports.default = formatArrayFields;
