/**
 /Author: Revelation A.F
 /Git: nusktec
 **/
export default {
    development: {
        mysql: {
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: 'mysql',
            logging: false
        },
        mongo_uri: process.env.MONGO_URI,
        redis_uri: process.env.REDIS_URL,
    },
    production: {
        mysql: {
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: 'mysql',
            logging: false
        },
        mongo_uri: process.env.MONGO_URI,
        redis_uri: process.env.REDIS_URL
    }
} as any
