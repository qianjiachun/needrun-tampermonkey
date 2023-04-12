import {
  initRouter
} from "./router.js"

unsafeWindow.requestHookList = [];
unsafeWindow.hookCallback = function (xhr) {
  // console.log(xhr);
}

function addXMLRequestCallback(callback) {
  var oldSend, i;
  if (XMLHttpRequest.callbacks) {
    XMLHttpRequest.callbacks.push(callback);
  } else {
    XMLHttpRequest.callbacks = [callback];
    oldSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function () {
      for (i = 0; i < XMLHttpRequest.callbacks.length; i++) {
        XMLHttpRequest.callbacks[i](this);
      }
      oldSend.apply(this, arguments);
    }
  }
}
addXMLRequestCallback(function (xhr) {
  xhr.addEventListener("load", function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      unsafeWindow.requestHookList.push(xhr);
      unsafeWindow.hookCallback(xhr);
    }
  });
});

initRouter();