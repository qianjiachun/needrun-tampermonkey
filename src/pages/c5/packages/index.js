import ChatButton from "./ChatButton";

function initPkg() {
  let count = 0;
  let timer = setInterval(() => {
    if (document.getElementsByClassName("item-card").length > 0) {
      clearInterval(timer);
      ChatButton.init();
    }
    count++;
    if (count > 200) clearInterval(timer);
  }, 300);
}

export {
  initPkg
}