"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstance = exports.ModuleRoot = exports.createDefine = void 0;
var define_1 = require("./core/define");
Object.defineProperty(exports, "createDefine", { enumerable: true, get: function () { return define_1.createDefine; } });
var module_1 = require("./core/module");
Object.defineProperty(exports, "ModuleRoot", { enumerable: true, get: function () { return module_1.ModuleRoot; } });
Object.defineProperty(exports, "createInstance", { enumerable: true, get: function () { return module_1.createInstance; } });
