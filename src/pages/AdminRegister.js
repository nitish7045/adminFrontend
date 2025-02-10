import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // For loading spinner
import { FaCheckCircle } from "react-icons/fa"; // For success icon

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [success, setSuccess] = useState(false); // Success state
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
  
    try {
      const response = await axios.post(
        "https://fantacy-app-backend.onrender.com/auth/admin/register",
        formData
      );
  
      console.log(response.data); // Log success response
      setMessage(response.data.message);
      setSuccess(true); // Set success to true
      setFormData({ username: "", email: "", password: "" }); // Clear form
  
      // Redirect to login screen after 2 seconds
      setTimeout(() => {
        navigate("/login"); // Navigate to the login screen
      }, 2000);
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Registration</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.buttonPrimary}
          disabled={loading || success} // Disable during loading or success
        >
          {loading ? (
            <ClipLoader size={20} color="#ffffff" /> // Loading spinner
          ) : (
            "Register"
          )}
        </button>
      </form>
      {message && (
        <div style={styles.successMessage}>
          <FaCheckCircle style={styles.successIcon} />
          <p>{message}</p>
        </div>
      )}
      {error && <p style={styles.error}>{error}</p>}
      <br />
      <button onClick={() => navigate("/")} style={styles.buttonSecondary}>
        Home
      </button>
    </div>
  );
};

// Styling for a modern and polished UI
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "40px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "10px 0",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  inputFocus: {
    borderColor: "#007bff",
    boxShadow: "0 0 8px rgba(0, 123, 255, 0.3)",
  },
  buttonPrimary: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    margin: "10px 0",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimaryHover: {
    backgroundColor: "#0056b3",
    transform: "scale(1.02)",
  },
  buttonSecondary: {
    padding: "12px",
    backgroundColor: "transparent",
    color: "#007bff",
    border: "2px solid #007bff",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    margin: "10px 0",
    transition: "background-color 0.3s ease, color 0.3s ease, transform 0.2s ease",
  },
  buttonSecondaryHover: {
    backgroundColor: "#007bff",
    color: "#ffffff",
    transform: "scale(1.02)",
  },
  successMessage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "green",
    fontWeight: "bold",
    marginTop: "10px",
    animation: "fadeIn 0.5s ease",
  },
  successIcon: {
    marginRight: "8px",
    fontSize: "20px",
    animation: "bounce 0.5s ease",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    marginTop: "10px",
    animation: "fadeIn 0.5s ease",
  },
};

// Add CSS animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }`,
  styleSheet.cssRules.length
);
styleSheet.insertRule(
  `@keyframes bounce {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }`,
  styleSheet.cssRules.length
);

export default AdminRegister;