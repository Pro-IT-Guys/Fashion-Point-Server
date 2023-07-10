"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateUniqueSKU = (char) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let sku = '';
    for (let i = 0; i < char; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        sku += characters.charAt(randomIndex);
    }
    return sku;
};
exports.default = generateUniqueSKU;
