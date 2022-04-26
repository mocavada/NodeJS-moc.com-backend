const { createServer } = require('./server');
const { fakeDatabase } = require('./database/fakeDatabase');

const contacts = require('./database/fakeContactsData');

contacts.forEach((contact) => {
  fakeDatabase.insertIntoContacts(contact);
});

const server = createServer();

server.on('request', (req, res) => {
  console.log(req.method)
});


const port = 8080;
const ip = '127.0.0.1';

server.listen(port, ip);


console.log("TEST -");
