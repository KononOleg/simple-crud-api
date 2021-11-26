const { v4 } = require("uuid");

const persons = [
  { id: v4(), name: "TEST", age: 54, hobbies: ["TEST"] },
  { id: v4(), name: "TEST", age: 54, hobbies: ["TEST"] },
];

const getPerson = (id, response) => {
  if (!id) {
    response.write(JSON.stringify(persons));
  } else {
    const person = persons.find((person) => person.id == id);
    if (!person) {
      response.statusCode = 404;
      response.write("Person not found");
    } else {
      response.write(JSON.stringify(person));
    }
  }
};

const createPerson = async (request, response) => {
  let body = "";
  await request.on("data", (chunk) => {
    body += chunk;
  });
  const { name, age, hobbies } = JSON.parse(body);
  if (name | age | hobbies) {
    const person = { id: v4(), name: name, age: age, hobbies: hobbies };
    persons.push(person);
    response.statusCode = 201;
    response.write(JSON.stringify(person));
  } else {
    response.statusCode = 400;
    response.write("The body of the request does not contain required fields");
  }
};

const updatePerson = async (id, request, response) => {
  const person = persons.find((person) => person.id == id);
  if (!person) {
    response.statusCode = 404;
    response.write("Person not found");
  } else {
    let body = "";
    await request.on("data", (chunk) => {
      body += chunk;
    });

    const { name, age, hobbies } = JSON.parse(body);
    person.name = name;
    person.age = age;
    person.hobbies = hobbies;
    response.write(JSON.stringify(person));
  }
};

const deletePerson = (id, response) => {
  const person = persons.find((person) => person.id == id);
  if (!person) {
    response.statusCode = 404;
    response.write("Person not found");
  } else {
    persons.splice(persons.indexOf(person), 1);
    response.write("Person deleted");
  }
};

module.exports = { getPerson, createPerson, deletePerson, updatePerson };
