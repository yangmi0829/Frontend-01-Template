const http = require('http')
const fs = require('fs')
http.createServer((req, res) => {
    console.log(req.headers)
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    const content = fs.readFileSync('./content.js', {
        encoding: 'UTF-8'
    })
    console.log('返回数据长度:', content.length.toString(16))
    console.log('返回数据', content)
    res.end(content);
}).listen(3000);