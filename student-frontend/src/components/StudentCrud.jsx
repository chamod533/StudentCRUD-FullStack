import { useEffect, useState } from "react";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";
import "../styles/student.css";

function StudentCrud() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    course: "",
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveStudent = async () => {
    if (!form.name) return alert("Name required");

    if (form.id) {
      await updateStudent(form.id, form);
    } else {
      await addStudent(form);
    }

    clearForm();
    loadStudents();
  };

  const editStudent = (student) => {
    setForm(student);
  };

  const removeStudent = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };

  const clearForm = () => {
    setForm({ id: null, name: "", email: "", course: "" });
  };

  return (
    <div className="container-box">
      <h3 className="title">🎓 Student Management</h3>

      <input
        className="form-control"
        name="name"
        placeholder="Student Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        className="form-control"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
      />

      <input
        className="form-control"
        name="course"
        placeholder="Course Name"
        value={form.course}
        onChange={handleChange}
      />

      <div className="d-flex gap-2">
        <button
          className={`btn ${form.id ? "btn-warning" : "btn-primary"}`}
          onClick={saveStudent}
        >
          {form.id ? "Update Student" : "Add Student"}
        </button>

        {form.id && (
          <button className="btn btn-secondary" onClick={clearForm}>
            Cancel
          </button>
        )}
      </div>

      <hr />

      <ul className="list-group">
        {students.map((s) => (
          <li className="list-group-item" key={s.id}>
            <div>
              <strong>{s.name}</strong>
              <div className="text-muted">
                {s.email} | {s.course}
              </div>
            </div>

            <div>
              <button
                className="btn btn-sm btn-outline-warning action-btn"
                onClick={() => editStudent(s)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeStudent(s.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentCrud;
