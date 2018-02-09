const http = require('http');
const query = require('querystring');
const url = require('url');

const htmlHandler = require('./htmlHandler.js');
const JSONHandler = require('./jsonHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedURL) => {
  if (parsedURL.pathname === '/addUser') {
    const res = response;

    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();

      const bodyParams = query.parse(bodyString);

      JSONHandler.addUser(request, res, bodyParams);
    });
  }
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  switch (request.method) {
    case 'GET':
      if (parsedURL.pathname === '/') {
        htmlHandler.getIndex(request, response);
      } else if (parsedURL.pathname === '/style.css') {
        htmlHandler.getCSS(request, response);
      } else if (parsedURL.pathname === '/getUsers') {
        JSONHandler.getUsers(request, response);
      } else if (parsedURL.pathname === '/notReal') {
        JSONHandler.notFound(request, response);
      } else {
        JSONHandler.notFound(request, response);
      }
      break;
    case 'HEAD':
      if (parsedURL.pathname === '/getUsers') {
        JSONHandler.getUsersMeta(request, response);
      } else {
        JSONHandler.notFoundMeta(request, response);
      }
      break;
    case 'POST':
      handlePost(request, response, parsedURL);
      break;
    default:
      JSONHandler.notFound(request, response);
      break;
  }
  console.dir(parsedURL);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
