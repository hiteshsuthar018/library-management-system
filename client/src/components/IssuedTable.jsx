import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBorrowedList } from "../utils/api";

const IssuedTable = () => {
  const dispatch = useDispatch();
  const studentsData = useSelector((state) => state.students.students);
  const loading = useSelector((state) => state.students.loading);
  const error = useSelector((state) => state.students.error);

  useEffect(() => {
    dispatch(fetchBorrowedList());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const students = studentsData.map((studentArray) => ({
    enrollmentId: studentArray[0],
    name: studentArray[1],
    course: studentArray[2],
    branch: studentArray[3],
    issue: studentArray[4],
    email: studentArray[5],
    book_name: studentArray[6],
    due_date: new Date(studentArray[7]),
    issue_date: new Date(studentArray[8])
  }));

  return (
    <div className="m-5 table-container border border-dark" style={{ width: '80%', maxHeight:'260px', overflowX: 'auto', overflowY: 'auto' }}>
      <table className="table table-primary">
        <thead className="table-info border border-dark" style={{ position: 'sticky', top: '0', zIndex: '1', backgroundColor: '#fff' }}>
          <tr>
            <th scope="col">S.NO.</th>
            <th scope="col">EnrollmentID</th>
            <th scope="col">Name</th>
            <th scope="col">Course</th>
            <th scope="col">Branch</th>
            <th scope="col">Book Name</th>
            <th scope="col">Due Date</th>
            <th scope="col">Issue Date</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="border border-dark">
              <th className="table-info border border-dark" scope="row">{index + 1}</th>
              <td className="border border-dark">{student.enrollmentId}</td>
              <td className="border border-dark">{student.name}</td>
              <td className="border border-dark">{student.course}</td>
              <td className="border border-dark">{student.branch}</td>
              <td className="border border-dark">{student.book_name}</td>
              <td className="border border-dark">{student.due_date.toLocaleDateString()}</td>
              <td className="border border-dark">{student.issue_date.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuedTable;
