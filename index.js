const express = require('express')
const app = express()
const port = process.env.PORT || 5000
let random = require('./randomUser')
const cors = require('cors')


//middelware
app.use(cors());
app.use(express.json());



app.get('/user/all', (req, res) => {
    const { limit } = req.query;
    console.log(limit)
    res.send(random.slice(0, limit))
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


app.patch("/user/:id", (req, res) => {
    const { id } = req.params;
    const newDatas = random.find(data => data.id == id);
    newDatas.id = id;
    newDatas.name = req.body.name;
    newDatas.contact = req.body.contact;
    res.send(newDatas)
})

app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    random = random.filter(user => user.id !== Number(id))
    res.send(random)
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