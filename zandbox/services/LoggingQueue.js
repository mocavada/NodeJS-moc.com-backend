//Log Concurrent Task using Promises
const logUpdate = require('log-update');
const toX = () => 'X';

class LoggingQueue {
    constructor(promises=[], concurrentCount=1) {
        this.concurrent = concurrentCount;
        this.total = promises.length;
        this.todo = promises;
        this.running = [];
        this.complete = [];
    }

    // return true : task in running < task running at the same time & there is task in todo
    // return false: if all are 0
    get runAnother() {
        return (this.running.length < this.concurrent) && this.todo.length;
    }

    graphTask() {
        var { todo, running, complete } = this;
        logUpdate(`
            todo: [${todo.map(toX)}]
            running: [${running.map(toX)}]
            complete: [${complete.map(toX)}]
        `);
    }

    run() {
        while (this.runAnother) {
            var promise = this.todo.shift();
           
            promise.then(() => {
                this.complete.push(this.running.shift());
                this.graphTask();
                this.run();
            })
            
            this.running.push(promise);
            this.graphTask();
        }
        
        process.exit
        
    }
}


module.exports = LoggingQueue;


