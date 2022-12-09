"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusType = void 0;
var statusType;
(function (statusType) {
    statusType[statusType["AWAITING_AUTHORISATION"] = 0] = "AWAITING_AUTHORISATION";
    statusType[statusType["AUTHORISED"] = 1] = "AUTHORISED";
    statusType[statusType["REJECT"] = 2] = "REJECT";
})(statusType = exports.statusType || (exports.statusType = {}));
