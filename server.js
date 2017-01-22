const express = require('express')
const app = express()
const requestProxy = require('express-request-proxy')
const PORT = process.env.PORT || 4000

app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.get('/github/*', proxyGitHub);

function proxyGitHub(req, res) {
  console.log('Routing a GitHub request for', req.params[0]);
  (requestProxy({
    url: `https://api.github.com/${req.params[0]}`,
    headers: { Authorization: `token ${process.env.GITHUB_TOKEN}`}
  }))(req, res);
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
