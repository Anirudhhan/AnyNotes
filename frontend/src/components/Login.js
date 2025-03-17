import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "90px" }} >
      <div className="container" style={{ width: "25%" }}>
        <form className="p-4 border rounded shadow-sm bg-white">
          {/* Email input */}
          <h3 className="text-center mb-4">Login</h3>
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="email" id="form2Example1" className="form-control" />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>

          {/* Password input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="password" id="form2Example2" className="form-control" />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          {/* 2-column layout */}
          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              {/* Checkbox */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="form2Example31"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="form2Example31">
                  Remember me
                </label>
              </div>
            </div>
            <div className="col">
              {/* Forgot password link */}
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="button"
            className="btn btn-primary btn-block w-100 mb-4"
            style={{
              boxShadow: "none",
              transition: "box-shadow 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)")}
            onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
          >
            Sign in
          </button>

          {/* Register and Social Sign In */}
          <div className="text-center">
            <p>
              Not a member? <a href="register">Register</a>
            </p>
            <p>or sign up with:</p>
            <div>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-google"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-twitter"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-github"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
