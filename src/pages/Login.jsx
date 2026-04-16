import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  adminLogin,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../Services/adminService";
import logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Password Show/Hide States ---
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- Forgot Password States ---
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [step, setStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await adminLogin({ email, password });
      if (response?.status) {
        toast.success("Login Successful");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // --- Forgot Password Logic ---
  const handleSendOtp = async () => {
    const cleanEmail = forgotEmail.trim();
    if (!cleanEmail) return toast.warning("Please enter email");
    try {
      setLoading(true);
      const res = await forgotPassword(cleanEmail);
      if (res.status) {
        toast.success("OTP sent to your email");
        setStep(2);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await verifyOtp(forgotEmail.trim(), otp.trim());
      if (res) {
        toast.success("OTP Verified Successfully");
        setStep(3);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async () => {
    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");
    try {
      setLoading(true);
      const res = await resetPassword({
        email: forgotEmail.trim(),
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });
      if (res) {
        toast.success("Password Reset Successful! Please login.");
        setShowForgotModal(false);
        setStep(1);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-light d-flex align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={11} sm={8} md={5} lg={4}>
            <Card className="border-0 shadow-lg overflow-hidden">
              {/* --- Fixed Logo Section --- */}
              <div className="text-center p-4 bg-white">
                <img
                  src={logo}
                  alt="Article Logo"
                  className="img-fluid"
                  style={{
                    maxHeight: "65px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
                <h5 className="mt-3 fw-bold text-dark mb-0">Admin Portal</h5>
                <p className="text-muted small">
                  Sign in to manage your content
                </p>
              </div>

              <Card.Body className="px-4 pb-4 pt-0">
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold">
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label className="small fw-bold">Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer text-muted"
                        style={{ zIndex: 10, cursor: "pointer" }}
                      >
                        <i
                          className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                        ></i>
                      </span>
                    </div>
                  </Form.Group>

                  <div className="text-end mb-4">
                    <Button
                      variant="link"
                      className="p-0 text-decoration-none small fw-medium"
                      onClick={() => setShowForgotModal(true)}
                    >
                      Forgot Password?
                    </Button>
                  </div>

                  <Button
                    variant="dark"
                    type="submit"
                    className="w-100 py-2 fw-bold shadow-sm"
                    disabled={loading}
                  >
                    {loading ? "AUTHENTICATING..." : "LOG IN"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Forgot Password Modal */}
      <Modal
        show={showForgotModal}
        onHide={() => setShowForgotModal(false)}
        centered
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {step === 1 && (
            <div>
              <p className="text-muted small">
                Enter your email and we'll send you an OTP.
              </p>
              <Form.Label className="small fw-bold">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <Button
                className="mt-3 w-100 fw-bold"
                variant="dark"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          )}
          {step === 2 && (
            <div>
              <p className="text-muted small">
                We've sent a 6-digit code to <b>{forgotEmail}</b>
              </p>
              <Form.Label className="small fw-bold">Enter OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="000000"
                className="text-center fw-bold letter-spacing-2"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                className="mt-3 w-100 fw-bold"
                variant="dark"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                Verify OTP
              </Button>
            </div>
          )}
          {step === 3 && (
            <div>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">New Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                  >
                    <i
                      className={`bi ${showNewPassword ? "bi-eye-slash" : "bi-eye"}`}
                    ></i>
                  </span>
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">
                  Confirm Password
                </Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                  >
                    <i
                      className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}
                    ></i>
                  </span>
                </div>
              </Form.Group>
              <Button
                className="w-100 fw-bold"
                variant="dark"
                onClick={handleResetSubmit}
                disabled={loading}
              >
                Update Password
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
