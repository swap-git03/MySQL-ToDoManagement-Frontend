/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createTask } from "../api/taskapi";
import "./TaskForm.css";

const TaskForm = () => {
  const [task, setTask] = useState({
    task_name: "",
    task_description: "",
    start_date: "",
    end_date: "",
  });
  const [message, setMessage] = useState("");
  const [isDark, setIsDark] = useState(false);

  // Listen to <html> class for dark-mode
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark-mode"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTask(task);
      setMessage(response.data.msg);
      setTask({ task_name: "", task_description: "", start_date: "", end_date: "" });
    } catch (err) {
      setMessage("Error creating task");
    }
  };

  return (
    <div className="taskform-root">
      <div className="taskform-container">
        {/* <h2 className="mb-3">Create Task</h2> */}
        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit} className="card p-4 shadow taskform-card">
          <div className="mb-3">
            <label className="form-label">Task Name</label>
            <input
              type="text"
              name="task_name"
              value={task.task_name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter task name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Task Description</label>
            <textarea
              name="task_description"
              value={task.task_description}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter task description"
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={task.start_date}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="end_date"
                value={task.end_date}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
