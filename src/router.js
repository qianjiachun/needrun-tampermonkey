import pages from "./pages"

function initRouter() {
    // 根据需求判断location对象的值，来选择使用哪个page
    const url = location.href;
    if (url.includes("buff")) pages.buff.init();
    if (url.includes("youpin")) pages.youpin.init();
    if (url.includes("igxe")) pages.igxe.init();
    if (url.includes("c5game")) pages.c5.init();
}

export {
    initRouter
}