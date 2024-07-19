import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { connection } from "../index.js";


const newBookCreation = asyncHandler(async(req,res)=>{
    try {
        // Extract book details from the request body
        const {book_id, book_name, author, publication, genre, published_date } = req.body;
       
        // Validate request body
        if (!book_id || !book_name || !author || !publication || !genre || !published_date) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Insert the new book into the database
        const insertQuery = `
            INSERT INTO books (book_id,book_name, author, publication, genre, published_date)
            VALUES (:book_id,:book_name, :author, :publication, :genre, TO_DATE(:published_date, 'YYYY-MM-DD'))
        `;
        await connection.execute(insertQuery, [book_id,book_name, author, publication, genre, published_date]);
        connection.commit();
        // Send success response
        res.status(201).json(new ApiResponse(201,{},"book created successfully"));
    } catch (error) {
        console.error('Error adding new book:', error);
        res.status(500).json({ error: 'Failed to add new book' });
    }
})

export {newBookCreation}