// // import React, { useState, useEffect } from "react";
// // import {
// //   Table,
// //   Button,
// //   Modal,
// //   Form,
// //   Spinner,
// //   Badge,
// //   Row,
// //   Col,
// // } from "react-bootstrap";
// // import { toast } from "react-toastify";
// // import CustomPagination from "../components/common/CustomPagination";
// // import {
// //   getAllComments,
// //   updateComment,
// //   deleteComment,
// // } from "../Services/adminService";

// // const Comments = () => {
// //   const [commentsList, setCommentsList] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [btnLoading, setBtnLoading] = useState(false);
// //   const [showModal, setShowModal] = useState(false);

// //   // Pagination State
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 10;

// //   // Form State
// //   const [formData, setFormData] = useState({
// //     id: "",
// //     userId: "",
// //     articleId: "",
// //     comment: "",
// //   });

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await getAllComments();
// //       if (res.status) {
// //         setCommentsList(res.comments || []);
// //       }
// //     } catch (error) {
// //       toast.error("Failed to load comments");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Helper: Truncate Comment to 5 Words
// //   const formatComment = (text) => {
// //     if (!text) return "No content";
// //     const words = text.trim().split(/\s+/);
// //     if (words.length <= 5) return text;
// //     return words.slice(0, 5).join(" ") + "...";
// //   };

// //   const handleEditSubmit = async (e) => {
// //     e.preventDefault();
// //     setBtnLoading(true);
// //     try {
// //       const payload = {
// //         userId: formData.userId,
// //         articleId: formData.articleId || null,
// //         comment: formData.comment,
// //       };
// //       const res = await updateComment(formData.id, payload);
// //       if (res.status) {
// //         toast.success("Comment updated successfully");
// //         setShowModal(false);
// //         fetchData();
// //       }
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Update failed");
// //     } finally {
// //       setBtnLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this comment?")) {
// //       try {
// //         const res = await deleteComment(id);
// //         if (res.status) {
// //           toast.success("Comment deleted");
// //           fetchData();
// //         }
// //       } catch (error) {
// //         toast.error("Delete failed");
// //       }
// //     }
// //   };

// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = commentsList.slice(indexOfFirstItem, indexOfLastItem);

// //   return (
// //     <div className="bg-white p-4 rounded shadow-sm border">
// //       {/* Header Section */}
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <div>
// //           <h3 className="mb-0 fw-bold text-dark">User Comments</h3>
// //           <p className="text-muted small mb-0">
// //             Monitor and moderate all user discussions
// //           </p>
// //         </div>
// //         <Badge bg="dark" className="px-3 py-2 fw-normal">
// //           Total Records: {commentsList.length}
// //         </Badge>
// //       </div>

// //       {/* Table Section */}
// //       <Table responsive hover className="mb-0 align-middle border-top">
// //         <thead className="bg-light">
// //           <tr>
// //             <th className="py-3">S.No</th>
// //             <th className="py-3">User Name</th>
// //             <th className="py-3">Email ID</th>
// //             <th className="py-3">Country</th>
// //             <th className="py-3">Date</th>
// //             <th className="py-3" style={{ width: "25%" }}>
// //               Comment
// //             </th>
// //             <th className="py-3 text-center">Action</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {loading ? (
// //             <tr>
// //               <td colSpan="7" className="text-center py-5">
// //                 <Spinner animation="border" size="sm" variant="dark" />
// //                 <span className="ms-2">Loading comments...</span>
// //               </td>
// //             </tr>
// //           ) : currentItems.length > 0 ? (
// //             currentItems.map((item, index) => (
// //               <tr key={item._id}>
// //                 <td>{String(indexOfFirstItem + index + 1).padStart(2, "0")}</td>
// //                 <td className="fw-bold text-dark">
// //                   {item.userId?.fullName || "Guest User"}
// //                 </td>
// //                 <td>{item.userId?.email || "N/A"}</td>
// //                 <td className="text-capitalize">
// //                   {item.userId?.country || "N/A"}
// //                 </td>
// //                 <td>{new Date(item.createdAt).toLocaleDateString("en-GB")}</td>
// //                 <td className="text-muted small italic">
// //                   {formatComment(item.comment)}
// //                 </td>
// //                 <td className="text-center">
// //                   <Button
// //                     variant="link"
// //                     size="sm"
// //                     className="text-decoration-none fw-bold me-2"
// //                     onClick={() => {
// //                       setFormData({
// //                         id: item._id,
// //                         userId: item.userId?._id || "",
// //                         articleId: item.articleId?._id || "",
// //                         comment: item.comment,
// //                       });
// //                       setShowModal(true);
// //                     }}
// //                   >
// //                     Edit
// //                   </Button>
// //                   <Button
// //                     variant="link"
// //                     size="sm"
// //                     className="text-danger text-decoration-none fw-bold"
// //                     onClick={() => handleDelete(item._id)}
// //                   >
// //                     Delete
// //                   </Button>
// //                 </td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="7" className="text-center py-5 text-muted">
// //                 No comments found.
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </Table>

