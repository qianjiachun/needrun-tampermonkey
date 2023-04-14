import {
  renderChatButton,
  showMessage,
} from "../../../../utils";
import {
  apiGetIgxeGoodsInspectImg
} from "./api";

function init() {
  unsafeWindow.needrun_requestHookCallback = function (xhr) {
    if (xhr.responseURL.includes("product/trade")) {
      let data = JSON.parse(xhr.responseText);
      let count = 0;
      let timer = setInterval(() => {
        if (document.getElementsByClassName("user-img").length > 0) {
          clearInterval(timer);
          insertDom();
          initFunc(data.d_list);
        }
        count++;
        if (count > 200) clearInterval(timer);
      }, 100);
    }
  }
}

function insertDom() {
  const sellings = document.querySelectorAll(".user-img");
  for (let i = 0; i < sellings.length; i++) {
    const selling = sellings[i];
    if (selling.querySelector(".needrun-chat-btn")) {
      selling.querySelector(".needrun-chat-btn").remove();
    }
    let style = "width: 100%;";
    if (selling.querySelectorAll(".ui-box").length > 0) {
      style += "position: absolute;margin-top: 4rem;";
    }
    selling.insertAdjacentHTML("beforeend", renderChatButton({
      style
    }));
  }
}

function initFunc(items) {
  const btns = document.querySelectorAll(".needrun-chat-btn");
  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    const item = items[i];

    btn.addEventListener("click", async () => {
      let img = item.icon_url;
      if (item.inspect_img_small && item.inspect_img_small !== "") {
        showMessage("数据请求中，请稍等...", "info");
        img = await apiGetIgxeGoodsInspectImg(item.id) || item.icon_url;
        showMessage("数据获取完毕", "success");
      }

      const goodsInfo = {
        goodsName: item.name,
        inspectImg: img,
        paintIndex: item.paint_index ? Number(item.paint_index) : 0,
        paintSeed: item.paint_seed ? Number(item.paint_seed) : 0,
        paintWear: item.exterior_wear,
        platform: 2,
      };
      openPage(getNeedRunUrlByGoodsInfo(goodsInfo));
    })
  }
}

export default {
  init
}