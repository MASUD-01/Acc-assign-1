const express = require('express')
const app = express()
const mongoose = require('mongoose');
const port = process.env.PORT || 5000
require('dotenv').config()
const cors = require('cors')
const dbConnect = require('./utils/dbConnect')
const viewCount = require('./middleware/viewCount.js');

//routes
const userRouter = require('./routes/V1/user.route.js');
const toolsRouter = require('./routes/V1/tools.route.js');
const productRouter = require('./routes/V1/product.route.js');
const brandRouter = require("./routes/V1/brand.route.js")


//middelware
app.use(cors());
app.use(express.json());


//databse connection

mongoose.connect(process.env.DATABASE).then(() => console.log('databse connnefction is succesful'));
app.use(viewCount)
dbConnect()

//routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/tools', toolsRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/brand', brandRouter)




app.get('/', (req, res) => {
    res.send('Hello World!')
})


// app.post('/api/v1/products', )
//query
// app.get("/api/v1/products", )

//sob route er jonno, kono route e hit na korle
app.all('*', (req, res) => {
    res.send('no route found')
})

app.listen(port, () => {
    console.log('starting express', port)
})