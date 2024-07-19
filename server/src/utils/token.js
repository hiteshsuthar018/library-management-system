import { connection } from "../index.js";
import { generateAccessToken, generateRefreshToken } from "../models/admin.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        // Query the student table to retrieve username and email based on student ID
        const adminQuery = `
            SELECT username, email
            FROM admin
            WHERE admin_id = :userId
        `;

        // Execute the query to fetch student details
        const adminResult = await connection.execute(adminQuery, [userId]);
        const admin = adminResult.rows[0];

        // Extract username and email from the result array
        const username = admin[1];
        const email = admin[4];

        // Generate access and refresh tokens
        const accessToken = generateAccessToken(userId, username, email);
        const refreshToken = generateRefreshToken(userId);

        // Update the refresh token in the student table
        const updateQuery = `
            UPDATE admin
            SET refresh_token = :refreshToken
            WHERE admin_id = :userId
        `;
        await connection.execute(updateQuery, [refreshToken, userId]);
        await connection.commit();
        // Return the access and refresh tokens along with student details
        return { admin: { username, email }, accessToken, refreshToken };
    } catch (error) {
        // Handle errors
        throw new Error('Failed to generate access and refresh tokens: ' + error.message);
    }
};

export { generateAccessAndRefreshTokens };