// //       {/* Pagination */}
// //       <div className="mt-4">
// //         <CustomPagination
// //           current={currentPage}
// //           totalItems={commentsList.length}
// //           itemsPerPage={itemsPerPage}
// //           onPageChange={setCurrentPage}
// //         />
// //       </div>

// //       {/* Update Modal */}
// //       <Modal
// //         show={showModal}
// //         onHide={() => setShowModal(false)}
// //         centered
// //         backdrop="static"
// //       >
// //         <Modal.Header closeButton className="border-0">
// //           <Modal.Title className="h5 fw-bold">Update Comment</Modal.Title>
// //         </Modal.Header>
// //         <Form onSubmit={handleEditSubmit}>
// //           <Modal.Body className="px-4 pb-4">
// //             <Row>
// //               <Col md={12} className="mb-3">
// //                 <Form.Label className="fw-bold small text-muted">
// //                   Reference User ID
// //                 </Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   value={formData.userId}
// //                   disabled
// //                   className="bg-light border-0 small text-muted"
// //                 />
// //               </Col>
// //               <Col md={12} className="mb-3">
// //                 <Form.Label className="fw-bold small">
// //                   Comment Description
// //                 </Form.Label>
// //                 <Form.Control
// //                   as="textarea"
// //                   rows={6}
// //                   value={formData.comment}
// //                   onChange={(e) =>
// //                     setFormData({ ...formData, comment: e.target.value })
// //                   }
// //                   required
// //                   placeholder="Type the updated comment content here..."
// //                   className="border-secondary-subtle"
// //                 />
// //               </Col>
// //             </Row>
// //           </Modal.Body>
// //           <Modal.Footer className="border-0">
// //             <Button
// //               variant="light"
// //               className="fw-bold"
// //               onClick={() => setShowModal(false)}
// //             >
// //               Cancel
// //             </Button>
// //             <Button
// //               variant="dark"
// //               type="submit"
// //               className="px-4 fw-bold"
// //               disabled={btnLoading}
// //             >
// //               {btnLoading ? "Saving..." : "Save Changes"}
// //             </Button>
// //           </Modal.Footer>
// //         </Form>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default Comments;

// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Button,
//   Modal,
//   Form,
//   Spinner,
//   Badge,
//   Row,
//   Col,
//   InputGroup,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import CustomPagination from "../components/common/CustomPagination";
// import {
//   getAllComments,
//   updateComment,
//   deleteComment,
// } from "../Services/adminService";

