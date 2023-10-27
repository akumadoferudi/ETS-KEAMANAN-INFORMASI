const express = require('express')
const app = express()
const port = 3000
const ip = 'localhost'

// form handling (get value)
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// set the view engine to ejs and its directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../public/views');

const {
    // indexView,
    // ejsRender,
    encryptMsgAPI,
    decryptMsgAPI,
} = require('./controller')

// app.get('/', indexView)
// app.get('/ejs', ejsRender)
app.get('/api/encrypt', encryptMsgAPI)
app.get('/api/decrypt', decryptMsgAPI)

app.listen(port, () => {
  console.log(`Server running on: http://${ip}:${port}`)
})