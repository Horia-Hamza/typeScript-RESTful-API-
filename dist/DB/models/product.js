"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'product name is required'],
        minlength: [2, 'min letters are 2'],
        maxlength: [20, 'max letters are 20'],
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 1,
        required: true
    },
});
const UserModel = (0, mongoose_1.model)('Product', ProductSchema);
exports.default = UserModel;
//# sourceMappingURL=product.js.map