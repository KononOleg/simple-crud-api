const supertest = require("supertest");
const { createServer } = require("../src/createServer");

describe("Scenarios", () => {
  let request, server;
  beforeAll(() => {
    server = createServer(3500);
    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });
  describe("First scenario", () => {
    test("GET-request should get all persons, expected []", async () => {
      const response = await request.get("/person");
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.text)).toEqual([]);
    });
    let newPerson;
    test("POST-request should create new person, expected status code 201", async () => {
      const response = await request.post("/person").send({
        name: "TEST",
        age: 54,
        hobbies: ["TEST"],
      });
      newPerson = JSON.parse(response.text);
      expect(response.statusCode).toBe(201);
    });
    test("GET-request should get new persons, expected new person", async () => {
      const response = await request.get(`/person/${newPerson.id}`);
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.text)).toEqual(newPerson);
    });
    test("PUT-request should changes new persons, expected status code 200", async () => {
      const response = await request.put(`/person/${newPerson.id}`).send({
        name: "TEST1",
        age: 54,
        hobbies: ["TEST"],
      });
      expect(response.statusCode).toBe(200);
    });
    test("DELETE-request should delete new persons, expected status code 200", async () => {
      const response = await request.delete(`/person/${newPerson.id}`);
      expect(response.statusCode).toBe(200);
    });
  });
  describe("Second scenario", () => {
    test("GET-request should get person, when id is not found, expected status code 404", async () => {
      const response = await request.get("/person/b2b056a9-6804-4e4c-8c93-b5cceaba4b37");
      expect(response.statusCode).toBe(404);
    });
    test("DELETE-request should delete person, when id is not found, expected status code 404", async () => {
      const response = await request.delete("/person/b2b056a9-6804-4e4c-8c93-b5cceaba4b37");
      expect(response.statusCode).toBe(404);
    });
    test("PUT-request should changes person, when id is not found, expected status code 404", async () => {
      const response = await request.put("/person/b2b056a9-6804-4e4c-8c93-b5cceaba4b37").send({
        name: "TEST1",
        age: 54,
        hobbies: ["TEST"],
      });
      expect(response.statusCode).toBe(404);
    });
  });
  describe("Third scenario", () => {
    test("GET-request should get person with invalid id, expected status code 400", async () => {
      const response = await request.get("/person/invalid");
      expect(response.statusCode).toBe(400);
    });
    test("DELETE-request should delete person with invalid id, expected status code 400", async () => {
      const response = await request.delete("/person/invalid");
      expect(response.statusCode).toBe(400);
    });
    test("PUT-request should changes person with invalid id, expected status code 400", async () => {
      const response = await request.put("/person/invalid").send({
        name: "TEST1",
        age: 54,
        hobbies: ["TEST"],
      });
      expect(response.statusCode).toBe(400);
    });
    test("POST-request should create new person,without required fields, expected status code 400", async () => {
      const response = await request.post("/person").send({
        name: "TEST",
        hobbies: ["TEST"],
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("Fourth scenario", () => {
    test("Errors that occur when processing a request for /person are handled correctly,expected status code 500 and the corresponding message", async () => {
      const response = await request.post("/person").send("This is not an object");
      expect(response.statusCode).toBe(500);
      expect(response.text).toEqual("Something went wrong");
    });
    test("Requests for non-existent resources (for example, /some/non/existing/resource) are processed correctly, expected status code 404 and human friendly message", async () => {
      const response = await request.get("/some/non/existing/resource");
      expect(response.statusCode).toBe(404);
      expect(response.text).toEqual("The resource requested could not to be found  on this server");
    });
  });
});
