const http = require('http');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'eugene',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

const server = http.createServer((req, res) => {
  if (req.url === '/insert') {
    handleInsert(req, res);
  } else if (req.url === '/delete') {
    handleDelete(req, res);
  } else if (req.url === '/update') {
    handleUpdate(req, res);
  } else if (req.url === '/select') {
    handleSelect(req, res);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(8000, 'localhost', () => {
  console.log('Server running at http://localhost:8000/');
});

function handleInsert(req, res) {
  // Extract the data to be inserted from the request body
  let data = '';

  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    // Parse the data as JSON
    const jsonData = JSON.parse(data);

    // Perform the insert operation
    connection.query('INSERT INTO your_table SET ?', jsonData, (err, result) => {
      if (err) {
        console.error('Error executing insert query:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }
      res.statusCode = 200;
      res.end('Insert successful');
    });
  });
}

function handleDelete(req, res) {
  // Extract the condition for deletion from the request query parameters
  const condition = req.url.split('?')[1];

  // Perform the delete operation
  connection.query(`DELETE FROM your_table WHERE ${condition}`, (err, result) => {
    if (err) {
      console.error('Error executing delete query:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
      return;
    }
    res.statusCode = 200;
    res.end('Delete successful');
  });
}

function handleUpdate(req, res) {
  // Extract the updated data and condition from the request body
  let data = '';

  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    // Parse the data as JSON
    const jsonData = JSON.parse(data);

    // Extract the condition for updating from the request query parameters
    const condition = req.url.split('?')[1];

    // Perform the update operation
    connection.query('UPDATE your_table SET ? WHERE ' + condition, jsonData, (err, result) => {
      if (err) {
        console.error('Error executing update query:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }
      res.statusCode = 200;
      res.end('Update successful');
    });
  });
}

function handleSelect(req, res) {
  // Extract the condition for selection from the request query parameters
  const condition = req.url.split('?')[1];

  // Perform the select operation
  connection.query(`SELECT * FROM your_table WHERE ${condition}`, (err, results) => {
    if (err) {
      console.error('Error executing select query:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
      return;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results));
  });
}
