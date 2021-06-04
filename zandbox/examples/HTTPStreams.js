const { createServer } = require('http')
const { stat, createReadStream } = require('fs');
const { promisify } = require('util');
const filename = '../lib/assets/sample-video.mp4';

const fileinfo = promisify(stat);

class HTTPStreams {


    playVideo = createServer((req, res) => {

        res.writeHead(200, {'Content-Type' : 'video/mp4' });
        createReadStream(filename).pipe(res);
    
    }).listen(3000, () => console.log('server runnig - 3000'));


}

module.exports =  HTTPStreams;


