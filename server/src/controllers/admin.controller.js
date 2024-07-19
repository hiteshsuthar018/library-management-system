import bcrypt from 'bcrypt';
import { connection } from '../index.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { insertAdmin } from '../models/admin.model.js';
import jwt from "jsonwebtoken";
import { generateAccessAndRefreshTokens } from '../utils/token.js';
const isAlreadyExist = async (username) => {

    const query = `SELECT COUNT(*) AS count FROM admin WHERE username = :username`;

    // Bind parameters
    const binds = [username];

    // Execute the query
    const result = await connection.execute(query, binds);
    // Check if any rows are returned
    const count = result.rows[0][0];
    if (count) {
        return 1;
    }
    else {
        return 0;
    }

}
// Function to compare passwords
const comparePasswords = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};


//controllers✔❌🌟🔢

//register admin
const registerAdmin = asyncHandler(async (req, res) => {
    const {username, password, name, email } = req.body;
    if (
        [username, password, name, email].some((field) =>
            //trim ko white sapaces ko remove karne k liye use kiya jata hai.
            field?.trim() === ""
        )) {
        //agar hai to error de denge
        throw new ApiError(400, "All field are required")
    }
    const existance = await isAlreadyExist(username);
    if (existance) {
        throw new ApiError(400, "admin is already exist");
    }

    await insertAdmin(username, password, name, email);
    res.status(200).json(new ApiResponse(200, {}, "Admin registered successfully"))

})
// Login controller
const loginAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    console.log("Hit to hua hai");
    try {
        // Prepare the select statement to fetch admin details
        const selectStatement = `
            SELECT admin_id, password
            FROM admin
            WHERE username = :username
        `;

        // Bind parameters
        const binds = [username];
         
        // Execute the select statement
        const result = await connection.execute(selectStatement, binds);
        console.log(result);
        // Check if admin with the provided username exists
        if (result.rows.length === 0) {
            throw new ApiError(401, 'Invalid username or password');
        }

        // Extract admin details from the result

        const [admin_id, hashedPassword] = result.rows[0];
        
        // Check if hashedPassword is not null or undefined
        if (!hashedPassword) {
            throw new ApiError(500, 'Hashed password is missing or invalid');
        }

        // Compare passwords
        const passwordMatch = await comparePasswords(password, hashedPassword);

        if (!passwordMatch) {
            throw new ApiError(401, 'Invalid username or password');
        }
        const options = {
            httpOnly: true,
            secure: true,
        }
        const { admin, accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin_id);
        // If username and password are correct, send success response
        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json
            (new ApiResponse(
                200,
                { admin, accessToken, refreshToken }
                ,
                "Login successfully"));
    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiResponse(500, null, 'Internal server error'));
    }
});

export { loginAdmin, registerAdmin };