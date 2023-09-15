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
  let reqUrl = req.url
  console.log('===> ', reqUrl)
  let prefix = reqUrl
  let params = ''
  if (reqUrl.indexOf('?') !== -1) {
    let urlArr = reqUrl.split('?')
    prefix = urlArr[0]
    params = urlArr[1]
  }

  if (prefix === '/insert') {
    handleInsert(req, res)
  } else if (prefix === '/select') {
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
  let name = 'Chase'
  const id = Math.floor(Math.random() * 1000) // Generate a random integer between 0 and 999

  connection.query(
    `INSERT INTO student(\`id\`,\`name\`) VALUES(${id}, "${name}");`,
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
