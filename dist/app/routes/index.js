"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const brand_route_1 = require("../modules/productBrand/brand.route");
const type_route_1 = require("../modules/productType/type.route");
const product_route_1 = require("../modules/product/product.route");
const deliveryFee_route_1 = require("../modules/deliveryFee/deliveryFee.route");
const location_route_1 = require("../modules/location/location.route");
const order_route_1 = require("../modules/order/order.route");
const payment_route_1 = require("../modules/payment/payment.route");
const chat_route_1 = require("../modules/chat/chat.route");
const message_route_1 = require("../modules/Message/message.route");
const cart_route_1 = require("../modules/cart/cart.route");
const review_route_1 = require("../modules/review/review.route");
const offer_route_1 = require("../modules/offer/offer.route");
const imageUpload_route_1 = require("../modules/imageUpload/imageUpload.route");
const terms_route_1 = require("../modules/terms-condition/terms.route");
const privacy_route_1 = require("../modules/privacyPolicy/privacy.route");
const return_route_1 = require("../modules/returnPoilcy/return.route");
const cupon_route_1 = require("../modules/cupon/cupon.route");
// import { OfferRoute } from '../modules/offer/offer.route'
const router = express_1.default.Router();
const routes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
    {
        path: '/users',
        route: user_route_1.UserRoute,
    },
    {
        path: '/brand',
        route: brand_route_1.BrandRoute,
    },
    {
        path: '/type',
        route: type_route_1.TypeRoute,
    },
    {
        path: '/product',
        route: product_route_1.ProductRoute,
    },
    {
        path: '/fee',
        route: deliveryFee_route_1.DeliveryFeeRoute,
    },
    {
        path: '/location',
        route: location_route_1.locationRoute,
    },
    {
        path: '/order',
        route: order_route_1.OrderRoute,
    },
    {
        path: '/payment',
        route: payment_route_1.PaymentRoute,
    },
    {
        path: '/chat',
        route: chat_route_1.ChatRoute,
    },
    {
        path: '/message',
        route: message_route_1.MessageRoute,
    },
    {
        path: '/cart',
        route: cart_route_1.CartRoute,
    },
    {
        path: '/review',
        route: review_route_1.ReviewRoute,
    },
    {
        path: '/offer',
        route: offer_route_1.OfferRoute,
    },
    {
        path: '/image',
        route: imageUpload_route_1.ImageUploadRoute,
    },
    {
        path: '/terms-condition',
        route: terms_route_1.TermsConditionRoute,
    },
    {
        path: '/privacy-policy',
        route: privacy_route_1.PrivacyPolicyRoute,
    },
    {
        path: '/return-policy',
        route: return_route_1.ReturnPolicyRoute,
    },
    {
        path: '/cupon',
        route: cupon_route_1.CuponRoute,
    },
];
routes.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
