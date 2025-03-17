import React from "react";

const Register = () => {
  return (
    <div 
      className="container  align-items-center" 
      style={{ width: "25%", marginTop: "25px" }}
    >
      <div className="card p-4 shadow">
        <h3 className="text-center mb-4">Register</h3>

        <div className="text-center mb-3">
          <p>Sign up with:</p>
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

        <p className="text-center">or:</p>

        <form>
          <div className="mb-3">
            <label htmlFor="registerName" className="form-label">Full Name</label>
            <input type="text" id="registerName" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="registerEmail" className="form-label">Email</label>
            <input type="email" id="registerEmail" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="registerPassword" className="form-label">Password</label>
            <input type="password" id="registerPassword" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="registerRepeatPassword" className="form-label">Repeat Password</label>
            <input type="password" id="registerRepeatPassword" className="form-control" />
          </div>

          <div className="form-check d-flex justify-content-center mb-3">
            <input className="form-check-input me-2" type="checkbox" id="registerCheck" />
            <label className="form-check-label" htmlFor="registerCheck">
              I agree to the terms and conditions
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>

          <div className="text-center mt-3">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
