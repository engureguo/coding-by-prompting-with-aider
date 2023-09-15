const http = require('http');
const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

const server = http.createServer((req, res) => {
  // Perform CRUD operations using the connection

  // Example: Select all records from a table
  connection.query('SELECT * FROM your_table', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
      return;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results));
  });
});

server.listen(8000, 'localhost', () => {
  console.log('Server running at http://localhost:8000/');
});
