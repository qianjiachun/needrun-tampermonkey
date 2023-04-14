unsafeWindow.needrun_requestHookList = [];
unsafeWindow.needrun_requestHookCallback = function (xhr) {};

var originalOpen = XMLHttpRequest.prototype.open;
var originalSend = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.open = function () {
  this._url = arguments[1];
  originalOpen.apply(this, arguments);
};

XMLHttpRequest.prototype.send = function () {
  var self = this;
  this.addEventListener('load', function () {
    if (self.readyState === 4 && self.status === 200) {
      unsafeWindow.needrun_requestHookList.push(self);
      unsafeWindow.needrun_requestHookCallback(self);
    }
  });
  originalSend.apply(this, arguments);
};