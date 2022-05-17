const { url } = require('inspector');
const {
  respondWith404NotFound,
  urlPathOf,
} = require('./httpHelpers');
const { routerHandleResult } = require('./routerHandleResult');

const routers = [
  require('./ping').pingRouter,
  require('./contacts').contactsRouter,
  require('./contactDetails').contactDetailsRouter,
];

module.exports = function(request, response) {

  var pathURL = urlPathOf(request);
  var subPath = pathURL.split("/").pop();

  switch(pathURL) {
    case '/':
    case '/ping':
       if (routers[0].handle(request, response) !== routerHandleResult.HANDLED) {
        respondWith404NotFound(response);
      };
      break;
    case '/contacts':
      if (routers[1].handle(request, response) !== routerHandleResult.HANDLED) {
        respondWith404NotFound(response);
      };
      break;
    case `/contacts/${subPath}`:
      if (routers[2].handle(request, response) !== routerHandleResult.HANDLED) {
        respondWith404NotFound(response);
      };

    default:
      respondWith404NotFound(response);

  }  

};
