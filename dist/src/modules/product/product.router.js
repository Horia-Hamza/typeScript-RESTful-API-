"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const productController = __importStar(require("./controller/product"));
const validation_1 = require("../../middleWare/validation");
const product_validation_1 = require("./product.validation");
const authentication_1 = require("../../middleWare/authentication");
const product_endPoint_1 = require("./product.endPoint");
const express_1 = require("express");
exports.productRouter = (0, express_1.Router)();
exports.productRouter.post('/', (0, validation_1.validation)(product_validation_1.createProduct), (0, authentication_1.auth)(product_endPoint_1.endPoint.create), productController.createProduct);
exports.productRouter.put('/:id', (0, authentication_1.auth)(product_endPoint_1.endPoint.update), productController.updateProduct);
exports.productRouter.get('/', productController.products);
exports.productRouter.get('/:id', productController.product);
exports.productRouter.delete('/:id', productController.deleteProduct);
//# sourceMappingURL=product.router.js.map