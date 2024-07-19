import bcrypt from 'bcrypt';
import { connection } from '../index.js';

// Function to hash password
const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};

// Function to insert a new student
const insertStudent = async (student_id,username, name, course, branch, section, password ,email) => {
    try {
        
    // Hash the password
    const hashedPassword = await hashPassword(password);
    
    // Prepare the insert statement
    const insertStatement = `
    INSERT INTO student (student_id,username, name, course, branch, section, password,email)
    VALUES (:student_id,:username, :name, :course, :branch, :section, :password,:email)
    `;
    
    // Bind parameters
    const binds = {
        student_id,
        username,
        name,
        course,
        branch,
        section,
        password: hashedPassword,
        email
    };
    
    // Execute the insert statement
    const result = await connection.execute(insertStatement, binds);
    
   
        console.log('Student inserted successfully:', result);
        // Close the connection
        // await connection.close();
    } catch (error) {
        console.error('Error inserting student:', error);
    }
};

// Example usage: Insert a new student

export {insertStudent}