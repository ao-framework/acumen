"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vue_1 = tslib_1.__importDefault(require("vue"));
const fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const vue_fontawesome_1 = require("@fortawesome/vue-fontawesome");
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faAngleDown);
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faAngleUp);
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faAngleRight);
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faAngleLeft);
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faBookOpen);
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faHandPointUp);
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faTimes);
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faGripLines);
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faStream);
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faSnowplow);
vue_1.default.component('font-awesome-icon', vue_fontawesome_1.FontAwesomeIcon);
//# sourceMappingURL=fonts.js.map