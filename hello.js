const http = require('http')
const mysql = require('mysql')

// Create a MySQL connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'eugene',
})

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    return
  }
  console.log('Connected to MySQL')
})

const server = http.createServer((req, res) => {
  // Example: Select all records from a table
  connection.query('SELECT * FROM student', (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      res.statusCode = 500
      res.end('Internal Server Error')
      return
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(results))
  })
})

server.listen(8000, 'localhost', () => {
  console.log('Server running at http://localhost:8000/')
})
