
const LogQueue = require('./services/LoggingQueue')
const ApiCalls = require('./services/APICalls')
const data = require('./lib/sample-data');

/// 1. Log Concurrent Task using Promises
// var delayQueue = new LogQueue(data.tasks, 4)
// delayQueue.name();
// delayQueue.run();

/// 2. Advance JS
var apiTest = new ApiCalls
apiTest.name();
apiTest.spaceNames();
apiTest.githubRequest("mocavada")






