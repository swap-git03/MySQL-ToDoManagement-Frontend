import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onSearch, tasksCount = 0 }) => {
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch (e) {
      // localStorage might be unavailable in some environments
      // avoid empty catch to satisfy ESLint
      console.warn("localStorage read failed:", e);
      return false;
    }
  });

  useEffect(() => {
    try {
      if (dark) {
        document.documentElement.classList.add("dark-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
      }
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {
      // log and continue — prevents app crash if DOM/localStorage unavailable
      console.warn("Applying theme failed:", e);
    }
  }, [dark]);

  function handleToggleTheme() {
    setDark((d) => !d);
  }

  function handleSearchChange(e) {
    const v = e.target.value;
    setSearch(v);
    if (typeof onSearch === "function") onSearch(v);
  }

  function clearSearch() {
    setSearch("");
    if (typeof onSearch === "function") onSearch("");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <svg
            className="brand-icon"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            aria-hidden
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="14" height="16" rx="2" />
            <path d="M7 8h6M7 12h6M7 16h4" />
            <polyline points="19 7 23 7 23 11" />
            <path d="M19 11l4 4" />
          </svg>

          <span className="brand-text ms-2">ToDo's</span>
          {tasksCount > 0 && (
            <span className="badge bg-danger ms-2 badge-count">{tasksCount}</span>
          )}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-task">
                Add New Task
              </Link>
            </li>
          </ul>

          <form
            className="d-flex align-items-center ms-auto me-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="input-group search-group">
              <span
                className="input-group-text search-icon"
                id="search-addon"
                aria-hidden
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                className="form-control search-input"
                placeholder="Search tasks..."
                aria-label="Search tasks"
                aria-describedby="search-addon"
                value={search}
                onChange={handleSearchChange}
              />
              {search ? (
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-clear"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  ×
                </button>
              ) : null}
            </div>
          </form>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn theme-toggle"
              onClick={handleToggleTheme}
              title={dark ? "Switch to light" : "Switch to dark"}
              aria-pressed={dark}
            >
              {dark ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
