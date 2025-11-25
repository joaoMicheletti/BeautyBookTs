"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './src/database/DB.sqlite3'
        },
        migrations: {
            directory: './src/database/migrations'
        },
        useNullAsDefault: true,
    },
    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/database/migrations'
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/database/migrations'
        }
    }
};
exports.default = exports.config;
//# sourceMappingURL=knexfile.js.map