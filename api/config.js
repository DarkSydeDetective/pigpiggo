const config = {
    development: {
        database: {
            user: 'postgres',
            host: 'localhost',
            database: 'pigpiggo',
            password: 'YOUR_PASSWORD_HERE',
            port: 5432
        },
    },
    production: {
        database: {
        },
    }
};
module.exports = config;