const express = require('express')
const redis = require('redis')
const RedisStore = require('connect-redis').default;
const mongoose = require('mongoose')
const postRouter = require('./routes/postRoutes')
const usersRouter = require('./routes/userRoutes')
const session = require('express-session')
const {MONGO_IP,MONGO_PASSWORD,MONGO_PORT,MONGO_USER, REDIS_PORT,REDIS_URL,SESSION_SECRET} = require('./config/config')

const app = express()
const redisClient = redis.createClient({
  host: '172.21.0.2',
  port: 6379
})

const redisStore = new RedisStore({
  client: redisClient
})
app.use(express.json())
app.use(session({
  store: redisStore,
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false,
    httpOnly: false,
    maxAge: 1000*60
  }
}))
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/',usersRouter)
const port = process.env.PORT || 3000

// const redisClient = redis.createClient({
//   host: REDIS_URL,
//   port: REDIS_PORT
// })

redisClient.on('error', () => {
  console.error('Couldn\'t establish a connection wit the Redis Server')
})

redisClient.on('connect', () => {
  console.log('Connected to the redis Server')
})

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

app.get('/', (req,res) => {
    res.send('Hello world! my name is Nganga Ndungu')
})

app.get('/docker',(req,res) => {
  res.send('Hello Docker ')  
})


app.listen(port, async () => {
    await redisClient.connect().catch(console.error)
    console.log(`Server started  to listening at port ${port}`)
})

connectWithRetry()