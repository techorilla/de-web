// Proxy all requests to target the local application.
//
//var SERVER_CONFIG = {
//  host: '192.168.1.99',
//  port: 7030,
//  context: '/api'
//}

var SERVER_CONFIG = {
    host: 'localhost',
    port: 44300,
    context: '/api'
}

var proxyOptions = require('url').parse(serverAddr(SERVER_CONFIG));
proxyOptions.route = SERVER_CONFIG.context;
var proxyMiddleware = require('proxy-middleware');

function serverAddr(serverConfig){
  //return 'https://'+serverConfig.host+':'+serverConfig.port+serverConfig.context;
    return 'https://'+serverConfig.host+':'+serverConfig.port+serverConfig.context;

}

module.exports = {
  server:{
    options: {
      port: 7033,
      base: 'app',
      hostname: '0.0.0.0',
      keepalive: true,
      open: true,
      middleware: function (connect, options) {
        // Proxy all requests to target the local application.
        var middlewares = [require('connect-livereload')()];
        options.base.forEach(function(base){
          middlewares.push(connect.static(base));
          middlewares.push(connect.directory(base));
        });
        middlewares.push(proxyMiddleware(proxyOptions));
        return middlewares;
      }
    }
  }
}
