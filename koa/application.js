
const response = require('./response');
const compose = require('../koa-compose/koa-compose.js');
const context = require('./context');
const request = require('./request');
const Emitter = require('events');
const Stream = require('stream');
const http = require('http');

module.exports = class Application extends Emitter {
    constructor(options) {
      super();
      options = options || {};
      if (options.keys) this.keys = options.keys;
      this.middleware = [];
      this.context = Object.create(context);
      this.request = Object.create(request);
      this.response = Object.create(response);
    }
  
    listen(...args) {
      const server = http.createServer(this.callback());
      return server.listen(...args);
    }

    use(fn) {
      if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
      this.middleware.push(fn);
      return this;
    }
    callback() {
      const fn = compose(this.middleware);
      const handleRequest = (req, res) => {
        const ctx = this.createContext(req, res);
        return this.handleRequest(ctx, fn);
      };
  
      return handleRequest;
    }
    handleRequest(ctx, fnMiddleware) {
      const res = ctx.res;
      res.statusCode = 404;
      const handleResponse = () => respond(ctx);
      return fnMiddleware(ctx).then(handleResponse);
    }
  
    createContext(req, res) {
      const context = Object.create(this.context);
      const request = context.request = Object.create(this.request);
      const response = context.response = Object.create(this.response);
      context.app = request.app = response.app = this;
      context.req = request.req = response.req = req;
      context.res = request.res = response.res = res;
      request.ctx = response.ctx = context;
      request.response = response;
      response.request = request;
      context.originalUrl = request.originalUrl = req.url;
      context.state = {};
      return context;
    }
  };
  
  
  function respond(ctx) {
    const res = ctx.res;
    let body = ctx.body;
    if (body instanceof Stream) return body.pipe(res);
    res.end(body);
  }
  