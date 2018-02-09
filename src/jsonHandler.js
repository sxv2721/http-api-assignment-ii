
const users = {};
const respondJSON = (request, response, status, Object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(Object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };
  console.dir(users);
  console.dir(responseJSON);
  respondJSON(request, response, 200, responseJSON);
};
const getUsersMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;
  console.dir(users);
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';

    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

module.exports = {
  notFound,
  notFoundMeta,
  getUsers,
  getUsersMeta,
  addUser,
};
