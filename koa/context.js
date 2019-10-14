// const Cookies = require('cookies');
// const COOKIES = Symbol('context#cookies');
const delegate=require("../delegate/delegate-2.js")
const proto = module.exports = {
//   get cookies() {
//     if (!this[COOKIES]) {
//       this[COOKIES] = new Cookies(this.req, this.res, {
//         keys: this.app.keys,
//         secure: this.request.secure
//       });
//     }
//     return this[COOKIES];
//   },

//   set cookies(_cookies) {
//     this[COOKIES] = _cookies;
//   }
};
delegate(proto, 'response')
  .method('set')
  .method('get')
  .access('status')
  .access('body')


delegate(proto, 'request')
  .method('get')
  .access('socket')
  .access('method')
  .access('url')
  .getter('header')