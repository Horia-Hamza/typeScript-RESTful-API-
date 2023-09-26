"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProduct = {
    body: joi_1.default.object().required().keys({
        name: joi_1.default.string().required(),
        description: joi_1.default.string(),
        price: joi_1.default.number().required(),
    }),
};
//# sourceMappingURL=product.validation.js.map