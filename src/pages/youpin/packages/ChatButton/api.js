export function apiGetYoupinGoodsDetail(goodsId, commodityNo) {
  return new Promise(resolve => {
    fetch(`https://api.youpin898.com/api/commodity/Commodity/Detail?Id=${String(goodsId)}&CommodityNo=${String(commodityNo)}`, {
      method: "GET",
    }).then(res => res.json()).then(ret => {
      resolve(ret);
    }).catch(err => {
      console.log(err);
      resolve({});
    })
  })
}