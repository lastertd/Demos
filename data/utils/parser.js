"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetsParser = void 0;
var type_1 = require("./type");
var assetsParser = function (data) {
    var _a;
    if ((0, type_1.isEmpty)(data))
        return data;
    var assets = data === null || data === void 0 ? void 0 : data.assets;
    for (var _i = 0, assets_1 = assets; _i < assets_1.length; _i++) {
        var item = assets_1[_i];
        var url = ((_a = item === null || item === void 0 ? void 0 : item.p) !== null && _a !== void 0 ? _a : "").replace(/\/market-monet/g, "https://commimg.pddpic.com/market-monet");
        if (!(0, type_1.isEmpty)(item.p) && !item.p.startsWith("http")) {
            item.p = url;
        }
    }
    return data;
};
exports.assetsParser = assetsParser;
