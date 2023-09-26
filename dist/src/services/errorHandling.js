"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = exports.asyncHandler = void 0;
function asyncHandler(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            next(new Error(err));
        });
    };
}
exports.asyncHandler = asyncHandler;
const globalError = (err, req, res, next) => {
    if (typeof err === 'object' && 'cause' in err) {
        if (process.env.MOOD === 'DEV') {
            const errorWithStack = Object.assign(Object.assign({}, err), { stack: err instanceof Error ? err.stack : undefined });
            res.status(err.cause).json(errorWithStack);
        }
        if (process.env.MOOD === 'PROD') {
            res.status(err.cause).json({ message: err.message, status: err.cause });
        }
    }
};
exports.globalError = globalError;
//# sourceMappingURL=errorHandling.js.map