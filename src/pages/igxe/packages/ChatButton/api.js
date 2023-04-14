export function apiGetIgxeGoodsInspectImg(id) {
  return new Promise(resolve => {
    fetch(`https://www.igxe.cn/show-inspect-image-${String(id)}`, {
      method: "GET",
    }).then(res => res.json()).then(ret => {
      resolve(ret.url);
    }).catch(err => {
      console.log(err);
      resolve("");
    })
  })
}