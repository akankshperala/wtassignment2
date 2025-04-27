// src/components/EditStudent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    studentid: "",
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    department: "",
    enrollmentYear: "",
    isactive: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://wtassignment2.onrender.com/studentsstudents/${id}`).then((res) => {
      setStudent(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://wtassignment2.onrender.com/students/${id}`, {
        ...student,
        enrollmentYear: Number(student.enrollmentYear),
      });
      alert("Student updated!");
      navigate("/students");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="container">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Student ID</label>
        <input name="studentid" value={student.studentid} onChange={handleChange} required />

        <label>First Name</label>
        <input name="firstname" value={student.firstname} onChange={handleChange} required />

        <label>Last Name</label>
        <input name="lastname" value={student.lastname} onChange={handleChange} required />

        <label>Email</label>
        <input name="email" type="email" value={student.email} onChange={handleChange} required />

        <label>Date of Birth</label>
        <input name="dob" type="date" value={student.dob?.slice(0, 10)} onChange={handleChange} required />

        <label>Department</label>
        <input name="department" value={student.department} onChange={handleChange} required />

        <label>Enrollment Year</label>
        <input name="enrollmentYear" type="number" value={student.enrollmentYear} onChange={handleChange} required />

        <label>
          <input name="isactive" type="checkbox" checked={student.isactive} onChange={handleChange} />
          Is Active
        </label>

        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
