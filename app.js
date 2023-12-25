const express = require('express')
const mongoose = require('mongoose')
const postRouter = require('./routes/postRoutes')
const usersRouter = require('./routes/userRoutes')
const {MONGO_IP,MONGO_PASSWORD,MONGO_PORT,MONGO_USER} = require('./config/config')

const app = express()
const port = process.env.PORT || 3000

const connectWithRetry = () => {
  mongoose
  .connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authMechanism=DEFAULT`)
    .then(() => console.log('Connected to the DB successfully'))
    .catch((error) => {
      console.log(error)
      setTimeout(connectWithRetry, 5000)
    }
    )
}

app.use(express.json())
app.use('/api/v1/posts', postRouter)

app.get('/', (req,res) => {
    res.send('Hello world! my name is Nganga Ndungu')
})

app.get('/docker',(req,res) => {
  res.send('Hello Docker ')  
})

app.listen(port, () => {
    console.log(`Server started  to listening at port ${port}`)
})

connectWithRetry()