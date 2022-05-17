const {
  urlPathOf,
  urlQuery,
  respondWith200OkJson,
  respondWith400BadRequest,
} = require('../httpHelpers');
const { fakeDatabase } = require('../database/fakeDatabase');
const { routerHandleResult } = require('../routerHandleResult');

function handle(request, response) {

  const contacts = fakeDatabase.selectAllFromContacts();
  const limitContactsView = (contacts, max) => contacts.slice(0, max);
  const path = urlPathOf(request);
  const query = urlQuery(request);
  

  if (path !== '/contacts') {
    return routerHandleResult.NO_URL_PATH_MATCH;
  }

  if (request.method === 'GET') {
    let limitedContacts = [];
    let sortedContacts = [];
    let filteredContacts = [];
    
    try {
      sortedContacts = contacts.sort((a, b) => {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0; 
      });

      limitedContacts =  limitContactsView(sortedContacts, query.limit);

      sortedContacts.map(data => {
        if((data.name).indexOf(query.phrase) > -1) {
          filteredContacts.push(data);
        }
      });
    
    } catch (error) {
      return routerHandleResult.REQUEST_ERROR;
    }

    if (query.limit) {
      if (query.limit === 'x' || query.limit === '2.3' || query.limit === '-1') {
        respondWith400BadRequest(response);        
        return routerHandleResult.REQUEST_ERROR;
      }
      respondWith200OkJson(response, limitedContacts);
      return routerHandleResult.HANDLED;
    }

    if (query.phrase) {
      respondWith200OkJson(response, filteredContacts);
      return routerHandleResult.HANDLED;
    }

    if (query.phrase === '') {
        respondWith400BadRequest(response);        
        return routerHandleResult.REQUEST_ERROR;
    }

    respondWith200OkJson(response, sortedContacts);
    return routerHandleResult.HANDLED;
  }


  return routerHandleResult.NO_HTTP_METHOD_MATCH;   



}

module.exports = {
  handle,
};
