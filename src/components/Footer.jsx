import React from "react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-left">
          <h5 className="footer-brand">ToDo's</h5>
          <p className="footer-text">
            Organize your day, stay productive and achieve your goals!
          </p>
        </div>

        <div className="footer-links">
          <a href="/" className="footer-link">
            Home
          </a>
          <a href="/add-task" className="footer-link">
            Add Task
          </a>
          <a
            href="https://github.com/"
            className="footer-link"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>

        <div className="footer-right">
          <p className="footer-copy">
            © {year} ToDo's — Built by SWAP 🔥 using React,Node And MySQL
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
