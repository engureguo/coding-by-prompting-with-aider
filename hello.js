const http = require('http')
const mysql = require('mysql'

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

const candidateNames = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Frank',
  'Grace',
  'Henry',
  'Ivy',
  'Jack',
  'Kate',
  'Liam',
  'Mia',
  'Noah',
  'Olivia',
  'Peter',
  'Quinn',
  'Ryan',
  'Sophia',
  'Tom',
]

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

  if (prefix === '/') {
    handleIndex(req, res)
  } else if (prefix === '/insert') {
    handleInsert(req, res)
  } else if (prefix === '/select') {
    handleSelect(req, res)
  } else if (prefix === '/clear') {
    handleClear(req, res)
  } else {
    res.statusCode = 404
    res.end('Not Found')
  }
})

server.listen(8000, 'localhost', () => {
  console.log('Server running at http://localhost:8000/')
})

function handleIndex(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head>')
  res.write('<title>CRUD Operations</title>')
  res.write('</head>')
  res.write('<body>')
  res.write('<h1>CRUD Operations</h1>')
  res.write('<button onclick="handleSelect()">Select</button>')
  res.write('<button onclick="handleInsert()">Insert</button>')
  res.write('<button onclick="handleClear()">Clear</button>') // Added clear button
  res.write('<script>')
  res.write('function handleSelect() {')
  res.write('  window.location.href = "/select";')
  res.write('}')
  res.write('function handleInsert() {')
  res.write('  window.location.href = "/insert";')
  res.write('}')
  res.write('function handleClear() {') // Added handleClear function
  res.write('  if (confirm("Are you sure you want to clear the data?")) {')
  res.write('    window.location.href = "/clear";')
  res.write('  }')
  res.write('}')
  res.write('</script>')
  res.write('</body>')
  res.write('</html>')
  res.end()
}

function handleInsert(req, res) {
  const name = candidateNames[Math.floor(Math.random() * candidateNames.length)]
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
      res.setHeader('Content-Type', 'text/html')
      res.write('<html>')
      res.write('<head>')
      res.write('<title>Insert Successful</title>')
      res.write('</head>')
      res.write('<body>')
      res.write('<h1>Insert Successful</h1>')
      res.write(
        '<button onclick="returnToHomepage()">Return to Homepage</button>'
      )
      res.write('<script>')
      res.write('function returnToHomepage() {')
      res.write('  window.location.href = "/";')
      res.write('}')
      res.write('</script>')
      res.write('</body>')
      res.write('</html>')
      res.end()
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
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head>')
    res.write('<title>Select Results</title>')
    res.write('<style>')
    res.write('table {')
    res.write('  border-collapse: collapse;')
    res.write('  width: 100%;')
    res.write('}')
    res.write('th, td {')
    res.write('  border: 1px solid black;')
    res.write('  padding: 8px;')
    res.write('}')
    res.write('button {')
    res.write('  margin-top: 30px;') // Added margin-bottom to the button
    res.write('}')
    res.write('</style>')
    res.write('</head>')
    res.write('<body>')
    res.write('<h1>Select Results</h1>')
    res.write('<table>')
    res.write('<tr><th>ID</th><th>Name</th></tr>')
    results.forEach((row) => {
      res.write(`<tr><td>${row.id}</td><td>${row.name}</td></tr>`)
    })
    res.write('</table>')
    res.write(
      '<button onclick="returnToHomepage()">Return to Homepage</button>'
    )
    res.write('<script>')
    res.write('function returnToHomepage() {')
    res.write('  window.location.href = "/";')
    res.write('}')
    res.write('</script>')
    res.write('</body>')
    res.write('</html>')
    res.end()
  })
}

function handleClear(req, res) {
  connection.query(`DELETE FROM student`, (err, result) => {
    if (err) {
      console.error('Error executing delete query:', err)
      res.statusCode = 500
      res.end('Internal Server Error')
      return
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head>')
    res.write('<title>Delete Successful</title>')
    res.write('</head>')
    res.write('<body>')
    res.write('<h1>Delete Successful</h1>')
    res.write(
      '<button onclick="returnToHomepage()">Return to Homepage</button>'
    )
    res.write('<script>')
    res.write('function returnToHomepage() {')
    res.write('  window.location.href = "/";')
    res.write('}')
    res.write('</script>')
    res.write('</body>')
    res.write('</html>')
    res.end()
  })
}
