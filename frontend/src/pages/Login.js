import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const role = e.target.role.value;

    const allowedAdminEmail = "arifrif1915@gmail.com";
    const allowedDoctorEmails = ["doctor1@example.com", "doctor2@example.com"];
    const reservedEmails = [allowedAdminEmail, ...allowedDoctorEmails];

    setErrorMessage('');

    if (role === "admin") {
      if (email === allowedAdminEmail) {
        navigate("/admin");
      } else {
        setErrorMessage("Access denied: Only the allowed admin email can login as admin.");
      }
    } else if (role === "doctor") {
      if (allowedDoctorEmails.includes(email)) {
        navigate("/doctor");
      } else {
        setErrorMessage("Access denied: Only allowed doctor emails can login as doctor.");
      }
    } else if (role === "patient") {
      if (reservedEmails.includes(email)) {
        setErrorMessage("Access denied: This email is reserved for admin or doctor.");
      } else {
        navigate("/patient");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Medical Dashboard Login</h1>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <select name="role" required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
          <button type="submit">Login</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="signup-option" style={{ marginTop: '15px' }}>
          <button type="button" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}