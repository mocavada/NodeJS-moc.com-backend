const {
  urlPathOf,
  respondWith200OkJson,
  respondWith404NotFound,
  respondWith204NoContent,
} = require('../httpHelpers');
const { fakeDatabase } = require('../database/fakeDatabase');
const { routerHandleResult } = require('../routerHandleResult');

function handle(request, response) {

  const contactId = urlPathOf(request).split("/").pop();
  const getContact = (id) => fakeDatabase.selectFromContactsById(id);
  const deleteContact = (id) => fakeDatabase.deleteContactsById(id);
  console.log('DEBUG -', contactId, getContact);

  if (urlPathOf(request) !== `/contacts/${contactId}`) {
    return routerHandleResult.NO_URL_PATH_MATCH;
  }

  if (request.method === 'GET') {
    let customer;
    try {
      customer = getContact(contactId)[0];
      if (!customer) {
        return routerHandleResult.ID_NOT_FOUND;
      }
    } catch (error) {
      return routerHandleResult.REQUEST_ERROR;
    } 
    respondWith200OkJson(response, customer);
    return routerHandleResult.HANDLED; 
  } 


  if (request.method === 'DELETE') {
    try {
      if (getContact(contactId).length === 0) {
        return routerHandleResult.ID_NOT_FOUND;  
      }
      deleteContact(contactId);
    } catch (error) {
      return routerHandleResult.REQUEST_ERROR;
    }
    respondWith204NoContent(response)
    return routerHandleResult.HANDLED; 
  } 

  return routerHandleResult.NO_HTTP_METHOD_MATCH;  
}


module.exports = {
  handle,
};
