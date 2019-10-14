module.exports = {
  get socket() {
    return this.res.socket;
  },

  get header() {
    return this.res.getHeaders();
  },

  get headers() {
    return this.header;
  },

  get status() {
    return this.res.statusCode;
  },

  set status(code) {
    this._explicitStatus = true;
    this.res.statusCode = code;
  },

  get body() {
    return this._body;
  },
  set body(val) {
    this._body = val;
    if (!this._explicitStatus) this.status = 200;
  },
  get(field) {
    console.log("!!!!!!", this.header);
    return this.header[field.toLowerCase()] || "";
  },
  set(field, val) {
    this.res.setHeader(field, val);
  }
};
