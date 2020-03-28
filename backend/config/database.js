const dotenv=require('dotenv');
dotenv.config();

const db_config = {
  "development": {
    "username": process.env.DB_DEV_USER || 'root',
    "password": process.env.DB_DEV_PASSWORD || null,
    "database": process.env.DB_DEV_NAME || 'database_development',
    "host": process.env.DB_DEV_HOST || '127.0.0.1',
    "port": process.env.DB_DEV_PORT || '3306',
    "dialect": process.env.DB_DEV_DIALEC || "mysql",
    "dialectOptions":{
      // "socketPath": process.env.DB_DEV_SOCKET_PATH || null
    },
    "logging": console.log,
    // "operatorsAliases": ((process.env.DB_DEV_OPERATORS_ALIASES || 'false') === 'true'? true : false)
  },
  "test": {
    "username": process.env.DB_TEST_USER || 'root',
    "password": process.env.DB_TEST_PASSWORD || null,
    "database": process.env.DB_TEST_NAME || 'database_development',
    "host": process.env.DB_TEST_HOST || '127.0.0.1',
    "port": process.env.DB_TEST_PORT || '3306',
    "dialect": process.env.DB_TEST_DIALEC || "mysql",
    "dialectOptions":{
      // "socketPath": process.env.DB_TEST_SOCKET_PATH || null
    },
    // "logging": console.log,
    // "operatorsAliases": ((process.env.DB_TEST_OPERATORS_ALIASES || 'false') === 'true'? true : false)
  },
  "production": {
    "username": process.env.DB_PROD_USER || 'root',
    "password": process.env.DB_PROD_PASSWORD || null,
    "database": process.env.DB_PROD_NAME || 'database_development',
    "host": process.env.DB_PROD_HOST || '127.0.0.1',
    "port": process.env.DB_PROD_PORT || '3306',
    "dialect": process.env.DB_PROD_DIALEC || "mysql",
    "dialectOptions":{
      // "socketPath": process.env.DB_PROD_SOCKET_PATH || null
    },
    "logging": console.log,
    // "operatorsAliases": ((process.env.DB_PROD_OPERATORS_ALIASES || 'false') === 'true'? true : false)
  }
};

module.exports = db_config;
