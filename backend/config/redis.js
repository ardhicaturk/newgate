const redis = require("redis");

require('dotenv').config();

const rd = process.env.NODE_ENV === 'test' ? redis.createClient({
    host: process.env.REDIS_TEST_HOST,
    port: process.env.REDIS_TEST_PORT,
    password: process.env.REDIS_TEST_PASSWORD
}) : redis.createClient();
    
rd.on("error", function(error) {
    console.error('Redis:',error);
});

exports.redisContext= rd

exports.redisShutdown = async () => {
    await new Promise((resolve) => {
        rd.quit(() => {
            console.log("Redis => Shutting down")
            resolve();
        });
    });
    // redis.quit() creates a thread to close the connection.
    // We wait until all threads have been run once to ensure the connection closes.
    await new Promise(resolve => setImmediate(resolve));
};