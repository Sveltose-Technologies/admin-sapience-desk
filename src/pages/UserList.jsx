// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Badge,
//   Button,
//   Modal,
//   Form,
//   Row,
//   Col,
//   Spinner,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import {
//   getAllUsers,
//   updateUser,
//   deleteUser,
//   getFullImageUrl,
// } from "../Services/adminService";
// import CustomPagination from "../components/common/CustomPagination";

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   // --- Pagination States ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Form States
//   const [editId, setEditId] = useState(null);
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [country, setCountry] = useState("");
//   const [password, setPassword] = useState("");
//   const [status, setStatus] = useState("active"); // Status State added
//   const [profilePic, setProfilePic] = useState(null);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await getAllUsers();
//       if (res && res.status === true) {
//         setUsers(res.users || []);
//       } else if (Array.isArray(res)) {
//         setUsers(res);
//       }
//     } catch (error) {
//       toast.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const safeUsers = Array.isArray(users) ? users : [];
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = safeUsers.slice(indexOfFirstItem, indexOfLastItem);

//   const handleEditClick = (user) => {
//     setEditId(user._id);
//     setFullName(user.fullName || "");
//     setEmail(user.email || "");
//     setPhone(user.phone || "");
//     setCountry(user.country || "");
//     setStatus(user.status || "active"); // Pre-fill status
//     setPassword("");
//     setProfilePic(null);
//     setShowModal(true);
//   };

//   const handleUpdate = async () => {
//     if (!fullName.trim() || !email.trim()) {
//       toast.warning("Name and Email are required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("fullName", fullName);
//     formData.append("email", email);
//     formData.append("phone", phone);
//     formData.append("country", country);
//     formData.append("status", status); // Status append kiya

//     if (password.trim() !== "") {
//       formData.append("password", password);
//     }

//     if (profilePic instanceof File) {
//       formData.append("profilePic", profilePic);
//     }

//     setBtnLoading(true);
//     try {
//       const res = await updateUser(editId, formData);
//       if (res && (res.status === true || res)) {
//         toast.success("User updated successfully");
//         setShowModal(false);
//         fetchUsers();
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Update failed");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         const res = await deleteUser(id);
//         if (res && (res.status === true || res)) {
//           toast.success("User deleted successfully");
//           fetchUsers();
//         }
//       } catch (error) {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   return (
//     <div className="bg-white p-4 rounded shadow-sm border">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h3 className="mb-0 fw-bold">User Management</h3>
//         <Badge bg="dark" className="px-3 py-2">
//           Total Users: {safeUsers.length}
//         </Badge>
//       </div>

//       <Table responsive hover className="mb-0 align-middle">
//         <thead className="bg-light">
//           <tr>
//             <th>S.No</th>
//             <th>Profile</th>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Status</th> {/* Status Column Header */}
//             <th className="text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="7" className="text-center py-5">
//                 <Spinner animation="border" size="sm" className="me-2" />{" "}
//                 Loading...
//               </td>
//             </tr>
//           ) : currentItems.length > 0 ? (
//             currentItems.map((user, index) => {
//               const imgUrl = getFullImageUrl(user.profilePic);

