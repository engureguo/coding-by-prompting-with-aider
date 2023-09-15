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
