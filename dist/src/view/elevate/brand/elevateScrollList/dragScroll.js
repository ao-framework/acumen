"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handles the dragging effect for the ui. It handles dragging
 * with the mouse and by touch
 * @param element
 */
function dragScroll(element) {
    let startX;
    let scrollLeft;
    let isDown;
    element.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
    });
    element.addEventListener("touchstart", (e) => {
        isDown = true;
        startX = e.targetTouches[0].pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
    });
    element.addEventListener("touchend", () => {
        isDown = false;
    });
    element.addEventListener("touchmove", (e) => {
        if (!isDown) {
            return;
        }
        const x = e.targetTouches[0].pageX - element.offsetLeft;
        const walk = (x - startX) * 4;
        element.scrollLeft = scrollLeft - walk;
    });
    element.addEventListener("mouseleave", () => {
        isDown = false;
    });
    element.addEventListener("mouseup", () => {
        isDown = false;
    });
    element.addEventListener("mousemove", (e) => {
        if (!isDown) {
            return;
        }
        e.preventDefault();
        const x = e.pageX - element.offsetLeft;
        const walk = (x - startX) * 4;
        element.scrollLeft = scrollLeft - walk;
    });
}
exports.dragScroll = dragScroll;
//# sourceMappingURL=dragScroll.js.map