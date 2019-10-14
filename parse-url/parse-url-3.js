var url = require("url");
var parse = url.parse;
var Url = url.Url;
function parseurl(req) {
  var url = req.url;

  if (url === undefined) {
    // URL is undefined
    return undefined;
  }

  var parsed = req._parsedUrl;

  if (fresh(url, parsed)) {
    // Return cached URL parse
    return parsed;
  }

  // Parse the URL
  parsed = fastparse(url);
  parsed._raw = url;

  return (req._parsedUrl = parsed);
}
function fastparse(str) {
  if (typeof str !== "string" || str.charCodeAt(0) !== 0x2f /* / */) {
    return parse(str);
  }
  console.log("!!!");
  var pathname = str;
  var query = null;
  var search = null;

  // This takes the regexp from https://github.com/joyent/node/pull/7878
  // Which is /^(\/[^?#\s]*)(\?[^#\s]*)?$/
  // And unrolls it into a for loop
  for (var i = 1; i < str.length; i++) {
    switch (str.charCodeAt(i)) {
      case 0x3f /* ?  */:
        if (search === null) {
          pathname = str.substring(0, i);
          query = str.substring(i + 1);
          search = str.substring(i);
        }
        break;
      case 0x09: /* \t */
      case 0x0a: /* \n */
      case 0x0c: /* \f */
      case 0x0d: /* \r */
      case 0x20: /*    */
      case 0x23: /* #  */
      case 0xa0:
      case 0xfeff:
        return parse(str);
    }
  }

  var url = Url !== undefined ? new Url() : {};

  url.path = str;
  url.href = str;
  url.pathname = pathname;

  if (search !== null) {
    url.query = query;
    url.search = search;
  }

  return url;
}
function fresh(url, parsedUrl) {
  return (
    typeof parsedUrl === "object" &&
    parsedUrl !== null &&
    (Url === undefined || parsedUrl instanceof Url) &&
    parsedUrl._raw === url
  );
}
console.log(fastparse("/tags.html?simple=true&fuck=1#HTML"));
