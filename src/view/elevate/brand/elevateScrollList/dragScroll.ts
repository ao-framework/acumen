/**
 * Handles the dragging effect for the ui. It handles dragging 
 * with the mouse and by touch 
 * @param element 
 */
export function dragScroll(element: HTMLElement) {

    let startX: number;
    let scrollLeft: number;
    let isDown: boolean;

    element.addEventListener("mousedown", (e: MouseEvent) => {
        isDown = true;
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
    })

    element.addEventListener("touchstart", (e: TouchEvent) => {
        isDown = true;
        startX = e.targetTouches[0].pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
    })

    element.addEventListener("touchend", () => {
        isDown = false;
    })

    element.addEventListener("touchmove", (e: TouchEvent) => {
        if (!isDown) { return; }
        const x = e.targetTouches[0].pageX - element.offsetLeft
        const walk = (x - startX) * 4
        element.scrollLeft = scrollLeft - walk;
    })

    element.addEventListener("mouseleave", () => {
        isDown = false;
    })

    element.addEventListener("mouseup", () => {
        isDown = false;
    })

    element.addEventListener("mousemove", (e: MouseEvent) => {
        if (!isDown) { return; }
        e.preventDefault();
        const x = e.pageX - element.offsetLeft
        const walk = (x - startX) * 4
        element.scrollLeft = scrollLeft - walk;
    })
}
