"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vue_1 = tslib_1.__importDefault(require("vue"));
const vue_router_1 = tslib_1.__importDefault(require("vue-router"));
vue_1.default.use(vue_router_1.default);
exports.default = new vue_router_1.default({
    routes: [{
            name: "menu",
            path: "/",
            component: () => Promise.resolve().then(() => tslib_1.__importStar(require(/* webpackChunkName: "elevate-menu" */ "./views/menu/menu.vue")))
        }, {
            name: "coverage",
            path: "/coverage/:entryPoint",
            component: () => Promise.resolve().then(() => tslib_1.__importStar(require(/* webpackChunkName: "elevate-coverage" */ "./views/coverage/coverage.vue")))
        }, {
            name: "schema",
            path: "/schema/:entryPoint",
            component: () => Promise.resolve().then(() => tslib_1.__importStar(require(/* webpackChunkName: "elevate-schema" */ "./views/schema/schema.vue")))
        }, {
            name: "snapshot",
            path: "/snapshot/:entryPoint",
            component: () => Promise.resolve().then(() => tslib_1.__importStar(require(/* webpackChunkName: "elevate-snapshot" */ "./views/snapshot/snapshot.vue")))
        }]
});
//# sourceMappingURL=router.js.map