import ChatButton from "./ChatButton"

function initPkg() {
  if (location.href.includes("buff") && location.href.includes("goods")) {
    let count = 0;
    let timer = setInterval(() => {
      if (document.getElementsByClassName("j_shoptip_handler").length > 0) {
        clearInterval(timer);
        ChatButton.init();
        count++;
        if (count > 200) clearInterval(timer);
      }
    }, 300);
  }
}

export {
  initPkg
}