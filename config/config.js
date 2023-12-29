module.exports = {
    MONGO_IP : process.env.MONGO_IP || '172.21.0.3',
    MONGO_PORT : process.env.MONGO_PORT || 27017,
    MONGO_USER : process.env.MONGO_USER || 'ndungu',
    MONGO_PASSWORD : process.env.MONGO_PASSWORD || 'ndungu11',
    REDIS_URL: process.env.REDIS_URL || 'redis',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    SESSION_SECRET: process.env.SESSION_SECRET

}