/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getAllTasks, deleteTask, isCompleteTask, updateTask } from "../api/taskapi";
import DeleteTaskModal from "./TaskDelete";
import TaskUpdateModal from "./TaskUpdateModal";
import "./Home.css";

const Home = ({ searchTerm }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskEdit, setSelectedTaskEdit] = useState(null);

  async function fetchData() {
    const response = await getAllTasks();
    if (response.data.success) {
      setTasks(response.data.tasks);
      setFilteredTasks(response.data.tasks);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Update filteredTasks whenever searchTerm or tasks change
  useEffect(() => {
    const filtered = tasks.filter(task =>
      task.task_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchTerm, tasks]);

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setShowModalDelete(true);
  };

  const handleClose = () => {
    setShowModalDelete(false);
    setSelectedTask(null);
    setShowModalEdit(false);
    setSelectedTaskEdit(null);
  };

  async function handleDelete(taskID) {
    try {
      const response = await deleteTask(taskID);
      if (response.data.success) {
        fetchData();
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  function handleUpdateClick(task) {
    setSelectedTaskEdit(task);
    setShowModalEdit(true);
  }

  async function handleUpdate(taskID, formData) {
    await updateTask(taskID, formData);
    fetchData();
    handleClose();
  }

  async function handleIsComplete(taskID) {
    await isCompleteTask(taskID);
    fetchData();
  }

  return (
    <div className="home-root container-fluid">
      <section className="home-hero text-center py-4">
        <h1 className="display-5 fw-bold">Manage your todos</h1>
        <p className="home-subtitle">Quick, clear and delightful ✨</p>
      </section>

      {filteredTasks.length === 0 ? (
        <div className="empty-spot mt-5 text-center">
          <p>No tasks found</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredTasks.map((task) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={task.id}>
              <div className="task-card card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{task.task_name}</h5>
                  <p className="card-text text-muted">
                    {task.task_description || "No description"}
                  </p>
                  <div className="mt-auto">
                    <p className="mb-1">
                      <strong>Status:</strong> {task.is_complete ? "Completed" : "In progress"}
                    </p>
                    <p className="mb-1">
                      <strong>Start:</strong> {new Date(task.start_date).toLocaleDateString()}
                    </p>
                    <p className="mb-3">
                      <strong>End:</strong> {new Date(task.end_date).toLocaleDateString()}
                    </p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="action-btn btn-light"
                        onClick={() => handleUpdateClick(task)}
                        title="Edit task"
                      >
                        ✏️
                      </button>
                      <button
                        className="action-btn btn-danger"
                        onClick={() => handleDeleteClick(task)}
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteTaskModal
        show={showModalDelete}
        handleClose={handleClose}
        handleDelete={handleDelete}
        task={selectedTask}
      />

      <TaskUpdateModal
        show={showModalEdit}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        task={selectedTaskEdit}
      />
    </div>
  );
};

export default Home;
