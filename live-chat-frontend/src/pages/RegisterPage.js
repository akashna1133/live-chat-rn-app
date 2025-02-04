import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const RegisterPage = () => {
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/api/users/register", data);

      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/"); // Redirect to login page after success
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Registration failed. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            {...register("name")}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>
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
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
