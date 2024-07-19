import { app } from './app.js';
import oracledb from 'oracledb';
import { connectionConfig } from './constant.js';
import { ApiError } from './utils/ApiError.js';
import dotenv from "dotenv"
dotenv.config({ path: "./.env" })
let connection;

(async () => {
try {
    connection = await oracledb.getConnection(connectionConfig)
    console.log('Oracle database connected!');
    
    // Define your routes and start listening
    app.listen(8000, () => {
        console.log('Server is running at port : 8000');
    });
    
} catch (error) {
    console.error('Error connecting to Oracle database:', error);
    throw new ApiError(500, 'Database connection error');
}
})();
// Export the connection object outside the try-catch block
export { connection };
