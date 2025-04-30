import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    const url = "https://anynotes-backend.onrender.com/api/auth/new-user";
    
    try {
      const toastId = toast.loading("Creating your account...");
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      
      if (!response.ok) {
        if (response.status === 404) {
          toast.update(toastId, { 
            render: "API endpoint not found. Check server route.", 
            type: "error", 
            isLoading: false,
            autoClose: 5000
          });
          setIsLoading(false);
          return;
        }

        const errorMessage = json.errors?.length > 0 ? json.errors[0].msg : json.error;
        toast.update(toastId, { 
          render: errorMessage, 
          type: "error", 
          isLoading: false,
          autoClose: 5000
        });
        setIsLoading(false);
        return;
      }

      toast.update(toastId, { 
        render: json.message || "Registration Successful", 
        type: "success", 
        isLoading: false,
        autoClose: 2000
      });

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container align-items-center"
      style={{ width: "25%", marginTop: "25px" }}
    >
      <ToastContainer position="top-right" />
      <div className="card p-4 shadow">
        <h3 className="text-center mb-4">Register</h3>

        <div className="text-center mb-3">
          <p>Sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1" disabled={isLoading}>
            <i className="fab fa-facebook-f"></i>
          </button>
          <button type="button" className="btn btn-link btn-floating mx-1" disabled={isLoading}>
            <i className="fab fa-google"></i>
          </button>
          <button type="button" className="btn btn-link btn-floating mx-1" disabled={isLoading}>
            <i className="fab fa-twitter"></i>
          </button>
          <button type="button" className="btn btn-link btn-floating mx-1" disabled={isLoading}>
            <i className="fab fa-github"></i>
          </button>
        </div>

        <p className="text-center">or:</p>

        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="registerName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="registerName"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="registerEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="registerEmail"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="registerPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="registerPassword"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="registerRepeatPassword" className="form-label">
              Repeat Password
            </label>
            <input
              type="password"
              id="registerRepeatPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-check d-flex justify-content-center mb-3">
            <input
              className="form-check-input me-2"
              type="checkbox"
              id="registerCheck"
              disabled={isLoading}
            />
            <label className="form-check-label" htmlFor="registerCheck">
              I agree to the terms and conditions
            </label>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={isLoading}
            style={{
              boxShadow: "none",
              transition: "box-shadow 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => !isLoading && (e.target.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)")}
            onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="text-center mt-3">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;