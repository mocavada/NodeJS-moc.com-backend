const {
  urlPathOf,
  urlQuery,
  respondWith200OkJson,
  respondWith404NotFound,
  respondWith400BadRequest
} = require('../httpHelpers');
const { fakeDatabase } = require('../database/fakeDatabase');
const { routerHandleResult } = require('../routerHandleResult');

function handle(request, response) {

  var path = urlPathOf(request)
  var contactId = path.split("/").pop();
  var params =  urlQuery(request);
  let getCustomer;
  let customer = {};
  console.log('DEBUG -', path, contactId);

  if (request.method !== 'GET') {
    return routerHandleResult.NO_HTTP_METHOD_MATCH;      
  }

  if (path !== `/contacts/${contactId}`) {
    return routerHandleResult.NO_URL_PATH_MATCH;
  }

  try {
    getCustomer = fakeDatabase.selectFromContactsById(contactId);
    customer = getCustomer[0];

    if (getCustomer.length === 0) {
      return routerHandleResult.ID_NOT_FOUND;
    }

  } catch (err) {
    return routerHandleResult.SERVER_REQUEST_ERROR;
  }

  respondWith200OkJson(response, customer);
  return routerHandleResult.HANDLED;
  
}


module.exports = {
  handle,
};
