const http = require("http");
 
const createServer = () =>{
    http.createServer((request, response)=>{
}).listen(3000, ()=>console.log("Server started on PORT 3000"));
}


module.exports= {createServer}