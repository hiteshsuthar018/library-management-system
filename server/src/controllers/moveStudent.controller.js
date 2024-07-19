import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { connection } from "../index.js";

const issueBook = asyncHandler(async(req,res)=>{
    try {
        // Extract student ID and book ID from the request body
        const { book_id } = req.body;
        const {student_id} = req.params;

        // Check if the student ID and book ID are provided
        if (!student_id || !book_id) {
            throw new ApiError(400, 'Student ID and book ID are required');
        }

        // Check if the book is available for issuing
        const bookAvailabilityQuery = `
            SELECT availability_status
            FROM books
            WHERE book_id = :book_id
        `;
        const bookAvailabilityResult = await connection.execute(bookAvailabilityQuery, [book_id]);
        const bookAvailability = await bookAvailabilityResult.rows[0][0];
         console.log("availability :: ",bookAvailability);
        if (bookAvailability !== 'Available') {
            throw new ApiError(400, 'The book is not available for issuing');
        }

        // Check if the book is already issued
        const issuedBookQuery = `
            SELECT COUNT(*) AS count
            FROM issued_books
            WHERE book_id = :book_id
        `;
        const issuedBookResult = await connection.execute(issuedBookQuery, [book_id]);
        const issuedBookCount = issuedBookResult.rows[0]?.count;

        if (issuedBookCount > 0) {
            throw new ApiError(400, 'The book is already issued');
        }

        // Insert a new record into the issued_books table
        const issueQuery = `
            INSERT INTO issued_books (student_id, book_id, issued_date, due_date)
            VALUES (:student_id, :book_id, CURRENT_DATE, CURRENT_DATE + INTERVAL '14' DAY)
        `;
        await connection.execute(issueQuery, [student_id, book_id]);

        // Update the availability status of the book to 'Issued'
        const updateQuery = `
            UPDATE books
            SET availability_status = 'Issued'
            WHERE book_id = :book_id
        `;
        await connection.execute(updateQuery, [book_id]);
        connection.commit();
        // Send success response
        res.status(200).json(new ApiResponse(200,{},"book issued suucessfully"));
    } catch (error) {
        // Handle errors
        console.error('Error issuing book:', error);
        res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message || 'Internal server error'));
    }
})

export {issueBook}