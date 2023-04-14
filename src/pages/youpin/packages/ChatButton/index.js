import {
  getNeedRunUrlByGoodsInfo,
  openPage,
  renderChatButton,
  showMessage
} from "../../../../utils";
import {
  apiGetYoupinGoodsDetail
} from "./api";

function init() {
  unsafeWindow.needrun_requestHookCallback = function (xhr) {
    if (xhr.responseURL.includes("GetCsGoPagedList")) {
      let data = JSON.parse(xhr.responseText);
      let count = 0;
      let timer = setInterval(() => {
        if (document.getElementsByClassName("sellerNickInfo").length > 0) {
          clearInterval(timer);
          insertDom();
          initFunc(data.Data.CommodityList)
        }
        count++;
        if (count > 200) clearInterval(timer);
      }, 100);
    }
  }
}

function insertDom() {
  const sellings = document.querySelectorAll(".sellerNickInfo");
  for (let i = 0; i < sellings.length; i++) {
    const selling = sellings[i];
    selling.insertAdjacentHTML("afterend", renderChatButton({
      style: "width: 100%"
    }));
  }
}

function initFunc(items) {
  const btns = document.querySelectorAll(".needrun-chat-btn");
  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    const itemData = items[i];
    btn.addEventListener("click", async () => {
      showMessage("数据请求中，请稍等...", "info");
      const goodsId = itemData.Id;
      const commodityNo = itemData.CommodityNo;
      let ret = await apiGetYoupinGoodsDetail(goodsId, commodityNo);
      if (ret.Code !== 0) {
        showMessage("数据获取失败，请重试", "error");
        return;
      }
      showMessage("数据获取完毕", "success");
      const data = ret.Data;
      let img = "";
      if (data.NewImages && data.NewImages !== "") {
        img = "https://youpin.img898.com/" + data.NewImages;
      } else if (data.Images && data.Images !== "") {
        let imgArr = data.Images.split(",");
        for (let i = 0; i < imgArr.length; i++) {
          img += "https://youpin.img898.com/" + imgArr[i] + ";";
        }
      } else {
        img = data.ImgUrl;
      }
      const goodsInfo = {
        goodsName: data.CommodityName,
        inspectImg: img,
        paintIndex: data.PaintIndex ? Number(data.PaintIndex) : 0,
        paintSeed: data.PaintSeed ? Number(data.PaintSeed) : 0,
        paintWear: data.Abrade,
        platform: 1,
      };
      openPage(getNeedRunUrlByGoodsInfo(goodsInfo));
    })
  }
}

export default {
  init
}