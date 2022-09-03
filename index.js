const express = require('express')
const app = express()
const port = process.env.PORT || 5000
let random = require('./randomUser')
const cors = require('cors')
const router = require('./routes/user.route')


//middelware
app.use(cors());
app.use(express.json());

app.use('/user', router)




app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.all('*', (req, res) => {
    res.send('no route found')
})

app.listen(port, () => {
    console.log('starting express', port)
})