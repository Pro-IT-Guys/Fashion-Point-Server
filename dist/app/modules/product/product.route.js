"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
// import validateRequest from '../../middlewares/validateRequest'
// import { ProductValidation } from './product.velidation'
// import uploadMiddleware from '../../middlewares/productFileUpload'
const formatArrayField_1 = __importDefault(require("../../middlewares/formatArrayField"));
const router = express_1.default.Router();
router.post('/', 
// validateRequest(ProductValidation.createProductZodSchema),
// uploadMiddleware,
formatArrayField_1.default, product_controller_1.ProductController.createProduct);
router.get('/:id', product_controller_1.ProductController.getProductById);
router.get('/path/:path', product_controller_1.ProductController.getProductByPath);
router.get('/sku/:sku', product_controller_1.ProductController.getProductBySku);
router.get('/', product_controller_1.ProductController.getAllProduct);
router.patch('/:id', 
// uploadMiddleware,
product_controller_1.ProductController.updateProduct);
router.delete('/:id', product_controller_1.ProductController.deleteProduct);
exports.ProductRoute = router;
