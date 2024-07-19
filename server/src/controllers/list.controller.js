import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { connection } from "../index.js";

//🌟all student list
const getAllStudents = asyncHandler(async (req, res) => {
    try {
        // Query to fetch all students
        const query = `
        SELECT student_id, name, course, branch, section, email
        FROM student
    `;
      
        // Execute the query
        const result = await connection.execute(query);

        // Extract student data from the result
        const students = result.rows;

        // Send the list of students in the response
        res.status(200).json(new ApiResponse(200, students, "All student fetched successfully"));
    } catch (error) {
        // Handle errors
        console.error('Error fetching students:', error);
        res.status(500).json(new ApiError(500, 'Internal server error'));
    }
});


// 🌟borrowed List

const borrowedList = asyncHandler(async (req, res) => {
    try {
        // Query to fetch all students along with their issued books and book names
        const query = `
           SELECT s.student_id, s.name, s.course, s.branch, s.section, s.email,
           b.book_name, ib.due_date, ib.issued_date, ib.book_id
           FROM student s
           INNER JOIN issued_books ib ON s.student_id = ib.student_id
           INNER JOIN books b ON ib.book_id = b.book_id
        `;

        // Execute the query
        const result = await connection.execute(query);
        console.log(result)
        // Extract student data from the result
        const students = result.rows;

        // Send the list of students with their issued books as response
        res.status(200).json(new ApiResponse(200, students, "borrowed student list fethed successfully"));
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
})

// 🌟due List

// to get a list of students with overdue books
const overDueStudentList = asyncHandler(async (req, res) => {
    try {
        // Get the current date
        const currentDate = new Date().toISOString().slice(0, 10);

        // SQL query to fetch students with overdue books
        const query = `
            SELECT s.student_id, s.name, s.course, s.branch, s.section, s.email, ib.due_date, ib.issued_date, ib.book_id
            FROM student s
            INNER JOIN issued_books ib ON s.student_id = ib.student_id
            WHERE ib.due_date < TO_DATE(:currentDate, 'YYYY-MM-DD')
        `;

        // Bind parameters
        const binds = { currentDate };

        // Execute the query
        const result = await connection.execute(query, binds);

        // Extract the rows from the result
        const rows = result.rows;
        // Send the list of students with overdue books as a response
        res.status(200).json(new ApiResponse(200, {rows}, "overdue student list fetched successfully"));
    } catch (error) {
        console.error('Error fetching overdue student list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export { getAllStudents, borrowedList, overDueStudentList };