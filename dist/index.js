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
        while (_) try {
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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    exports.doFetch = function (urlTail, method, headers, body) {
        if (method === void 0) { method = 'GET'; }
        if (headers === void 0) { headers = {}; }
        if (body === void 0) { body = null; }
        return __awaiter(void 0, void 0, void 0, function () {
            var response, json, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, fetch("http://localhost:4000/" + urlTail, {
                                method: method,
                                headers: headers,
                                body: body
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, json];
                    case 3: throw Error("" + response.status);
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.log('fetch failed: ', e_1.message);
                        throw Error(e_1.message);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    exports.search = function (query, what) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.doFetch("data/?" + what + "=" + query)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.getReleaseById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.doFetch("data/" + id)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.getHistory = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.doFetch('history')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.addToHistory = function (item) { return __awaiter(void 0, void 0, void 0, function () {
        var stringified;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stringified = JSON.stringify(item);
                    return [4 /*yield*/, exports.doFetch('history', 'POST', headers, stringified)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    exports.removeFromHistory = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.doFetch("history/?id=" + id, 'DELETE', headers)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
});
// export const search = async (query: string, what: what): Promise<Release[]> => {
//   const response = await fetch(`http://localhost:4000/data/?${what}=${query}`);
//   if (response.ok) {
//     const json = await response.json();
//     return json;
//   }
//   else {
//     throw Error(`${response.status}`);
//   }
// }
// search('Nirvana', 'artist');
// export const getReleaseById = async (id: number): Promise<Release> => {
//   const response = await fetch(`http://localhost:4000/data/${id}`);
//   if (response.ok) {
//     const json = await response.json();
//     return json;
//   }
//   else {
//     throw Error(`${response.status}`);
//   }
// }
// export const getHistory = async (): Promise<HistoryItem[]> => {
//   const response = await fetch(`http://localhost:4000/history`);
//   if (response.ok) {
//     const json = await response.json();
//     return json;
//   }
//   else {
//     throw Error(`${response.status}`);
//   }
// };
// export const addToHistory = async (item: HistoryItem): Promise<void> => {
//   const response = await fetch(`http://localhost:4000/history`, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(item)
//   });
//   if (response.ok) {
//     const json = await response.json();
//     console.log(json);
//   }
//   else {
//     throw Error(`${response.status}`);
//   }
// }
// export const removeFromHistory = async (id: HistoryItem['queryId'] | 'all'): Promise<void> => {
//   const response = await fetch(`http://localhost:4000/history/?id=${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   });
//   if (response.ok) {
//     const json = await response.json();
//     console.log(json);
//   }
//   else {
//     throw Error(`${response.status}`);
//   }
// }
