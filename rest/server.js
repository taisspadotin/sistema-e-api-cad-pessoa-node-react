const http = require('http');
const app = require('./app');//importando o app
const port = process.env.PORT || 3020;
const server = http.createServer(app);

server.listen(port);