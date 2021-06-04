const http = require('http')
const fs = require('fs');
const filename = './lib/assets/sample-video.mp4';

const { promisify } = require('util');

class StreamService {

    name = () => console.log('Service Name:', this.constructor.name);

    readVideo = () => {
        const readStream = fs.createReadStream(filename);

        readStream.on('data', (chunk) => {
            console.log('size', chunk.length);
        });
        
        readStream.on('end', () => {
            console.log('read stream finished');
        });
        
        readStream.on('error', (error) => {
            console.log('an error occured');
            console.error(error);
        });
    }
    
   
    streamOnline = () => { 

        http.createServer((req, res) => {
            res.writeHead(200, {'Content-Type' : 'video/mp4' });
            //read-pipe-write
            fs.createReadStream(filename).pipe(res);
        
        }).listen(3000, () => console.log('server runnig - 3000'));
    }
    
    
   

}

module.exports = StreamService;




