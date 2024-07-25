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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAllImg = exports.saveJson = exports.getFileName = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var axios_1 = require("axios");
var getFileName = function (url, v) {
    if (v === void 0) { v = 1; }
    var file = url.split("/").pop();
    if (v === 2) {
        return file;
    }
    return file.split(".")[0];
};
exports.getFileName = getFileName;
// 创建目录的异步函数
function ensureDirectoryExistence(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var dName, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dName = (0, path_1.dirname)(filePath);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 5]);
                    return [4 /*yield*/, fs_1.promises.access(dName)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    // 如果目录不存在，则创建目录
                    return [4 /*yield*/, fs_1.promises.mkdir(dName, { recursive: true })];
                case 4:
                    // 如果目录不存在，则创建目录
                    _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
var saveJson = function (prefix, data) { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, jsonString, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filePath = (0, path_1.join)(prefix, "data.json");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                // 确保目录存在
                return [4 /*yield*/, ensureDirectoryExistence(filePath)];
            case 2:
                // 确保目录存在
                _a.sent();
                jsonString = JSON.stringify(data, null, 2);
                // 写入文件
                return [4 /*yield*/, fs_1.promises.writeFile(filePath, jsonString, "utf8")];
            case 3:
                // 写入文件
                _a.sent();
                console.log("文件已成功保存在", filePath);
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                console.error("写入文件时出错:", err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.saveJson = saveJson;
// 从 URL 中提取日期
var extractDateFromUrl = function (url) {
    var match = url.match(/(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : null;
};
// 保存图片的异步函数
var saveImg = function (prefix, imgUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var date, filePath, response, writer, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                date = extractDateFromUrl(imgUrl);
                if (!date) {
                    console.error("无法从 URL 提取日期");
                    return [2 /*return*/];
                }
                filePath = (0, path_1.join)(prefix, date, getFileName(imgUrl, 2));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                // 确保目录存在
                return [4 /*yield*/, ensureDirectoryExistence(filePath)];
            case 2:
                // 确保目录存在
                _a.sent();
                return [4 /*yield*/, axios_1.default.get(imgUrl, { responseType: "stream" })];
            case 3:
                response = _a.sent();
                writer = (0, fs_1.createWriteStream)(filePath);
                response.data.pipe(writer);
                writer.on("finish", function () {
                    console.log("图片已成功下载");
                });
                writer.on("error", function (err) {
                    console.error("写入文件时出错:", err);
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error("下载图片时出错:", error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var saveAllImg = function (prefix, data) { return __awaiter(void 0, void 0, void 0, function () {
    var assets, _i, assets_1, item, imgUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                assets = data === null || data === void 0 ? void 0 : data.assets;
                _i = 0, assets_1 = assets;
                _a.label = 1;
            case 1:
                if (!(_i < assets_1.length)) return [3 /*break*/, 4];
                item = assets_1[_i];
                if (!item.id.startsWith("image"))
                    return [3 /*break*/, 3];
                imgUrl = item.p;
                return [4 /*yield*/, saveImg(prefix, imgUrl)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.saveAllImg = saveAllImg;
