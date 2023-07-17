"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const customResponse_1 = require("../../../shared/customResponse");
const cart_service_1 = require("./cart.service");
const addToCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartData = req.body;
    const cart = yield cart_service_1.CartService.addToCart(cartData);
    const responseData = {
        data: cart,
        message: 'Items added to cart successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const updateCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    const cartData = req.body;
    const cart = yield cart_service_1.CartService.updateCart(cartId, cartData);
    const responseData = {
        data: cart,
        message: 'Cart updated successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const bulkUpdateCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    const cartData = req.body;
    const cart = yield cart_service_1.CartService.bulkUpdateCart(cartId, cartData);
    const responseData = {
        data: cart,
        message: 'Cart updated successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const getCartByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const cart = yield cart_service_1.CartService.getCartByUserId(userId);
    const responseData = {
        data: cart,
        message: 'Cart fetched successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const getCartByCartId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    const cart = yield cart_service_1.CartService.getCartByCartId(cartId);
    const responseData = {
        data: cart,
        message: 'Cart fetched successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const deleteCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    const cart = yield cart_service_1.CartService.deleteCart(cartId);
    const responseData = {
        data: cart,
        message: 'Cart deleted successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const deleteAProductFromCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    const productId = req.params.productId;
    const cart = yield cart_service_1.CartService.deleteAProductFromCart(cartId, productId);
    const responseData = {
        data: cart,
        message: 'Product deleted successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
exports.CartController = {
    addToCart,
    updateCart,
    bulkUpdateCart,
    getCartByUserId,
    getCartByCartId,
    deleteCart,
    deleteAProductFromCart,
};
