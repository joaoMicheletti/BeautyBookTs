import knex from "knex";
import {config} from '../../knexfile';

const connect = knex(config.development);
module.exports = connect;