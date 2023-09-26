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
exports.deleteProduct = exports.product = exports.products = exports.updateProduct = exports.createProduct = void 0;
const product_1 = __importDefault(require("../../../../DB/models/product"));
const user_1 = __importDefault(require("../../../../DB/models/user"));
const errorHandling_1 = require("../../../services/errorHandling");
exports.createProduct = (0, errorHandling_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.user._id);
    if (!user) {
        const error = new Error("can not find user");
        error.cause = 404;
        next(error);
    }
    else {
        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        };
        const product = new product_1.default(newProduct);
        console.log(product);
        if (!product) {
            const error = new Error("can not create product");
            error.cause = 200;
            next(error);
        }
        else {
            res.status(201).json({ message: "Done", product });
        }
    }
}));
exports.updateProduct = (0, errorHandling_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.user._id);
    if (!user) {
        const error = new Error("can not find user");
        error.cause = 404;
        next(error);
    }
    else {
        const { id } = req.params;
        const product = yield product_1.default.findById(id);
        if (!product) {
            const error = new Error("can not find product");
            error.cause = 404;
            next(error);
        }
        else {
            const newProduct = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
            };
            const updatedProduct = yield product_1.default.findOneAndUpdate({ _id: id }, newProduct, { new: true });
            if (updatedProduct) {
                res.status(201).json({ message: "Done", updatedProduct });
            }
            else {
                const error = new Error("fail to update product");
                error.cause = 400;
                next(error);
            }
        }
    }
}));
exports.products = (0, errorHandling_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find();
    if (!products) {
        const error = new Error("can not find products");
        error.cause = 404;
        next(error);
    }
    else {
        res.status(201).json({ message: "Done", products });
    }
}));
exports.product = (0, errorHandling_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.default.findById(id);
    if (!product) {
        const error = new Error("can not find product");
        error.cause = 404;
        next(error);
    }
    else {
        res.status(201).json({ message: "Done", product });
    }
}));
exports.deleteProduct = (0, errorHandling_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedProduct = yield product_1.default.findByIdAndDelete(id);
    if (!exports.product) {
        const error = new Error("can not find product");
        error.cause = 404;
        next(error);
    }
    else {
        res.status(201).json({ message: "Done", deletedProduct });
    }
}));
//# sourceMappingURL=product.js.map