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
var _this = this;
var availableLocales = ["en", "bg"];
var defaultLanguage = "en";
var locales = {};
// Function to load a JSON file
var loadLocale = function (locale) { return __awaiter(_this, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch("./src/locales/".concat(locale, ".json"))];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Could not load locale ".concat(locale));
                }
                return [2 /*return*/, response.json()];
            case 2:
                error_1 = _a.sent();
                console.error("Error loading locale ".concat(locale, ":"), error_1);
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
// Function to detect user's language and set it
var detectLanguage = function () {
    var language = (navigator.language || navigator.userLanguage).substr(0, 2);
    var urlParams = new URLSearchParams(window.location.search);
    var langFromUrl = urlParams.get("lang");
    if (langFromUrl && availableLocales.indexOf(langFromUrl) !== -1) {
        language = langFromUrl;
    }
    return availableLocales.indexOf(language) !== -1 ? language : defaultLanguage;
};
// Function to update the page language
var updatePageLanguage = function (lang) { return __awaiter(_this, void 0, void 0, function () {
    var pageLanguage, elements, json_1, htmlElement, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pageLanguage = availableLocales.indexOf(lang) !== -1 ? lang : defaultLanguage;
                elements = document.querySelectorAll("[data-i18n]");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!locales[pageLanguage]) return [3 /*break*/, 2];
                json_1 = locales[pageLanguage];
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, loadLocale(pageLanguage)];
            case 3:
                json_1 = _a.sent();
                locales[pageLanguage] = json_1;
                _a.label = 4;
            case 4:
                elements.forEach(function (element) {
                    var key = element.getAttribute("data-i18n");
                    if (!key)
                        return;
                    var text = key.split(".").reduce(function (obj, i) { return (obj ? obj[i] : null); }, json_1);
                    if (!text)
                        return;
                    var variables = text.match(/{(.*?)}/g);
                    if (variables) {
                        variables.forEach(function (variable) {
                            var datasetEntries = Object.keys(element.dataset).map(function (key) { return [key, element.dataset[key]]; });
                            datasetEntries.forEach(function (_a) {
                                var dataKey = _a[0], value = _a[1];
                                if ("{".concat(dataKey, "}") === variable) {
                                    try {
                                        text = text.replace("".concat(variable), new Function("return (".concat(value, ")"))());
                                    }
                                    catch (error) {
                                        text = text.replace("".concat(variable), value);
                                    }
                                }
                            });
                        });
                    }
                    element.innerHTML = text;
                });
                htmlElement = document.querySelector("html");
                if (htmlElement) {
                    htmlElement.setAttribute("lang", pageLanguage);
                }
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.error("Error updating page language to ".concat(lang, ":"), error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// Initial language setup
var language = detectLanguage();
updatePageLanguage(language);
// Event listener for language change buttons
document.querySelectorAll(".change-language").forEach(function (button) {
    button.addEventListener("click", function (event) {
        var target = event.target;
        var newLanguage = target.getAttribute("data-language");
        if (newLanguage && availableLocales.indexOf(newLanguage) !== -1) {
            updatePageLanguage(newLanguage);
        }
    });
});
