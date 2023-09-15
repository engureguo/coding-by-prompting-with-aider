const http = require('http')
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'eugene',
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    return
  }
  console.log('Connected to MySQL')
})

const server = http.createServer((req, res) => {
  if (req.url === '/insert') {
    handleInsert(req, res)
  } else if (req.url === '/delete') {
    handleDelete(req, res)
  } else if (req.url === '/update') {
    handleUpdate(req, res)
  } else if (req.url === '/select') {
    handleSelect(req, res)
  } else {
    res.statusCode = 404
    res.end('Not Found')
  }
})

server.listen(8000, 'localhost', () => {
  console.log('Server running at http://localhost:8000/')
})

function handleInsert(req, res) {
  let data = ''

  req.on('data', (chunk) => {
    data += chunk
  })

  req.on('end', () => {
    const name = req.url.split('?')[1].split('=')[1]
    const id = Math.floor(Math.random() * 1000) // Generate a random integer between 0 and 999

    connection.query(
      `INSERT INTO student(\`id\`,\`name\`) VALUES(${id}, '${name}')`,
      (err, result) => {
        if (err) {
          console.error('Error executing insert query:', err)
          res.statusCode = 500
          res.end('Internal Server Error')
          return
        }
        res.statusCode = 200
        res.end('Insert successful')
      }
    )
  })
}

function handleDelete(req, res) {
  const condition = req.url.split('?')[1]

  connection.query(`DELETE FROM student WHERE ${condition}`, (err, result) => {
    if (err) {
      console.error('Error executing delete query:', err)
      res.statusCode = 500
      res.end('Internal Server Error')
      return
    }
    res.statusCode = 200
    res.end('Delete successful')
  })
}

function handleUpdate(req, res) {
  let data = ''

  req.on('data', (chunk) => {
    data += chunk
  })

  req.on('end', () => {
    const jsonData = JSON.parse(data)
    const condition = req.url.split('?')[1]

    connection.query(
      'UPDATE student SET ? WHERE ' + condition,
      jsonData,
      (err, result) => {
        if (err) {
          console.error('Error executing update query:', err)
          res.statusCode = 500
          res.end('Internal Server Error')
          return
        }
        res.statusCode = 200
        res.end('Update successful')
      }
    )
  })
}

function handleSelect(req, res) {
  connection.query(`SELECT * FROM student`, (err, results) => {
    if (err) {
      console.error('Error executing select query:', err)
      res.statusCode = 500
      res.end('Internal Server Error')
      return
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(results))
  })
}
