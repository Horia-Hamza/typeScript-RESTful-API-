import { roles } from "../../middleWare/authentication.js";

export const endPoint = {
    create:[roles.Admin,roles.Vendor],
    update:[roles.Admin,roles.Vendor],
    products: [roles.User]
}