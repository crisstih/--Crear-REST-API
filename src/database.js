import mysqlConnection from 'mysql2/promise';

const properties = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_libros'
};

export const pool = mysqlConnection.createPool(properties);
