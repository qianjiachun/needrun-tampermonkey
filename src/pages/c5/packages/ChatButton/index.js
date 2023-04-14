import {
  getNeedRunUrlByGoodsInfo,
  openPage,
  renderChatButton,
  showMessage
} from "../../../../utils";
import {
  apiGetC5GoodsDetail
} from "./api"

function init() {
  insertDom();
  initFunc();
  // unsafeWindow.needrun_requestHookCallback = function (xhr) {
  //   if (xhr.responseURL.includes("recently/list")) {
  //     let data = JSON.parse(xhr.responseText);
  //     console.log(data)
  //     // let count = 0;
  //     // let timer = setInterval(() => {
  //     //   if (document.getElementsByClassName("onsale-table-item")) {
  //     //     clearInterval(timer);
  //     //     insertDom();
  //     //     initFunc(data.Data.CommodityList)
  //     //   }
  //     //   count++;
  //     //   if (count > 200) clearInterval(timer);
  //     // }, 100);
  //   }
  // }

}

function insertDom() {
  const sellings = document.querySelectorAll(".onsale-table-item");
  for (let i = 0; i < sellings.length; i++) {
    const selling = sellings[i];
    if (!selling) return;
    const row = selling.getElementsByClassName("row");
    if (row.length === 0) return;
    const node4 = row[0].children[3];
    if (!node4) continue;

    node4.insertAdjacentHTML("beforeend", renderChatButton({
      style: "width: 100%"
    }));
  }
}

function initFunc() {
  const btns = document.querySelectorAll(".needrun-chat-btn");
  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    btn.addEventListener("click", async () => {
      const parentNode = btn.parentElement.parentElement;
      const cardId = parentNode.getElementsByClassName("item-card")[0].getAttribute("cardid");
      if (cardId && cardId !== "") {
        showMessage("数据请求中，请稍等...", "info");
        let detail = await apiGetC5GoodsDetail(cardId);
        if (!detail.success) {
          showMessage("数据获取失败，请重试", "error");
          return;
        }
        showMessage("数据获取完毕", "success");
        const {
          data
        } = detail;
        const goodsInfo = {
          goodsName: data.name,
          inspectImg: data.inspectImage && data.inspectImage !== "" ? data.inspectImage : data.imageUrl,
          paintIndex: data.assetInfo.paintIndex ? Number(data.assetInfo.paintIndex) : 0,
          paintSeed: data.assetInfo.paintSeed ? Number(data.assetInfo.paintSeed) : 0,
          paintWear: data.assetInfo.wear,
          platform: 3,
        };
        openPage(getNeedRunUrlByGoodsInfo(goodsInfo));
      }
    })
  }
}

export default {
  init
}