function delegate(element, selector, type, callback, useCapture) {
  var listenerFn = listener.apply(this, arguments);
  element.addEventListener(type, listenerFn, useCapture);
  return {
    destroy: function() {
      element.removeEventListener(type, listenerFn, useCapture);
    }
  };
}
function closest(element, selector) {
  while (element && element.nodeType !== Node.DOCUMENT_NODE) {
    if (typeof element.matches === "function" && element.matches(selector)) {
      return element;
    }
    element = element.parentNode;
  }
}
function listener(element, selector, type, callback) {
  return function(e) {
    e.delegateTarget = closest(e.target, selector);
    if (e.delegateTarget) {
      callback.call(element, e);
    }
  };
}

// module.exports = delegate;
