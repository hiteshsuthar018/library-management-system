import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchdueList } from "../utils/api";

const DueListTable = () => {
  const dispatch = useDispatch();
  const studentsData = useSelector((state) => state.students.students);
  const loading = useSelector((state) => state.students.loading);
  const error = useSelector((state) => state.students.error);


  useEffect(() => {
    dispatch(fetchdueList());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  

  const students = studentsData.length>0 && studentsData.map((studentArray) => ({
    enrollmentId: studentArray[0],
    name: studentArray[1],
    course: studentArray[2],
    branch: studentArray[3],
    issue: studentArray[4],
    email: studentArray[5],
    book_name: studentArray[6]
  }));

  return (
    <div className="m-5">
      <table className="table table-primary">
        <thead>
          <tr>
            <th scope="col">S.NO.</th>
            <th scope="col">EnrollmentID</th>
            <th scope="col">Name</th>
            <th scope="col">Course</th>
            <th scope="col">Branch</th>
            <th scope="col">Book Name</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.length>0 && students.map((student, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{student.enrollmentId}</td>
              <td>{student.name}</td>
              <td>{student.course}</td>
              <td>{student.branch}</td>
              <td>
                {student.book_name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DueListTable;