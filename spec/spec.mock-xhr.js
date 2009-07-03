
JSpec.Mock = {
  confirmWith: function(val) {
    JSpec.Mock.confirmText = null;
    iframeWindow.confirm = function(str) {
      JSpec.Mock.confirmText = str;
      return val;
    };
  }
};
JSpec.XHR = function() {};
JSpec.XHR.returns = function(str, type, status) {
  codes = {
    100: "Continue", 
    101: "Switching Protocols", 
    200: "OK", 
    201: "Created", 
    202: "Accepted", 
    203: "Non-Authoritative Information",
    204: "No Content", 
    205: "Reset Content", 
    206: "Partial Content",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    307: "Temporary Redirect",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Request Entity Too Large",
    414: "Request-URI Too Long",
    415: "Unsupported Media Type",
    416: "Requested Range Not Satisfiable",
    417: "Expectation Failed",
    422: "Unprocessable Entity",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported"
  }  ;
  JSpec.XHR.prototype.responseText = str;
  JSpec.XHR.prototype.status = status || 200;
  JSpec.XHR.prototype.statusText = codes[status || 200];
  JSpec.XHR.prototype.headers = JSpec.XHR.prototype.headers || {};
  JSpec.XHR.prototype.headers["content-type"] = type;
};
JSpec.XHR.headers = function(headers) {
  JSpec.XHR.prototype.headers = headers;
};
JSpec.XHR.prototype = {
  abort: function() {},
  getAllResponseHeaders: function() {},
  getResponseHeader: function(header) {
    return this.headers[header.toLowerCase()];
  },
  open: function(method, url, async, user, pass) {
    JSpec.XHR.url = url;
  },
  send: function(content) {
    this.readyState = 4;
  },
  setRequestHeader: function(label, value) {}
};

describe 'JSpec'
  describe 'Ajax Mocks'
    it 'should description'
      window.XMLHttpRequest = JSpec.XHR;
      JSpec.XHR.returns('({foo : "bar"})', 'application/json', 200)
      $.getJSON('test', function(response){
        console.log(response);
      })
    end
  end
end