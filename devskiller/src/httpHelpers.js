const { request } = require('http');
const url = require('url');

module.exports = {
  
  urlPathOf: (request) => url.parse(request.url, true).pathname,
  urlQuery: (request) => url.parse(request.url, true).query,


  respondWith200OkText: (response, textBody) => {
    response.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    response.end(textBody);
  },

  respondWith200OkJson: (response, jsonBody) => {
    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    response.end(JSON.stringify(jsonBody));
  },

  respondWith404NotFound: (response) => {
    response.writeHead(404);
    response.end();
  },

  respondWith400BadRequest: (response, error) => {
    response.writeHead(400);
    response.end(error);
  },

  respondWith204NoContent: (response, error) => {
    response.writeHead(204);
    response.end();
  },

};
