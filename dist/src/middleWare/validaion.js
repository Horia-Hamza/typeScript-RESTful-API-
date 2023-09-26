"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const dataMethod = ['body', 'params', 'query', 'headers'];
const validation = (Schema) => {
    return (req, res, next) => {
        try {
            const validationArr = [];
            dataMethod.forEach(key => {
                if (Schema[key]) {
                    const validationResult = Schema[key].validate(req[key], { abortEarly: false });
                    if (validationResult === null || validationResult === void 0 ? void 0 : validationResult.error) {
                        validationArr.push(validationResult.error.details);
                    }
                }
            });
            if (validationArr.length) {
                res.status(400).json({ message: "Validation error", validationArr });
            }
            else {
                next();
            }
        }
        catch (error) {
            res.status(500).json({ message: "Catch error", error });
        }
    };
};
exports.validation = validation;
//# sourceMappingURL=validaion.js.map