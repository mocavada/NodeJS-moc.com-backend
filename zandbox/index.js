
const PromiseQueue = require('./services/LoggingQueue')
const data = require('./lib/sample-data');


// 1. Log Concurrent Task using Promises
var delayQueue = new PromiseQueue(data.tasks, 4)
delayQueue.run();

