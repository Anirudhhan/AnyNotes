import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState(""); 
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleClick = async (e) => {
      e.preventDefault();
      setError("");

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
  
      const url = "http://localhost:8000/api/auth/new-user";
      try {
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
            setError("API endpoint not found. Check server route.");
            return;
          }
    
          const errorMessage = json.errors?.length > 0 ? json.errors[0].msg : json.error;
          setError(errorMessage); 
          return;
        }
  
        setSuccess(json.message || "Register Successful"); 
        setError("");

        setTimeout(() => {
          navigate("/login"); 
        }, 1000); 
        console.log(json);
      } catch (error) {
        setError(error.message);
        console.error(error.message);
      }
    };

  return (
    <div 
      className="container  align-items-center" 
      style={{ width: "25%", marginTop: "25px" }}
    >
      {success && <div className="alert alert-success">{success}</div>} 
      {error && <div className="alert alert-danger">{error}</div>}
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

        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="registerName" className="form-label">Full Name</label>
            <input type="text" id="registerName" className="form-control" value = {name} onChange={(e)=> setName(e.target.value)}/>
          </div>

          <div className="mb-3">
            <label htmlFor="registerEmail" className="form-label">Email</label>
            <input type="email" id="registerEmail" className="form-control" value = {email} onChange={(e)=> setEmail(e.target.value)}/>
          </div>

          <div className="mb-3">
            <label htmlFor="registerPassword" className="form-label">Password</label>
            <input type="password" id="registerPassword" className="form-control" value = {password} onChange={(e)=> setPassword(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="registerRepeatPassword" className="form-label">Repeat Password</label>
            <input type="password" id="registerRepeatPassword" className="form-control" value = {confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
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