// const Comments = () => {
//   const [commentsList, setCommentsList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   // Pagination State
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Filter States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // Form State
//   const [formData, setFormData] = useState({
//     id: "",
//     userId: "",
//     articleId: "",
//     comment: "",
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await getAllComments();
//       if (res.status) {
//         setCommentsList(res.comments || []);
//       }
//     } catch (error) {
//       toast.error("Failed to load comments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper: Truncate Comment to 5 Words
//   const formatComment = (text) => {
//     if (!text) return "No content";
//     const words = text.trim().split(/\s+/);
//     if (words.length <= 5) return text;
//     return words.slice(0, 5).join(" ") + "...";
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);
//     try {
//       const payload = {
//         userId: formData.userId,
//         articleId: formData.articleId || null,
//         comment: formData.comment,
//       };
//       const res = await updateComment(formData.id, payload);
//       if (res.status) {
//         toast.success("Comment updated successfully");
//         setShowModal(false);
//         fetchData();
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Update failed");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this comment?")) {
//       try {
//         const res = await deleteComment(id);
//         if (res.status) {
//           toast.success("Comment deleted");
//           fetchData();
//         }
//       } catch (error) {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   // Filtering Logic
//   const filteredComments = commentsList.filter((item) => {
//     const name = item.userId?.fullName?.toLowerCase() || "";
//     const email = item.userId?.email?.toLowerCase() || "";
//     const country = item.userId?.country?.toLowerCase() || "";
//     const search = searchTerm.toLowerCase();

//     // Text Search Filter
//     const matchesSearch =
//       name.includes(search) ||
//       email.includes(search) ||
//       country.includes(search);

//     // Date Range Filter
//     const commentDate = new Date(item.createdAt).setHours(0, 0, 0, 0);
//     const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
//     const end = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;

//     let matchesDate = true;
//     if (start && end) {
//       matchesDate = commentDate >= start && commentDate <= end;
//     } else if (start) {
//       matchesDate = commentDate >= start;
//     } else if (end) {
//       matchesDate = commentDate <= end;
//     }

//     return matchesSearch && matchesDate;
//   });

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredComments.slice(
//     indexOfFirstItem,
//     indexOfLastItem,
//   );

//   return (
//     <div className="bg-white p-3 p-md-4 rounded shadow-sm border">
//       {/* Header Section */}
//       <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
//         <div>
//           <h3 className="mb-0 fw-bold text-dark">User Comments</h3>
//           <p className="text-muted small mb-0">
//             Monitor and moderate all user discussions
//           </p>
//         </div>
//         <Badge bg="dark" className="px-3 py-2 fw-normal">
//           Total Records: {filteredComments.length}
//         </Badge>
//       </div>

//       {/* Filter Section */}
//       <Row className="mb-4 g-3">
//         <Col xs={12} lg={4}>
//           <Form.Group>
//             <Form.Label className="small fw-bold">Search</Form.Label>
//             <InputGroup>
//               <Form.Control
//                 placeholder="Name, Email or Country..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="shadow-none"
//               />
//             </InputGroup>
//           </Form.Group>
//         </Col>
//         <Col xs={6} lg={3}>
//           <Form.Group>
//             <Form.Label className="small fw-bold">From Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={startDate}
//               onChange={(e) => {
//                 setStartDate(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="shadow-none"
//             />
//           </Form.Group>
//         </Col>
//         <Col xs={6} lg={3}>
//           <Form.Group>
//             <Form.Label className="small fw-bold">To Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={endDate}
//               onChange={(e) => {
//                 setEndDate(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="shadow-none"
//             />
//           </Form.Group>
//         </Col>
//         <Col xs={12} lg={2} className="d-flex align-items-end">
//           <Button
//             variant="outline-secondary"
//             className="w-100"
//             onClick={() => {
//               setSearchTerm("");
//               setStartDate("");
//               setEndDate("");
//             }}
//           >
//             Clear
//           </Button>
//         </Col>
//       </Row>

//       {/* Table Section */}
//       <Table responsive hover className="mb-0 align-middle border-top">
//         <thead className="bg-light">
//           <tr>
//             <th className="py-3">S.No</th>
//             <th className="py-3">User Name</th>
//             <th className="py-3">Email ID</th>
//             <th className="py-3">Country</th>
//             <th className="py-3">Date</th>
//             <th className="py-3" style={{ minWidth: "150px" }}>
//               Comment
//             </th>
//             <th className="py-3 text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="7" className="text-center py-5">
//                 <Spinner animation="border" size="sm" variant="dark" />
//                 <span className="ms-2">Loading comments...</span>
//               </td>
//             </tr>
//           ) : currentItems.length > 0 ? (
//             currentItems.map((item, index) => (
//               <tr key={item._id}>
//                 <td>{String(indexOfFirstItem + index + 1).padStart(2, "0")}</td>
//                 <td className="fw-bold text-dark text-nowrap">
//                   {item.userId?.fullName || "Guest User"}
//                 </td>
//                 <td>{item.userId?.email || "N/A"}</td>
//                 <td className="text-capitalize text-nowrap">
//                   {item.userId?.country || "N/A"}
//                 </td>
//                 <td className="text-nowrap">
//                   {new Date(item.createdAt).toLocaleDateString("en-GB")}
//                 </td>
//                 <td className="text-muted small italic">
//                   {formatComment(item.comment)}
//                 </td>
//                 <td className="text-center text-nowrap">
//                   <Button
//                     variant="link"
//                     size="sm"
//                     className="text-decoration-none fw-bold me-2"
//                     onClick={() => {
//                       setFormData({
//                         id: item._id,
//                         userId: item.userId?._id || "",
//                         articleId: item.articleId?._id || "",
//                         comment: item.comment,
//                       });
//                       setShowModal(true);
//                     }}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="link"
//                     size="sm"
//                     className="text-danger text-decoration-none fw-bold"
//                     onClick={() => handleDelete(item._id)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" className="text-center py-5 text-muted">
//                 No comments found matching your filters.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {/* Pagination */}
//       <div className="mt-4">
//         <CustomPagination
//           current={currentPage}
//           totalItems={filteredComments.length}
//           itemsPerPage={itemsPerPage}
//           onPageChange={setCurrentPage}
//         />
//       </div>

//       {/* Update Modal */}
//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         centered
//         backdrop="static"
//       >
//         <Modal.Header closeButton className="border-0">
//           <Modal.Title className="h5 fw-bold">Update Comment</Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleEditSubmit}>
//           <Modal.Body className="px-4 pb-4">
//             <Row>
//               <Col md={12} className="mb-3">
//                 <Form.Label className="fw-bold small text-muted">
//                   Reference User ID
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={formData.userId}
//                   disabled
//                   className="bg-light border-0 small text-muted"
//                 />
//               </Col>
//               <Col md={12} className="mb-3">
//                 <Form.Label className="fw-bold small">
//                   Comment Description
//                 </Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={6}
//                   value={formData.comment}
//                   onChange={(e) =>
//                     setFormData({ ...formData, comment: e.target.value })
//                   }
//                   required
//                   placeholder="Type the updated comment content here..."
//                   className="border-secondary-subtle shadow-none"
//                 />
//               </Col>
//             </Row>
//           </Modal.Body>
//           <Modal.Footer className="border-0">
//             <Button
//               variant="light"
//               className="fw-bold"
//               onClick={() => setShowModal(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="dark"
//               type="submit"
//               className="px-4 fw-bold"
//               disabled={btnLoading}
//             >
//               {btnLoading ? "Saving..." : "Save Changes"}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Comments;
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Badge,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import CustomPagination from "../components/common/CustomPagination";
import {
  getAllComments,
  updateComment,
  deleteComment,
} from "../Services/adminService";

const Comments = () => {
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // State for viewing full comment
  const [viewFullComment, setViewFullComment] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    userId: "",
    articleId: "",
    comment: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllComments();
      if (res.status) {
        setCommentsList(res.comments || []);
      }
    } catch (error) {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  // Truncate logic for table display
  const formatComment = (text) => {
    if (!text) return "No content";
    const words = text.trim().split(/\s+/);
    if (words.length <= 15) return text; // Showing 15 words for better context
    return words.slice(0, 15).join(" ") + "...";
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const payload = {
        userId: formData.userId,
        articleId: formData.articleId || null,
        comment: formData.comment,
      };
      const res = await updateComment(formData.id, payload);
      if (res.status) {
        toast.success("Comment updated successfully");
        setShowModal(false);
        fetchData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        const res = await deleteComment(id);
        if (res.status) {
          toast.success("Comment deleted");
          fetchData();
        }
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  // Filtering Logic
  const filteredComments = commentsList.filter((item) => {
    const name = item.userId?.fullName?.toLowerCase() || "";
    const email = item.userId?.email?.toLowerCase() || "";
    const country = item.userId?.country?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      name.includes(search) ||
      email.includes(search) ||
      country.includes(search);

    const commentDate = new Date(item.createdAt).setHours(0, 0, 0, 0);
    const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
    const end = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;

    let matchesDate = true;
    if (start && end) {
      matchesDate = commentDate >= start && commentDate <= end;
    } else if (start) {
      matchesDate = commentDate >= start;
    } else if (end) {
      matchesDate = commentDate <= end;
    }

    return matchesSearch && matchesDate;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredComments.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div className="bg-white p-3 p-md-4 rounded shadow-sm border">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h3 className="mb-0 fw-bold text-dark">User Comments</h3>
          <p className="text-muted small mb-0">
            Monitor and moderate all user discussions
          </p>
        </div>
        <Badge bg="dark" className="px-3 py-2 fw-normal">
          Total Records: {filteredComments.length}
        </Badge>
      </div>

      {/* Filter Section */}
      <Row className="mb-4 g-3">
        <Col xs={12} lg={4}>
          <Form.Group>
            <Form.Label className="small fw-bold">Search</Form.Label>
            <InputGroup>
              <Form.Control
                placeholder="Name, Email or Country..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="shadow-none"
              />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col xs={6} lg={3}>
          <Form.Group>
            <Form.Label className="small fw-bold">From Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
              className="shadow-none"
            />
          </Form.Group>
        </Col>
        <Col xs={6} lg={3}>
          <Form.Group>
            <Form.Label className="small fw-bold">To Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
              className="shadow-none"
            />
          </Form.Group>
        </Col>
        <Col xs={12} lg={2} className="d-flex align-items-end">
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={() => {
              setSearchTerm("");
              setStartDate("");
              setEndDate("");
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>

      {/* Table Section */}
      <Table responsive hover className="mb-0 align-middle border-top">
        <thead className="bg-light">
          <tr>
            <th className="py-3">S.No</th>
            <th className="py-3">User Name</th>
            <th className="py-3">Email ID</th>
            <th className="py-3">Country</th>
            <th className="py-3">Date</th>
            <th className="py-3" style={{ minWidth: "250px" }}>
              Comment
            </th>
            <th className="py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-5">
                <Spinner animation="border" size="sm" variant="dark" />
                <span className="ms-2">Loading comments...</span>
              </td>
            </tr>
          ) : currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={item._id}>
                <td>{String(indexOfFirstItem + index + 1).padStart(2, "0")}</td>
                <td className="fw-bold text-dark text-nowrap">
                  {item.userId?.fullName || "Guest User"}
                </td>
                <td>{item.userId?.email || "N/A"}</td>
                <td className="text-capitalize text-nowrap">
                  {item.userId?.country || "N/A"}
                </td>
                <td className="text-nowrap">
                  {new Date(item.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td>
                  <div className="text-muted small italic">
                    {formatComment(item.comment)}
                    {item.comment && item.comment.split(/\s+/).length > 15 && (
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 ms-1 text-primary text-decoration-none fw-bold"
                        onClick={() => {
                          setViewFullComment(item.comment);
                          setShowViewModal(true);
                        }}
                      >
                        Read More
                      </Button>
                    )}
                  </div>
                </td>
                <td className="text-center text-nowrap">
                  <Button
                    variant="link"
                    size="sm"
                    className="text-decoration-none fw-bold me-2"
                    onClick={() => {
                      setFormData({
                        id: item._id,
                        userId: item.userId?._id || "",
                        articleId: item.articleId?._id || "",
                        comment: item.comment,
                      });
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-danger text-decoration-none fw-bold"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-5 text-muted">
                No comments found matching your filters.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="mt-4">
        <CustomPagination
          current={currentPage}
          totalItems={filteredComments.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Read More Modal (Fixed for long content) */}
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
        size="lg"
        scrollable
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="h5 fw-bold">Full Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light p-4 rounded m-3 border">
          <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {viewFullComment}
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="dark" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="h5 fw-bold">Update Comment</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body className="px-4 pb-4">
            <Row>
              <Col md={12} className="mb-3">
                <Form.Label className="fw-bold small text-muted">
                  Reference User ID
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.userId}
                  disabled
                  className="bg-light border-0 small text-muted shadow-none"
                />
              </Col>
              <Col md={12} className="mb-3">
                <Form.Label className="fw-bold small">
                  Comment Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={8}
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  required
                  placeholder="Type the updated comment content here..."
                  className="border-secondary-subtle shadow-none"
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button
              variant="light"
              className="fw-bold"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="dark"
              type="submit"
              className="px-4 fw-bold"
              disabled={btnLoading}
            >
              {btnLoading ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Comments;
