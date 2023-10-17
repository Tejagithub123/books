const http = require('http');
const app = require('./app');     //.app pour le tp 
const port = process.env.PORT || 3000;  

const server = http.createServer(app);

server.listen(port, ()=>{
console.log("listening on "+port )
})


