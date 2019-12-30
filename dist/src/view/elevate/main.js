"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vue_1 = tslib_1.__importDefault(require("vue"));
const app_vue_1 = tslib_1.__importDefault(require("./app.vue"));
const router_1 = tslib_1.__importDefault(require("./router"));
require("./registration");
new vue_1.default({
    router: router_1.default,
    render: h => h(app_vue_1.default)
}).$mount("#app");
//# sourceMappingURL=main.js.map