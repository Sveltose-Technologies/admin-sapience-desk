// // import React from "react";
// // import {
// //   Navbar,
// //   Container,
// //   Nav,
// //   Form,
// //   FormControl,
// //   Button,
// //   Dropdown,
// // } from "react-bootstrap";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import { adminLogout } from "../../Services/adminService";

// // const Header = ({ toggleSidebar }) => {
// //   const navigate = useNavigate();

// //   const handleLogout = async () => {
// //     try {
// //       await adminLogout();
// //       toast.success("Logged out successfully");
// //       navigate("/login");
// //     } catch (error) {
// //       toast.error("Logout process failed");
// //       navigate("/login");
// //     }
// //   };

// //   return (
// //     <Navbar bg="white" expand="lg" className="shadow-sm px-3 py-2 sticky-top">
// //       <Container fluid>
// //         <Button
// //           variant="link"
// //           className="d-lg-none text-dark me-2 p-0"
// //           onClick={toggleSidebar}>
// //           <span className="navbar-toggler-icon"></span>
// //         </Button>
// //         <Navbar.Brand className="fw-bold">Dashboard</Navbar.Brand>
// //         <Nav className="ms-auto align-items-center">
// //           <Dropdown align="end">
// //             <Dropdown.Toggle
// //               variant="link"
// //               className="text-decoration-none p-0">
// //               <div
// //                 className="bg-black text-white rounded-circle d-flex align-items-center justify-content-center me-2"
// //                 style={{ width: "35px", height: "35px" }}>
// //                 AD
// //               </div>
// //             </Dropdown.Toggle>
// //             <Dropdown.Menu className="shadow border-0 mt-2">
// //               <Dropdown.Item onClick={handleLogout} className="text-danger">
// //                 Edit Profile
// //               </Dropdown.Item>
// //               <Dropdown.Item onClick={handleLogout} className="text-danger">
// //                 Logout
// //               </Dropdown.Item>
// //             </Dropdown.Menu>
// //           </Dropdown>
// //         </Nav>
// //       </Container>
// //     </Navbar>
// //   );
// // };

// // export default Header;

// import React from "react";
// import { Navbar, Container, Nav, Button, Dropdown } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { adminLogout } from "../../Services/adminService";

// const Header = ({ toggleSidebar }) => {
//   const navigate = useNavigate();

//   // LocalStorage se admin ka naam nikalne ke liye (Initials dikhane ke liye)
//   const adminUser = JSON.parse(localStorage.getItem("adminUser"));
//   const adminInitials = adminUser?.name
//     ? adminUser.name.substring(0, 2).toUpperCase()
//     : "AD";

//   const handleLogout = async () => {
//     try {
//       await adminLogout();
//       toast.success("Logged out successfully");
//       navigate("/login");
//     } catch (error) {
//       toast.error("Logout process failed");
//       navigate("/login");
//     }
//   };
// // Profile.jsx logic updates

//   return (
//     <Navbar bg="white" expand="lg" className="shadow-sm px-3 py-2 sticky-top">
//       <Container fluid>
//         <Button
//           variant="link"
//           className="d-lg-none text-dark me-2 p-0"
//           onClick={toggleSidebar}>
//           <span className="navbar-toggler-icon"></span>
//         </Button>
//         <Navbar.Brand className="fw-bold">Dashboard</Navbar.Brand>
//         <Nav className="ms-auto align-items-center">
//           <Dropdown align="end">
//             <Dropdown.Toggle
//               variant="link"
//               className="text-decoration-none p-0 d-flex align-items-center">
//               <div
//                 className="bg-black text-white rounded-circle d-flex align-items-center justify-content-center me-2"
//                 style={{
//                   width: "35px",
//                   height: "35px",
//                   fontSize: "14px",
//                   fontWeight: "bold",
//                 }}>
//                 {adminInitials}
//               </div>
//               <span className="d-none d-md-inline text-dark me-1 small">
//                 {adminUser?.name || "Admin"}
//               </span>
//             </Dropdown.Toggle>

//             <Dropdown.Menu className="shadow border-0 mt-2">
//               {/* Navigate to Profile Page */}
//               <Dropdown.Item onClick={() => navigate("/admin/profile")}>
//                 Edit Profile
//               </Dropdown.Item>

//               <Dropdown.Divider />

//               <Dropdown.Item onClick={handleLogout} className="text-danger">
//                 Logout
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminLogout } from "../../Services/adminService";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  const adminInitials = adminUser?.name
    ? adminUser.name.substring(0, 2).toUpperCase()
    : "AD";

  const handleLogout = async () => {
    try {
      setShow(false);
      await adminLogout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      navigate("/login");
    }
  };

  return (
    <Navbar
      bg="white"
      className="shadow-sm border-bottom px-3 sticky-top"
      style={{ height: "60px" }}
    >
      <Container fluid className="p-0 d-flex align-items-center">
        {/* Left Menu Icon */}
        <Button
          variant="light"
          className="border-0 d-lg-none me-2"
          onClick={toggleSidebar}
        >
          <i className="bi bi-list fs-4"></i>
        </Button>

        {/* Title Centered on Mobile */}
        <div className="flex-grow-1 text-center text-lg-start fw-bold">
          Dashboard
        </div>

        {/* Right Avatar */}
        {/* Right Avatar */}
        <div className="d-flex align-items-center">
          <Dropdown
            align="end"
            show={show}
            onToggle={(isOpen) => setShow(isOpen)}
          >
            <Dropdown.Toggle
              as="div"
              style={{ cursor: "pointer", paddingRight: "4px" }}
              className="d-flex align-items-center"
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {adminInitials}
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu
              className="shadow-lg border-0 rounded-3 mt-2"
              style={{
                minWidth: "190px",
                padding: "8px",
              }}
            >
              <Dropdown.Item
                className="rounded-2 py-2 d-flex align-items-center"
                onClick={() => {
                  setShow(false);
                  navigate("/admin/profile");
                }}
              >
                <i className="bi bi-person me-2 text-primary"></i>
                Edit Profile
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item
                className="rounded-2 py-2 d-flex align-items-center text-danger"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
