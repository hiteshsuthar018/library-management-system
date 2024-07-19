import bcrypt from 'bcrypt';
import { connection } from '../index.js';
import jwt from "jsonwebtoken"
// Function to hash password
const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};

// Function to insert a new student
const insertAdmin = async (username, password, name, email) => {
    try {

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Prepare the insert statement
        const insertStatement = `
    INSERT INTO admin (username, password, name, email)
    VALUES (:username, :password, :name, :email)
    `;

        // Bind parameters
        const binds = {
            username,
            password: hashedPassword,
            name,
            email
        };

        // Execute the insert statement
        const result = await connection.execute(insertStatement, binds);

        console.log('Student inserted successfully:', result);
        connection.commit()
        // Close the connection
        // await connection.close();
        return result;
    } catch (error) {
        console.error('Error inserting student:', error);
    }
};



// gene
// Function to generate access token
const generateAccessToken = (userId, username, email, fullname) => {
    return jwt.sign(
        {
            _id: userId,
            email,
            username,
            fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

// Function to generate refresh token
const generateRefreshToken = (userId) => {
    return jwt.sign(
        {
            _id: userId,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};


// Example usage: Insert a new student

export { insertAdmin ,generateAccessToken,generateRefreshToken}