const { createServer } = require('./server');
const { fakeDatabase } = require('./database/fakeDatabase');

const contacts = require('./database/fakeContactsData');

contacts.forEach((contact) => {
  fakeDatabase.insertIntoContacts(contact);
});

const server = createServer();

server.on('request', (req, res) => {
  console.log(`Port Running on ${port} and Request Type is ${req.method}`)
});

const port = 8080;
const ip = '127.0.0.1';

server.listen(port, ip);

