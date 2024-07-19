import { connection } from "../index.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        let token;
        // Check if the token is in cookies or headers
        console.log(req.cookies);
        if (req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken;
        } else if (req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //   console.log(decodedToken);
        // Query the user table to find the user based on decoded token
        const selectQuery = `
            SELECT *
            FROM admin
            WHERE admin_id = :userId
        `;
        console.log(decodedToken?._id)
        const binds = [decodedToken?._id];
        // Execute the query to fetch user details
        const result = await connection.execute(selectQuery, binds);
        // console.log(result)
         // Check if user exists
         if (result.rows.length === 0) {
            throw new ApiError(401, "Invalid access token");
        }
        const user = result.rows[0];
        delete user.PASSWORD;
        delete user.REFRESH_TOKEN;
        // Omit sensitive fields like password and refresh token
        const { password, refreshToken, ...userData } = user;

        req.user = userData;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access Token");
    }
});

export { verifyJWT };
