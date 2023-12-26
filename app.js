const express = require('express')
const mongoose = require('mongoose')
const postRouter = require('./routes/postRoutes')
const usersRouter = require('./routes/userRoutes')
const session = require('express-session')
const redis = require('redis')
const {MONGO_IP,MONGO_PASSWORD,MONGO_PORT,MONGO_USER, REDIS_PORT,REDIS_URL,SESSION_SECRET} = require('./config/config')
const { default: RedisStore } = require('connect-redis')

const app = express()
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
})

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

app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: SESSION_SECRET,
  cookie:{
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 60000
  }
}))
app.use(express.json())
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/',usersRouter)

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