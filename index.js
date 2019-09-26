const http = require('http')
const fs = require('fs')
const express = require('express')
const app = express()
const port = 5000
const formidable = require('formidable')
var cors = require('cors')

app.use(cors())

app.set('view engine', 'ejs');

app.listen(port, () => console.log(`Example app listening on port ${port}!`))