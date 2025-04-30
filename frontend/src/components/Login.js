import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    const url = "https://anynotes-backend.onrender.com/api/auth/login";
    try {
      const toastId = toast.loading("Logging in...");
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
  
        const errorMessage = json.errors?.length > 0 ? json.errors[0].msg : json.error || "Invalid credentials";
        toast.update(toastId, { 
          render: errorMessage, 
          type: "error", 
          isLoading: false,
          autoClose: 5000
        });
        setIsLoading(false);
        return;
      }
  
      localStorage.setItem("token", json.authToken);
      
      toast.update(toastId, { 
        render: json.message || "Login Successful", 
        type: "success", 
        isLoading: false,
        autoClose: 2000
      });
  
      setTimeout(() => {
        navigate("/");
        console.log(localStorage.getItem("token"));
      }, 2000);
    } catch (error) {
      toast.error("Failed to login. Please try again.");
      console.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "90px" }}>
      <ToastContainer position="top-right" />
      <div className="container" style={{ width: "25%" }}>
        <form className="p-4 border rounded shadow-sm bg-white">
          <h3 className="text-center mb-4">Login</h3>

          <div className="form-outline mb-4">
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <label className="form-label" htmlFor="email">
              Email address
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="form2Example31" defaultChecked />
                <label className="form-check-label" htmlFor="form2Example31">
                  Remember me
                </label>
              </div>
            </div>
            <div className="col text-end">
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block w-100 mb-4"
            style={{
              boxShadow: "none",
              transition: "box-shadow 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)")}
            onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>

          <div className="text-center">
            <p>
              Not a member? <Link to="/register">Register</Link> 
            </p>
            <p>or sign up with:</p>
            {/* <div>
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
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}