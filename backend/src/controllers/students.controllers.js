import Student from "../models/student.models.js";

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find({
      user: req.user.id,
    }).populate("user");
    res.json(students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, email, department, grade, enrollNumber, user } = req.body;
    const newStudent = new Student({
      name,
      email,
      department,
      grade,
      enrollNumber,
      user,
    });
    const savedStudent = await newStudent.save();
    res.json(savedStudent);
  } catch (error) {
    console.log("Something went wrong" + error);
    return res
      .status(500)
      .json({ message: "Something went wrong" + error.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    console.log("req.params.id", req.params.id);

    const student = await Student.findById(req.params.id);
    if (!student) res.status(404).json({ message: "Student not found" });
    return res.json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent)
      return res.status(404).json({ message: "Student not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const studentUpdated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!studentUpdated) res.status(404).json({ message: "Student not found" });
    return res.json(studentUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
