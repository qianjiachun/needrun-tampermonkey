import pages from "./pages"

function initRouter() {
    // 根据需求判断location对象的值，来选择使用哪个page
    pages.www.init();
}

export {
    initRouter
}