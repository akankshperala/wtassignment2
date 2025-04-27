// src/components/AddStudent.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
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
      await axios.post("https://wtassignment2.onrender.com/students", {
        ...student,
        enrollmentYear: Number(student.enrollmentYear),
      });
      alert("Student added successfully!");
      navigate("/students");
    } catch (err) {
      console.error(err);
      alert("Failed to add student.");
    }
  };

  return (
    <div className="container">
      <h2>Add Student</h2>
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
        <input name="dob" type="date" value={student.dob} onChange={handleChange} required />

        <label>Department</label>
        <input name="department" value={student.department} onChange={handleChange} required />

        <label>Enrollment Year</label>
        <input name="enrollmentYear" type="number" value={student.enrollmentYear} onChange={handleChange} required />

        <label>
          <input name="isactive" type="checkbox" checked={student.isactive} onChange={handleChange} />
          Is Active
        </label>

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