//               return (
//                 <tr key={user._id}>
//                   <td>
//                     {String(indexOfFirstItem + index + 1).padStart(2, "0")}
//                   </td>
//                   <td>
//                     <div
//                       style={{
//                         width: "45px",
//                         height: "45px",
//                         borderRadius: "50%",
//                         overflow: "hidden",
//                         border: "1px solid #ddd",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         backgroundColor: "#f8f9fa",
//                       }}
//                     >
//                       <img
//                         src={imgUrl}
//                         alt="profile"
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                         }}
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src = `https://ui-avatars.com/api/?name=${user.fullName}&background=random`;
//                         }}
//                       />
//                     </div>
//                   </td>
//                   <td className="fw-bold">{user.fullName}</td>
//                   <td>{user.email}</td>
//                   <td>{user.phone || "N/A"}</td>
//                   <td>
//                     {/* Status Badge Display */}
//                     <Badge bg={user.status === "active" ? "success" : "danger"}>
//                       {user.status || "N/A"}
//                     </Badge>
//                   </td>
//                   <td className="text-center">
//                     <Button
//                       variant="link"
//                       size="sm"
//                       className="me-2 text-decoration-none fw-bold"
//                       onClick={() => handleEditClick(user)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="link"
//                       size="sm"
//                       className="text-danger text-decoration-none fw-bold"
//                       onClick={() => handleDelete(user._id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan="7" className="text-center py-4 text-muted">
//                 No Users Found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {safeUsers.length > itemsPerPage && (
//         <div className="mt-4">
//           <CustomPagination
//             current={currentPage}
//             totalItems={safeUsers.length}
//             itemsPerPage={itemsPerPage}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         </div>
//       )}

