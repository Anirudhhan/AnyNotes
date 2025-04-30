import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-secondary" style={{height: "65px"}}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              AnyNotes
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
              {!localStorage.getItem("token")?
              <button className="btn btn-outline-success mx-5" onClick={()=>navigate("/")}>
                Login
              </button> :
              <a className="btn btn-outline-danger mx-5" onClick={handleLogout}>
                logout
              </a>}
          </div>
        </div>
      </nav>
    </>
  );
}
