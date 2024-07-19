import { connection } from "../index.js";
import { insertStudent } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const isAlreadyExist = async(username)=>{
    
        const query = `SELECT COUNT(*) AS count FROM student WHERE username = :username`;
    
        // Bind parameters
        const binds = [username];
    
        // Execute the query
        const result = await connection.execute(query, binds);
        // Check if any rows are returned
        const count = result.rows[0][0];;
        if(count){
            return 1;
        }
        else{
            return 0;
        }
   
}

//register a student
const registerStudent = asyncHandler(async(req,res)=>{
     const {student_id,username,name,course,branch,section,password,email} = req.body;
     if (
        [student_id,username,name,course,branch,section,password].some((field) =>
            //trim ko white sapaces ko remove karne k liye use kiya jata hai.
            field?.trim() === ""
        )) {
        //agar hai to error de denge
        throw new ApiError(400, "All field are required")
    }
    const existance = await isAlreadyExist(username);
    if(existance){
        throw new ApiError(400,"user is already exist");
    }
    
    await insertStudent(student_id,username,name,course,branch,section,password,email);
    connection.commit();
    res.status(200).json(new ApiResponse(200,{},"student registered successfully"))
})

//get student status
const getStudentStatus = asyncHandler(async (req, res) => {
    const { student_id } = req.params;

    try {
        // Query to fetch the books borrowed by the student along with their due dates
        const query = `
            SELECT b.book_name, ib.due_date
            FROM issued_books ib
            JOIN books b ON ib.book_id = b.book_id
            WHERE ib.student_id = :student_id
        `;

        // Bind parameters
        const binds = { student_id };

        // Execute the query
        const result = await connection.execute(query, binds);

        // Extract the rows from the result
        const borrowedBooks = result.rows;

        // Send the list of borrowed books as a response
        res.status(200).json(new ApiResponse(200,{ student_id, borrowedBooks },"status fetched successfully"));
    } catch (error) {
        console.error('Error fetching student books:', error);
        res.status(500).json(new ApiError(500, 'Internal server error'));
    }
});




export {registerStudent ,getStudentStatus}