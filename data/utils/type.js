"use strict";
/*
  常用的一些判断类型的函数
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = exports.isRegExp = exports.isElement = exports.isHTMLElement = exports.isString = exports.isEmptyString = exports.isEmpty = exports.isFunction = exports.isArray = exports.isNumber = exports.isBoolean = exports.isUndefined = void 0;
/**
 * @description 是否是undefined
 */
var isUndefined = function (val) {
    // eslint-disable-next-line no-void
    return val === void 0;
};
exports.isUndefined = isUndefined;
/**
 * @description 是否是boolean
 */
var isBoolean = function (val) { return typeof val === "boolean"; };
exports.isBoolean = isBoolean;
/**
 * @description 是否是数字
 */
var isNumber = function (val) { return typeof val === "number"; };
exports.isNumber = isNumber;
/**
 * @description 是否是数组
 */
var isArray = function (val) { return Array.isArray(val); };
exports.isArray = isArray;
/**
 * @description 是否是方法
 */
var isFunction = function (val) { return typeof val === "function"; };
exports.isFunction = isFunction;
/**
 * @description 是否是空值
 */
var isEmpty = function (val) { return val === undefined || val === null; };
exports.isEmpty = isEmpty;
/**
 * @description 是否是空字符串
 */
var isEmptyString = function (val) { return val === "" || (0, exports.isEmpty)(val); };
exports.isEmptyString = isEmptyString;
/**
 * @description 是否是字符串
 */
var isString = function (val) { return typeof val === "string"; };
exports.isString = isString;
/**
 * @description 是否是dom节点
 */
var isHTMLElement = function (e) { return e instanceof HTMLElement; };
exports.isHTMLElement = isHTMLElement;
/**
 * @description 是否是Element
 */
var isElement = function (e) { return e instanceof Element; };
exports.isElement = isElement;
/**
 * @description 是否是正则表达式
 */
var isRegExp = function (val) { return val instanceof RegExp; };
exports.isRegExp = isRegExp;
/**
 * @description 空函数
 */
var noop = function () { return undefined; };
exports.noop = noop;
