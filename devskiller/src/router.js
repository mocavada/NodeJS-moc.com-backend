const {
  respondWith404NotFound,
} = require('./httpHelpers');
const { routerHandleResult } = require('./routerHandleResult');

const routers = [
  require('./ping').pingRouter,
  require('./contacts').contactsRouter,
  require('./contactDetails').contactDetailsRouter,
];

module.exports = function(request, response) {

  const pathURL = request.url;

  switch(pathURL) {
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
  }
  

};
