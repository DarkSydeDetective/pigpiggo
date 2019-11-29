const config = require('../config')
const { Pool, types } = require('pg');
types.setTypeParser(1114, function (stringValue) {
    return new Date(Date.parse(stringValue + "+0000"));
})
const pool = new Pool({
    user: config.development.database.user,
    host: config.development.database.host,
    database: config.development.database.database,
    password: config.development.database.password,
    port: config.development.database.port,
});
exports.pool = pool