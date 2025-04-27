const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// POST - Add new student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET - All students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// GET - Student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send("Not found");
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT - Update student
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).send("Not found");
    res.send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE - Remove student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).send("Not found");
    res.send({ message: "Deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
