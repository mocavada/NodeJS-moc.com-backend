const {
  urlPathOf,
  respondWith200OkJson,
} = require('../httpHelpers');
const { fakeDatabase } = require('../database/fakeDatabase');
const { routerHandleResult } = require('../routerHandleResult');


function handle(request, response) {

  const contacts = fakeDatabase.selectAllFromContacts();

  if (urlPathOf(request) !== '/contacts') {
    return routerHandleResult.NO_URL_PATH_MATCH;
  }

  if (request.method !== 'GET') {
    return routerHandleResult.NO_HTTP_METHOD_MATCH;
  }


  respondWith200OkJson(response, contacts);
  return routerHandleResult.HANDLED;
}

module.exports = {
  handle,
};
