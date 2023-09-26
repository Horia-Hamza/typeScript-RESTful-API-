"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    nodeEnv: process.env.NODE_ENV,
    dbUri: process.env.NODE_ENV === 'production' ? process.env.DB_URI_PROD : process.env.DB_URI_DEV,
    apiKey: process.env.API_KEY,
};
//# sourceMappingURL=cconfig.js.map