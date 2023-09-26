"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endPoint = void 0;
const authentication_js_1 = require("../../middleWare/authentication.js");
exports.endPoint = {
    create: [authentication_js_1.roles.Admin, authentication_js_1.roles.Vendor],
    update: [authentication_js_1.roles.Admin, authentication_js_1.roles.Vendor],
    products: [authentication_js_1.roles.User]
};
//# sourceMappingURL=product.endPoint.js.map