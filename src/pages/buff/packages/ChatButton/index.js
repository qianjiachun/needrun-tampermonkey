import {
  renderChatButton
} from "../../../../utils";

function init() {
  const requestList = unsafeWindow.needrun_requestHookList;
  if (requestList.length <= 0) {
    // 调用网页自身的请求实现拦截
    let marketShow = new unsafeWindow.marketShow();
    marketShow.init();
  };
  for (let i = 0; i < requestList.length; i++) {
    let item = requestList[i];
    if (item.responseURL.includes("goods/sell_order")) {
      let data = JSON.parse(item.responseText);
      insertDom(data.data);
      break;
    }
  }
  unsafeWindow.needrun_requestHookCallback = function (xhr) {
    if (xhr.responseURL.includes("goods/sell_order")) {
      let data = JSON.parse(xhr.responseText);
      insertDom(data.data);
    }
  }
}

function insertDom(data) {
  const {
    goods_infos,
    items
  } = data;
  const url = new URL(location.href);
  const goodsId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1);
  const sellings = document.querySelectorAll(".list_tb_csgo .selling");
  for (let i = 0; i < sellings.length; i++) {
    const selling = sellings[i];
    const data = items[i];
    if (!goods_infos[goodsId].name || goods_infos[goodsId].name === "") continue;

    const inspectImg = data.asset_info.info.inspect_mobile_url && data.asset_info.info.inspect_mobile_url !== "" ? data.asset_info.info.inspect_mobile_url : data.img_src;
    const goodsInfo = {
      goodsName: goods_infos[goodsId].name,
      paintIndex: data.asset_info.info.paintindex || 0,
      paintSeed: data.asset_info.info.paintseed || 0,
      paintWear: data.asset_info.paintwear || "",
      inspectImg,
      platform: 0
    }
    const dom = selling.querySelector(".j_shoptip_handler");
    dom.insertAdjacentHTML("afterend", renderChatButton({
      style: "width: 100%",
      goodsInfo
    }));
  }
}

export default {
  init
}