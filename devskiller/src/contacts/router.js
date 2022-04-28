const {
  urlPathOf,
  urlQuery,
  respondWith200OkJson,
} = require('../httpHelpers');
const { fakeDatabase } = require('../database/fakeDatabase');
const { routerHandleResult } = require('../routerHandleResult');



function handle(request, response) {

  const contacts = fakeDatabase.selectAllFromContacts();
  var path = urlPathOf(request)
  
  console.log(path);

  if (request.method !== 'GET') {
    return routerHandleResult.NO_HTTP_METHOD_MATCH;      
  }

  if (path !== '/contacts') {
    return routerHandleResult.NO_URL_PATH_MATCH;
  }

  respondWith200OkJson(response, contacts);
  return routerHandleResult.HANDLED;

}

module.exports = {
  handle,
};