//       {/* Edit Modal */}
//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         centered
//         size="lg"
//         backdrop="static"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title className="h5 fw-bold">Edit User Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="p-4">
//           <Form>
//             <Row>
//               <Col md={6} className="mb-3">
//                 <Form.Label className="fw-bold small">Full Name</Form.Label>
//                 <Form.Control
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                 />
//               </Col>
//               <Col md={6} className="mb-3">
//                 <Form.Label className="fw-bold small">Email</Form.Label>
//                 <Form.Control
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Col>
//               <Col md={6} className="mb-3">
//                 <Form.Label className="fw-bold small">Phone</Form.Label>
//                 <Form.Control
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//               </Col>
//               <Col md={6} className="mb-3">
//                 <Form.Label className="fw-bold small">Country</Form.Label>
//                 <Form.Control
//                   value={country}
//                   onChange={(e) => setCountry(e.target.value)}
//                 />
//               </Col>
//               <Col md={6} className="mb-3">
//                 <Form.Label className="fw-bold small">
//                   Account Status
//                 </Form.Label>
//                 {/* Status Dropdown added */}
//                 <Form.Select
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                 >
//                   <option value="active">Active</option>
//                   <option value="deactive">Deactive</option>
//                 </Form.Select>
//               </Col>
//               <Col md={6} className="mb-3">
//                 <Form.Label className="fw-bold small">Change Image</Form.Label>
//                 <Form.Control
//                   type="file"
//                   onChange={(e) => setProfilePic(e.target.files[0])}
//                   accept="image/*"
//                 />
//               </Col>
//               <Col md={12} className="mb-3">
//                 <Form.Label className="fw-bold small">
//                   New Password (Optional)
//                 </Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Leave blank to skip"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </Col>
//             </Row>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="dark" onClick={handleUpdate} disabled={btnLoading}>
//             {btnLoading ? (
//               <Spinner animation="border" size="sm" />
//             ) : (
//               "Save Changes"
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default UserList;
import React, { useState, useEffect } from "react";
import {
  Table,
  Badge,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getFullImageUrl,
} from "../Services/adminService";
import CustomPagination from "../components/common/CustomPagination";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // --- New State for View Modal ---
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form States
  const [editId, setEditId] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("active");
  const [profilePic, setProfilePic] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      if (res && res.status === true) {
        setUsers(res.users || []);
      } else if (Array.isArray(res)) {
        setUsers(res);
      }
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const safeUsers = Array.isArray(users) ? users : [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = safeUsers.slice(indexOfFirstItem, indexOfLastItem);

  // --- View Click Handler ---
  const handleViewClick = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEditClick = (user) => {
    setEditId(user._id);
    setFullName(user.fullName || "");
    setEmail(user.email || "");
    setPhone(user.phone || "");
    setCountry(user.country || "");
    setStatus(user.status || "active");
    setPassword("");
    setProfilePic(null);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!fullName.trim() || !email.trim()) {
      toast.warning("Name and Email are required");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("country", country);
    formData.append("status", status);

    if (password.trim() !== "") {
      formData.append("password", password);
    }

    if (profilePic instanceof File) {
      formData.append("profilePic", profilePic);
    }

    setBtnLoading(true);
    try {
      const res = await updateUser(editId, formData);
      if (res && (res.status === true || res)) {
        toast.success("User updated successfully");
        setShowModal(false);
        fetchUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await deleteUser(id);
        if (res && (res.status === true || res)) {
          toast.success("User deleted successfully");
          fetchUsers();
        }
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm border">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0 fw-bold">User Management</h3>
        <Badge bg="dark" className="px-3 py-2">
          Total Users: {safeUsers.length}
        </Badge>
      </div>

      <Table responsive hover className="mb-0 align-middle">
        <thead className="bg-light">
          <tr>
            <th>S.No</th>
            <th>Profile</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-5">
                <Spinner animation="border" size="sm" className="me-2" />{" "}
                Loading...
              </td>
            </tr>
          ) : currentItems.length > 0 ? (
            currentItems.map((user, index) => {
              const imgUrl = getFullImageUrl(user.profilePic);

              return (
                <tr key={user._id}>
                  <td>
                    {String(indexOfFirstItem + index + 1).padStart(2, "0")}
                  </td>
                  <td>
                    <div
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <img
                        src={imgUrl}
                        alt="profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${user.fullName}&background=random`;
                        }}
                      />
                    </div>
                  </td>
                  <td className="fw-bold">{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || "N/A"}</td>
                  <td>
                    <Badge bg={user.status === "active" ? "success" : "danger"}>
                      {user.status || "N/A"}
                    </Badge>
                  </td>
                  <td className="text-center">
                    {/* View Button */}
                    <Button
                      variant="link"
                      size="sm"
                      className="me-2 text-decoration-none fw-bold text-info"
                      onClick={() => handleViewClick(user)}
                    >
                      View
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="me-2 text-decoration-none fw-bold"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-danger text-decoration-none fw-bold"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-muted">
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {safeUsers.length > itemsPerPage && (
        <div className="mt-4">
          <CustomPagination
            current={currentPage}
            totalItems={safeUsers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {/* --- View User Modal --- */}
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
        size="md"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          {selectedUser && (
            <div className="text-center mb-4">
              <div
                className="mx-auto mb-3 shadow-sm"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "4px solid #f8f9fa",
                }}
              >
                <img
                  src={getFullImageUrl(selectedUser.profilePic)}
                  alt="profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${selectedUser.fullName}&background=random&size=128`;
                  }}
                />
              </div>
              <h4 className="fw-bold mb-1">{selectedUser.fullName}</h4>
              <Badge
                bg={selectedUser.status === "active" ? "success" : "danger"}
                className="mb-3"
              >
                {selectedUser.status?.toUpperCase()}
              </Badge>

              <ListGroup variant="flush" className="text-start border rounded">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="text-muted small fw-bold">Email:</span>
                  <span className="fw-semibold">{selectedUser.email}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="text-muted small fw-bold">Phone:</span>
                  <span className="fw-semibold">
                    {selectedUser.phone || "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="text-muted small fw-bold">Country:</span>
                  <span className="fw-semibold">
                    {selectedUser.country || "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="text-muted small fw-bold">User ID:</span>
                  <span className="text-truncate ms-4 fw-normal small">
                    {selectedUser._id}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            variant="secondary"
            className="w-100"
            onClick={() => setShowViewModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold">Edit User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label className="fw-bold small">Full Name</Form.Label>
                <Form.Control
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="fw-bold small">Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="fw-bold small">Phone</Form.Label>
                <Form.Control
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="fw-bold small">Country</Form.Label>
                <Form.Control
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="fw-bold small">
                  Account Status
                </Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="deactive">Deactive</option>
                </Form.Select>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="fw-bold small">Change Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  accept="image/*"
                />
              </Col>
              <Col md={12} className="mb-3">
                <Form.Label className="fw-bold small">
                  New Password (Optional)
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Leave blank to skip"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleUpdate} disabled={btnLoading}>
            {btnLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
