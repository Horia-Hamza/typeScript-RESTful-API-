"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: [true, 'user name is required'],
        minlength: [2, 'min letters are 2'],
        maxlength: [20, 'max letters are 20'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    role: { type: String, default: "User", enum: ["User", "Admin", "Vendor"] }
}, {
    timestamps: true,
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
//# sourceMappingURL=user.js.map