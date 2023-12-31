const express = require('express')
const redis = require('redis')
const RedisStore = require('connect-redis').default;
const mongoose = require('mongoose')
const postRouter = require('./routes/postRoutes')
const usersRouter = require('./routes/userRoutes')
const session = require('express-session')
const cors = require('cors')
const {MONGO_IP,MONGO_PASSWORD,MONGO_PORT,MONGO_USER, REDIS_PORT,REDIS_URL,SESSION_SECRET} = require('./config/config')

const app = express()

const redisClient = redis.createClient({
  socket :{
    host: REDIS_URL,
    port: 6379
  }
  
})


const redisStore = new RedisStore({
  client: redisClient
})

app.use(express.json())

app.enable('trust proxy')
app.use(cors({}))
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

redisClient.on('error', () => {
  console.error('Couldn\'t complete connection to the Redis Server')

})

redisClient.on('connect', () => {
  console.log('Connected to the redis Server')
})

const connectWithRetry = () => {
  mongoose
  .connect(`mongodb://${MONGO_IP}:${MONGO_PORT}/?authMechanism=DEFAULT`)
    .then(() => console.log('Connected to the DB successfully'))
    .catch((error) => {
      console.log(error)
      setTimeout(connectWithRetry, 5000)
    }
    )
}

app.get('/api/v1', (req,res) => {
    res.send('Hello world! my name is Nganga Ndungu')
})

app.get('/docker',(req,res) => {
  res.send('Hello Docker ')  
})


app.listen(port, async () => {
    await redisClient.connect().catch(console.error)
    console.log(MONGO_IP,MONGO_PASSWORD,MONGO_PORT,MONGO_USER, REDIS_PORT,REDIS_URL,SESSION_SECRET)
    console.log(`Server started  to listening at port ${port}`)
})

connectWithRetry()