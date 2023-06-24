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
];
routes.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
