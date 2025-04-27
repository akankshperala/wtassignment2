// src/components/StudentList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await axios.get("https://wtassignment2.onrender.com/students");
    setStudents(res.data);
  };

  const deleteStudent = async (id) => {
    await axios.delete(`https://wtassignment2.onrender.com/students/${id}`);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container">
      <h2>Student List</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Department</th>
              <th>Enrollment Year</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.studentid}</td>
                <td>{s.firstname} {s.lastname}</td>
                <td>{s.email}</td>
                <td>{s.dob?.slice(0, 10)}</td>
                <td>{s.department}</td>
                <td>{s.enrollmentYear}</td>
                <td>{s.isactive ? "Yes" : "No"}</td>
                <td className="actions">
                  <Link to={`/edit/${s._id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => deleteStudent(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
