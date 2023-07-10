"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateRandomCode = (length = 6) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.default = generateRandomCode;
