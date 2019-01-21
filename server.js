'use strict'

const express = require('express')
const cors = require('cors')

// require and use "multer"...
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

/*
1. I can submit a form that includes a file upload.
2. The form file input field  has the "name" attribute set to "upfile". We rely on this in testing.
3. When I submit something, I will receive the file name and size in bytes within the JSON response
*/
app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
      const { originalname, mimetype, size } = req.file

      res.json({
            name: `${originalname}`,
            type: `${mimetype}`,
            size: `${size}`,
      })
})

app.get('/', (req, res) => {
      res.sendFile(process.cwd() + '/views/index.html')
})

app.get('/hello', (req, res) => {
      res.json({ greetings: 'Hello, API' })
})

// listen for requests :)
const PORT = process.env.PORT || 3000
const listener = app.listen(PORT, () => {
      console.log('Your app is listening on port ' + listener.address().port)
})
