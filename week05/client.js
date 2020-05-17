const net = require('net');

class Request {
    constructor({
        host = '127.0.0.1',
        port = '80',
        methods = 'GET',
        headers = {},
        data = {}
    }) {
        this.host = host
        this.port = port
        this.methods = methods
        this.headers = headers
        this.data = data
        if (!this.headers['Content-Type'] || methods === 'GET') {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            this.bodyText = Object.keys(this.data).map(key => {
                return `${encodeURIComponent(key)}=${this.data[key]}\r\n`
            }).join('&')
        }
        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(data)
        }
    }

    send() {
        const client = net.createConnection({
            host: this.host,
            port: this.port
        }, () => {
            // 'connect' 监听器
            console.log('成功连接服务器');
            client.write(this.template)
            /* client.write('POST / HTTP/1.1\r\n')
            client.write('Content-Length: 2\r\n')
            client.write('Content-Type: application/x-www-form-urlencoded\r\n')
            client.write('\r\n');
            client.write('aa\r\n'); */
        });
        client.on('data', (data) => {
            console.log(data.toString());
            client.end();
        });
        client.on('end', () => {
            console.log('已从服务器断开');
        });
        client.on('error', (e) => {
            console.log(e);
        });
    }

    get template() {
        const headersStr = Object.keys(this.headers).map(key => {
            return `${encodeURIComponent(key)}: ${this.headers[key]}\r\n`
        }).join('')
        return `${this.methods} / HTTP/1.1\r\nContent-Length: ${this.bodyText.length}\r\n${headersStr}\r\n${this.bodyText}\r\n`
    }
}

const req = new Request({
    host: '127.0.0.1',
    port: 3000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Auth': 'token'
    },
    data: {
        name: 'zs'
    }
})
req.send()