// entire file content ...
// ... goes in between

function handleInsert(req, res) {
  let data = ''

  req.on('data', (chunk) => {
    data += chunk
  })

  req.on('end', () => {
    const jsonData = JSON.parse(data)
    const name = jsonData.named
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

// ... rest of the code ...

// closing ```
