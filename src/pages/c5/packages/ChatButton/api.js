export function apiGetC5GoodsDetail(cardId) {
  return new Promise(resolve => {
    fetch(`https://www.c5game.com/napi/trade/steamtrade/sga/sell/v3/detail?id=${cardId}`, {
      method: "GET",
    }).then(res => res.json()).then(ret => {
      resolve(ret);
    }).catch(err => {
      console.log(err);
      resolve({});
    })
  })
}