import oracledb from 'oracledb';
const connectionConfig = {
    user: 'SYS',
    password: 'Iamcoder21',
    connectString: 'localhost:1521/orcl',
    privilege: oracledb.SYSDBA // This grants SYSDBA privilege
};
export {connectionConfig}
