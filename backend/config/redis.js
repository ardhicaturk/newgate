const redis = require("redis");
const rd = redis.createClient();
    
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