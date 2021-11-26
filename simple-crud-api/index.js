const { createServer } = require("./src/createServer");
require("dotenv").config({ path: "./.env" });

createServer(process.env.PORT);
