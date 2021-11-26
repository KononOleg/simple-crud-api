const http = require("http");
const { validationURL } = require("./validation");
const { getPerson, createPerson, deletePerson, updatePerson } = require("./database");
const { validate } = require("uuid");
const createServer = () => {
  http
    .createServer(async (request, response) => {
      try {
        const { isValidURL, id } = validationURL(request.url);
        if (isValidURL) {
          if (validate(id) || !id) {
            switch (request.method) {
              case "GET":
                getPerson(id, response);
                break;
              case "POST":
                await createPerson(request, response);
                break;
              case "PUT":
                await updatePerson(id, request, response);
                break;
              case "DELETE":
                deletePerson(id, response);
                break;
            }
          } else {
            response.statusCode = 400;
            response.write("id is not valid");
          }
        } else {
          response.statusCode = 404;
          response.write("The resource requested could not to be found  on this server");
        }
      } catch {
        response.statusCode = 500;
        response.write("Something went wrong");
      }
      response.end();
    })
    .listen(3000, () => console.log("Server started on PORT 3000"));
};

module.exports = { createServer };
