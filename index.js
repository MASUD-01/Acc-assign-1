
const express = require('express')
const app = express()
const port = 5000
const random = require('./randomUser')
const cors = require('cors')


//middelware
app.use(cors());
app.use(express.json());



app.get('/user/all', (req, res) => {

    res.send(random)
})
app.get('/user/random', (req, res) => {

    function randomUserName() {
        const randomUser = Math.floor(Math.random() * random.length)
        const userName = random[randomUser]
        return userName
    }
    const userName = randomUserName()
    res.send(userName)
})

app.post('/user/save', (req, res) => {
    const user = req.body
    random.push(user)
    res.send(user)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.all('*', (req, res) => {
    res.send('no route found')
})

app.listen(port, () => {
    console.log('starting express', port)
})