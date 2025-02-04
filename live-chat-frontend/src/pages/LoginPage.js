import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Send API request with form data
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email: data.email,
        password: data.password,
      });

      const { token } = response.data;

      // Save the token in localStorage (or sessionStorage)
      localStorage.setItem('authToken', token);

      // Redirect to chat page
      navigate('/chat');
    } catch (err) {
      // Handle error and show error message in the UI
      setError("email", {
        type: "manual",
        message: err.response?.data?.error || "Something went wrong",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
