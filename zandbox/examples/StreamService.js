const { createServer } = require('http')
const {createReadStream, createWriteStream, stat } = require('fs');
const { Transform } = require('stream');
const { promisify } = require('util');
const { parse } = require('path');
const multiparty = require('multiparty');
const fileInfo = promisify(stat);
const filename = './lib/assets/sample-video.mp4'; //file url must be relative to index.js




class FileStream {

    name = () => console.log('Service Name:', this.constructor.name);

    readWriteStream = () => {
        const readStream = createReadStream(filename);
        const writeStream = createWriteStream('./delete-copy.mp4');

        readStream.on('data', (chunk) => {
            //apply back pressure
            const result = writeStream.write(chunk);
            if (!result) {
                console.log('backpressure')
                readStream.pause();
            }
            console.log('size', chunk.length);
        });
        
        readStream.on('error', (error) => {
            console.log('an error occured');
            console.error(error);
        });

        readStream.on('end', () => {
            writeStream.end();
        });

        writeStream.on('drain',  () => {
             //apply back pressure
            console.log('drained');
            readStream.resume();
        }) 
        writeStream.on('close', () => {
            process.stdout.write('file copied\n');
        });
        
    }
}

class ReplaceText extends Transform {

    constructor(char) {
        super();
        this.replaceChar = char;
    }

    _transform(chunk, encode, callback) {
        const transformChunk = chunk.toString()
            .replace(/[a-z]|[A-Z]|[0-9]/g,this.replaceChar);
        this.push(transformChunk)
        callback();
    }

    _flush(callback) {
        this.push('more suff is being passed...');
        callback();
    }
}

class HTTPStream {

    responWithVideo = async (req, res) => {
        const { size } = await fileInfo(filename);
        const range = req.headers.range;

        if (range) {
            //safari requirement
            let [ start, end ] = range.replace(/bytes=/, '').split('-');
            start = parseInt(start, 10);
            end = end ? parseInt(end, 10) : size - 1;

            res.writeHead(206, {
                'Content-Range' : `bytes ${start}-${end}/${size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': (end-start) + 1,
                'Content-Type' : 'video/mp4'  
            })
            createReadStream(filename, {start, end}).pipe(res);

        } else {
            console.log('range: ', range);
            res.writeHead(200, {
                'Content-Lenght': size,
                'Content-Type' : 'video/mp4' 
            });
            //read-pipe-write
            createReadStream(filename).pipe(res);
        }
    };

    videoStream = () => { 
        createServer((req, res) => {
            if (req.method === 'POST') {
                let form = new multiparty.Form();
                form.on('part', (part) => {
                    part.pipe(createWriteStream(`./${part.filename}`))
                    .on('close', () => {
                        res.writeHead(200, {
                            'Content-Type' : 'text/html'
                        });
                        res.end(`
                        <h1>File uploaded: ${part.filename}</h1>
                        `);
                    });
                });
                form.parse(req);
               
            }
            else if (req.url === '/video') {
                this.responWithVideo(req, res);
            } else {
                res.writeHead(200, {
                    'Content-Type' : 'text/html'
                });
                res.end(`
                <form enctype="multipart/form-data" method="POST" action="/">
                    <input type="file" name="upload-file" />
                    <button>Upload File</button>
                </form>                     
                `);
            }
        }).listen(3000, () => console.log('server runnig - 4000' ));
    };

}

module.exports = { FileStream, HTTPStream, ReplaceText };




