import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../utils/api";
import IssueBookModal from "./IssueBookModal ";

const Table = () => {
  const dispatch = useDispatch();
  const studentsData = useSelector((state) => state.students.students);
  const loading = useSelector((state) => state.students.loading);
  const error = useSelector((state) => state.students.error);

  const [showModal, setShowModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (studentId) => {
    setSelectedStudentId(studentId);
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(fetchStudents());
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
  }));

  return (
    <div className="m-5 table-container border border-dark" style={{ width: '100%', height: '400px', overflowX: 'auto', overflowY: 'auto' }}>
      <table className="table table-primary">
        <thead style={{ position: 'sticky', top: '0', zIndex: '1', backgroundColor: '#fff' }}>
          <tr class="table-info border-bottom border-dark ">
            <th scope="col">S.NO.</th>
            <th scope="col">EnrollmentID</th>
            <th scope="col">Name</th>
            <th scope="col">Course</th>
            <th scope="col">Branch</th>
            <th scope="col">Issue</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <th className="table-info" scope="row">{index + 1}</th>
              <td className="border border-dark">{student.enrollmentId}</td>
              <td className="border border-dark">{student.name}</td>
              <td className="border border-dark">{student.course}</td>
              <td className="border border-dark">{student.branch}</td>
              <td className="border border-dark">
                <Button
                  variant="success"
                  onClick={() => handleShowModal(student.enrollmentId)}
                >
                  Issue Book
                </Button>
                <IssueBookModal
                  show={showModal}
                  handleClose={handleCloseModal}
                  studentId={selectedStudentId}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;