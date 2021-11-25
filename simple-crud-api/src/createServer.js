const http = require("http");
const { validationURL } = require("./validation");
const createServer = () => {
  http
    .createServer((request, response) => {
      const { isValidURL, id } = validationURL(request.url);
      if (isValidURL) {
        switch (request.method) {
          case "GET":
            break;
          case "POST":
            break;
          case "PUT":
            break;
          case "DELETE":
            break;
        }
      } else {
        response.statusCode = 404;
        response.write("The resource requested could not to be found  on this server");
      }
      response.end();
    })
    .listen(3000, () => console.log("Server started on PORT 3000"));
};

module.exports = { createServer };
