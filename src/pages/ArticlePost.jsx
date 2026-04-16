// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Button,
//   Modal,
//   Form,
//   Row,
//   Col,
//   Badge,
//   Spinner,
//   Container,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import CustomPagination from "../components/common/CustomPagination";
// import {
//   getAllArticles,
//   createArticle,
//   updateArticle,
//   deleteArticle,
//   getAllCategories,
//   getAllSubCategories,
//   getFullImageUrl,
// } from "../Services/adminService";

// const ArticlePost = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [articles, setArticles] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   // --- Form States ---
//   const [editId, setEditId] = useState(null);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [subCategoryId, setSubCategoryId] = useState("");
//   const [videoLink, setVideoLink] = useState("");
//   const [featureImage, setFeatureImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [status, setStatus] = useState("active");
//   const [featured, setFeatured] = useState(false);

//   const limitTitle = (text) => {
//     if (!text) return "";
//     const words = text.split(" ");
//     return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : text;
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [artRes, catRes, subRes] = await Promise.all([
//         getAllArticles(),
//         getAllCategories(),
//         getAllSubCategories(),
//       ]);
//       if (artRes?.status) setArticles(artRes.articles || []);
//       if (catRes?.status) setCategories(catRes.categories || []);
//       if (subRes?.status) {
//         setSubCategories(subRes.data || subRes.subCategories || []);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleClose = () => {
//     setShowModal(false);
//     setEditId(null);
//     setTitle("");
//     setContent("");
//     setCategoryId("");
//     setSubCategoryId("");
//     setVideoLink("");
//     setFeatureImage(null);
//     setImagePreview("");
//     setStatus("active");
//     setFeatured(false);
//   };

//   const handleEdit = (item) => {
//     setEditId(item._id);
//     setTitle(item.title || "");
//     setContent(item.content || "");
//     setCategoryId(item.category?._id || item.category || "");
//     setSubCategoryId(item.subCategory?._id || item.subCategory || "");
//     setVideoLink(item.videoLink || "");
//     setStatus(item.status || "active");
//     setFeatured(item.featured === true || item.featured === "true");

//     if (item.featureImage) {
//       setImagePreview(getFullImageUrl(item.featureImage));
//     }

//     setFeatureImage(null);
//     setShowModal(true);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFeatureImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();
//     if (loading) return;

//     if (!title || !categoryId || !subCategoryId || !content) {
//       return toast.warning("Please fill all required fields");
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("title", title.trim());
//       formData.append("content", content);
//       formData.append("category", categoryId);
//       formData.append("subCategory", subCategoryId);
//       formData.append("videoLink", videoLink || "");
//       formData.append("status", status);
//       formData.append("featured", featured.toString());

//       if (featureImage) {
//         formData.append("featureImage", featureImage);
//       }

//       const res = editId
//         ? await updateArticle(editId, formData)
//         : await createArticle(formData);

//       if (res?.status) {
//         toast.success(
//           editId ? "Updated successfully ✅" : "Created successfully ✅",
//         );
//         handleClose();
//         fetchData();
//       } else {
//         toast.error(res?.message || "Operation failed ❌");
//       }
//     } catch (err) {
//       console.error("Submit Error:", err);
//       toast.error("Operation failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this article?")) {
//       try {
//         const res = await deleteArticle(id);
//         if (res?.status) {
//           toast.success("Deleted successfully");
//           fetchData();
//         }
//       } catch (error) {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   const handleCategoryChange = (val) => {
//     setCategoryId(val);
//     setSubCategoryId("");
//   };

//   const itemsPerPage = 10;
//   const currentItems = articles.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   return (
//     <Container fluid className="py-4">
//       <style>{`
//         .ck-editor__editable_inline { min-height: 250px; }
//         .image-preview-box {
//             width: 100%;
//             height: 150px;
//             border: 2px dashed #ddd;
//             border-radius: 8px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             overflow: hidden;
//             background: #f9f9f9;
//         }
//         .table-responsive {
//             border-radius: 8px;
//         }
//         @media (max-width: 768px) {
//             .header-stack {
//                 flex-direction: column;
//                 align-items: flex-start !important;
//                 gap: 15px;
//             }
//             .sidebar-border {
//                 border-left: none !important;
//                 border-top: 1px solid #dee2e6;
//                 padding-top: 20px;
//                 margin-top: 20px;
//             }
//         }
//       `}</style>

//       {/* Responsive Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4 header-stack">
//         <h2 className="fw-bold text-dark mb-0">Article Management</h2>
//         <Button
//           variant="dark"
//           className="px-4 shadow-sm w-sm-100"
//           onClick={() => setShowModal(true)}
//         >
//           + Create Article
//         </Button>
//       </div>

//       <div className="bg-white p-3 rounded shadow-sm border">
//         <div className="table-responsive">
//           <Table hover className="mb-0 align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th style={{ minWidth: "50px" }}>S.No</th>
//                 <th style={{ minWidth: "80px" }}>Image</th>
//                 <th style={{ minWidth: "150px" }}>Title</th>
//                 <th style={{ minWidth: "120px" }}>Category</th>
//                 <th style={{ minWidth: "120px" }}>Subcategory</th>
//                 <th style={{ minWidth: "100px" }}>Status</th>
//                 <th style={{ minWidth: "100px" }}>Featured</th>
//                 <th className="text-center" style={{ minWidth: "150px" }}>
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading && articles.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="text-center py-5">
//                     <Spinner animation="border" variant="dark" />
//                   </td>
//                 </tr>
//               ) : (
//                 currentItems.map((item, index) => (
//                   <tr key={item._id}>
//                     <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                     <td>
//                       <img
//                         src={getFullImageUrl(item.featureImage)}
//                         alt="article"
//                         width="55"
//                         height="40"
//                         className="rounded border"
//                         style={{ objectFit: "cover" }}
//                       />
//                     </td>
//                     <td className="fw-bold">{limitTitle(item.title)}</td>
//                     <td>
//                       <Badge bg="light" className="text-dark border">
//                         {item.category?.categoryName || "NA"}
//                       </Badge>
//                     </td>
//                     <td>
//                       <Badge bg="secondary">
//                         {item.subCategory?.subCategoryName || "None"}
//                       </Badge>
//                     </td>
//                     <td>
//                       <Badge
//                         bg={item.status === "active" ? "success" : "danger"}
//                       >
//                         {item.status}
//                       </Badge>
//                     </td>
//                     <td>
//                       {item.featured ? (
//                         <Badge bg="warning" className="text-dark">
//                           Featured
//                         </Badge>
//                       ) : (
//                         "No"
//                       )}
//                     </td>
//                     <td className="text-center">
//                       <div className="d-flex justify-content-center gap-2">
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           onClick={() => handleEdit(item)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           variant="outline-danger"
//                           size="sm"
//                           onClick={() => handleDelete(item._id)}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </Table>
//         </div>
//         <div className="mt-3">
//           <CustomPagination
//             current={currentPage}
//             totalItems={articles.length}
//             itemsPerPage={itemsPerPage}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       </div>

//       <Modal
//         show={showModal}
//         onHide={handleClose}
//         size="xl"
//         centered
//         backdrop="static"
//         fullscreen="lg-down" // Goes fullscreen on smaller devices for better UX
//       >
//         <Modal.Header closeButton className="bg-light">
//           <Modal.Title className="fw-bold">
//             {editId ? "Update" : "Create New"} Article
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="p-3 p-md-4">
//           <Form onSubmit={(e) => e.preventDefault()}>
//             <Row>
//               <Col lg={8}>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Article Title</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Content Body</Form.Label>
//                   <CKEditor
//                     editor={ClassicEditor}
//                     data={content}
//                     onChange={(event, editor) => setContent(editor.getData())}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col lg={4} className="sidebar-border border-start">
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Category</Form.Label>
//                   <Form.Select
//                     value={categoryId}
//                     onChange={(e) => handleCategoryChange(e.target.value)}
//                     required
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((cat) => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.categoryName}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Subcategory</Form.Label>
//                   <Form.Select
//                     value={subCategoryId}
//                     onChange={(e) => setSubCategoryId(e.target.value)}
//                     disabled={!categoryId}
//                     required
//                   >
//                     <option value="">Select Subcategory</option>
//                     {subCategories
//                       .filter(
//                         (sub) =>
//                           (sub.category?._id || sub.category) === categoryId,
//                       )
//                       .map((sub) => (
//                         <option key={sub._id} value={sub._id}>
//                           {sub.subCategoryName}
//                         </option>
//                       ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Feature Image</Form.Label>
//                   <div className="image-preview-box mb-2">
//                     {imagePreview ? (
//                       <img
//                         src={imagePreview}
//                         alt="Preview"
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                         }}
//                       />
//                     ) : (
//                       <span className="text-muted">No Image Selected</span>
//                     )}
//                   </div>
//                   <Form.Control
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Publishing Status</Form.Label>
//                   <Form.Select
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value)}
//                   >
//                     <option value="active">Active</option>
//                     <option value="deactive">Deactive</option>
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3 d-flex align-items-center">
//                   <Form.Check
//                     type="switch"
//                     id="featured-switch"
//                     label="Mark as Featured"
//                     checked={featured}
//                     onChange={(e) => setFeatured(e.target.checked)}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Video Link</Form.Label>
//                   <Form.Control
//                     type="url"
//                     placeholder="https://youtube.com/..."
//                     value={videoLink}
//                     onChange={(e) => setVideoLink(e.target.value)}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer className="bg-light flex-column flex-sm-row">
//           <Button
//             variant="secondary"
//             className="w-100 w-sm-auto mb-2 mb-sm-0"
//             onClick={handleClose}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="dark"
//             className="px-4 shadow-sm w-100 w-sm-auto"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? (
//               <Spinner animation="border" size="sm" />
//             ) : editId ? (
//               "Update Article"
//             ) : (
//               "Save Article"
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default ArticlePost;
// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Button,
//   Modal,
//   Form,
//   Row,
//   Col,
//   Badge,
//   Spinner,
//   Container,
//   InputGroup,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import CustomPagination from "../components/common/CustomPagination";
// import {
//   getAllArticles,
//   createArticle,
//   updateArticle,
//   deleteArticle,
//   getAllCategories,
//   getAllSubCategories,
//   getFullImageUrl,
// } from "../Services/adminService";

// const ArticlePost = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [articles, setArticles] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   // --- Filter States ---
//   const [searchTerm, setSearchTerm] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // --- Form States ---
//   const [editId, setEditId] = useState(null);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [subCategoryId, setSubCategoryId] = useState("");
//   const [videoLink, setVideoLink] = useState("");
//   const [featureImage, setFeatureImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [status, setStatus] = useState("active");
//   const [featured, setFeatured] = useState(false);

//   const limitTitle = (text) => {
//     if (!text) return "";
//     const words = text.split(" ");
//     return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : text;
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [artRes, catRes, subRes] = await Promise.all([
//         getAllArticles(),
//         getAllCategories(),
//         getAllSubCategories(),
//       ]);
//       if (artRes?.status) setArticles(artRes.articles || []);
//       if (catRes?.status) setCategories(catRes.categories || []);
//       if (subRes?.status) {
//         setSubCategories(subRes.data || subRes.subCategories || []);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleClose = () => {
//     setShowModal(false);
//     setEditId(null);
//     setTitle("");
//     setContent("");
//     setCategoryId("");
//     setSubCategoryId("");
//     setVideoLink("");
//     setFeatureImage(null);
//     setImagePreview("");
//     setStatus("active");
//     setFeatured(false);
//   };

//   const handleEdit = (item) => {
//     setEditId(item._id);
//     setTitle(item.title || "");
//     setContent(item.content || "");
//     setCategoryId(item.category?._id || item.category || "");
//     setSubCategoryId(item.subCategory?._id || item.subCategory || "");
//     setVideoLink(item.videoLink || "");
//     setStatus(item.status || "active");
//     setFeatured(item.featured === true || item.featured === "true");

//     if (item.featureImage) {
//       setImagePreview(getFullImageUrl(item.featureImage));
//     }

//     setFeatureImage(null);
//     setShowModal(true);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFeatureImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();
//     if (loading) return;

//     if (!title || !categoryId || !subCategoryId || !content) {
//       return toast.warning("Please fill all required fields");
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("title", title.trim());
//       formData.append("content", content);
//       formData.append("category", categoryId);
//       formData.append("subCategory", subCategoryId);
//       formData.append("videoLink", videoLink || "");
//       formData.append("status", status);
//       formData.append("featured", featured.toString());

//       if (featureImage) {
//         formData.append("featureImage", featureImage);
//       }

//       const res = editId
//         ? await updateArticle(editId, formData)
//         : await createArticle(formData);

//       if (res?.status) {
//         toast.success(
//           editId ? "Updated successfully ✅" : "Created successfully ✅",
//         );
//         handleClose();
//         fetchData();
//       } else {
//         toast.error(res?.message || "Operation failed ❌");
//       }
//     } catch (err) {
//       console.error("Submit Error:", err);
//       toast.error("Operation failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this article?")) {
//       try {
//         const res = await deleteArticle(id);
//         if (res?.status) {
//           toast.success("Deleted successfully");
//           fetchData();
//         }
//       } catch (error) {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   const handleCategoryChange = (val) => {
//     setCategoryId(val);
//     setSubCategoryId("");
//   };

//   // --- Filtering Logic ---
//   const filteredArticles = articles.filter((item) => {
//     const titleMatch = (item.title || "")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const categoryMatch = (item.category?.categoryName || "")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());

//     const articleDate = new Date(item.createdAt).setHours(0, 0, 0, 0);
//     const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
//     const end = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;

//     let dateMatch = true;
//     if (start && end) {
//       dateMatch = articleDate >= start && articleDate <= end;
//     } else if (start) {
//       dateMatch = articleDate >= start;
//     } else if (end) {
//       dateMatch = articleDate <= end;
//     }

//     return (titleMatch || categoryMatch) && dateMatch;
//   });

//   const itemsPerPage = 10;
//   const currentItems = filteredArticles.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   return (
//     <Container fluid className="py-4">
//       <style>{`
//         .ck-editor__editable_inline { min-height: 250px; }
//         .image-preview-box {
//             width: 100%;
//             height: 150px;
//             border: 2px dashed #ddd;
//             border-radius: 8px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             overflow: hidden;
//             background: #f9f9f9;
//         }
//         .table-responsive {
//             border-radius: 8px;
//         }
//         @media (max-width: 768px) {
//             .header-stack {
//                 flex-direction: column;
//                 align-items: flex-start !important;
//                 gap: 15px;
//             }
//             .sidebar-border {
//                 border-left: none !important;
//                 border-top: 1px solid #dee2e6;
//                 padding-top: 20px;
//                 margin-top: 20px;
//             }
//         }
//       `}</style>

//       {/* Responsive Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4 header-stack">
//         <h2 className="fw-bold text-dark mb-0">Article Management</h2>
//         <Button
//           variant="dark"
//           className="px-4 shadow-sm w-sm-100"
//           onClick={() => setShowModal(true)}
//         >
//           + Create Article
//         </Button>
//       </div>

//       {/* Responsive Filter Section */}
//       <div className="bg-white p-3 rounded shadow-sm border mb-4">
//         <Row className="g-3">
//           <Col xs={12} md={4} lg={5}>
//             <Form.Group>
//               <Form.Label className="small fw-bold">Search Articles</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Search by title, category..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               />
//             </Form.Group>
//           </Col>
//           <Col xs={6} md={3} lg={2}>
//             <Form.Group>
//               <Form.Label className="small fw-bold">From Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => {
//                   setStartDate(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               />
//             </Form.Group>
//           </Col>
//           <Col xs={6} md={3} lg={2}>
//             <Form.Group>
//               <Form.Label className="small fw-bold">To Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => {
//                   setEndDate(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               />
//             </Form.Group>
//           </Col>
//           <Col xs={12} md={2} lg={3} className="d-flex align-items-end">
//             <Button
//               variant="outline-secondary"
//               className="w-100"
//               onClick={() => {
//                 setSearchTerm("");
//                 setStartDate("");
//                 setEndDate("");
//               }}
//             >
//               Clear Filters
//             </Button>
//           </Col>
//         </Row>
//       </div>

//       <div className="bg-white p-3 rounded shadow-sm border">
//         <div className="table-responsive">
//           <Table hover className="mb-0 align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th style={{ minWidth: "50px" }}>S.No</th>
//                 <th style={{ minWidth: "80px" }}>Image</th>
//                 <th style={{ minWidth: "150px" }}>Title</th>
//                 <th style={{ minWidth: "120px" }}>Category</th>
//                 <th style={{ minWidth: "120px" }}>Subcategory</th>
//                 <th style={{ minWidth: "100px" }}>Status</th>
//                 <th style={{ minWidth: "100px" }}>Featured</th>
//                 <th className="text-center" style={{ minWidth: "150px" }}>
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading && articles.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="text-center py-5">
//                     <Spinner animation="border" variant="dark" />
//                   </td>
//                 </tr>
//               ) : currentItems.length > 0 ? (
//                 currentItems.map((item, index) => (
//                   <tr key={item._id}>
//                     <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                     <td>
//                       <img
//                         src={getFullImageUrl(item.featureImage)}
//                         alt="article"
//                         width="55"
//                         height="40"
//                         className="rounded border"
//                         style={{ objectFit: "cover" }}
//                       />
//                     </td>
//                     <td className="fw-bold">{limitTitle(item.title)}</td>
//                     <td>
//                       <Badge bg="light" className="text-dark border">
//                         {item.category?.categoryName || "NA"}
//                       </Badge>
//                     </td>
//                     <td>
//                       <Badge bg="secondary">
//                         {item.subCategory?.subCategoryName || "None"}
//                       </Badge>
//                     </td>
//                     <td>
//                       <Badge
//                         bg={item.status === "active" ? "success" : "danger"}
//                       >
//                         {item.status}
//                       </Badge>
//                     </td>
//                     <td>
//                       {item.featured ? (
//                         <Badge bg="warning" className="text-dark">
//                           Featured
//                         </Badge>
//                       ) : (
//                         "No"
//                       )}
//                     </td>
//                     <td className="text-center">
//                       <div className="d-flex justify-content-center gap-2">
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           onClick={() => handleEdit(item)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           variant="outline-danger"
//                           size="sm"
//                           onClick={() => handleDelete(item._id)}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="text-center py-5 text-muted">
//                     No articles found matching your filters.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//         <div className="mt-3">
//           <CustomPagination
//             current={currentPage}
//             totalItems={filteredArticles.length}
//             itemsPerPage={itemsPerPage}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       </div>

//       <Modal
//         show={showModal}
//         onHide={handleClose}
//         size="xl"
//         centered
//         backdrop="static"
//         fullscreen="lg-down"
//       >
//         <Modal.Header closeButton className="bg-light">
//           <Modal.Title className="fw-bold">
//             {editId ? "Update" : "Create New"} Article
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="p-3 p-md-4">
//           <Form onSubmit={(e) => e.preventDefault()}>
//             <Row>
//               <Col lg={8}>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Article Title</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Content Body</Form.Label>
//                   <CKEditor
//                     editor={ClassicEditor}
//                     data={content}
//                     onChange={(event, editor) => setContent(editor.getData())}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col lg={4} className="sidebar-border border-start">
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Category</Form.Label>
//                   <Form.Select
//                     value={categoryId}
//                     onChange={(e) => handleCategoryChange(e.target.value)}
//                     required
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((cat) => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.categoryName}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Subcategory</Form.Label>
//                   <Form.Select
//                     value={subCategoryId}
//                     onChange={(e) => setSubCategoryId(e.target.value)}
//                     disabled={!categoryId}
//                     required
//                   >
//                     <option value="">Select Subcategory</option>
//                     {subCategories
//                       .filter(
//                         (sub) =>
//                           (sub.category?._id || sub.category) === categoryId,
//                       )
//                       .map((sub) => (
//                         <option key={sub._id} value={sub._id}>
//                           {sub.subCategoryName}
//                         </option>
//                       ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Feature Image</Form.Label>
//                   <div className="image-preview-box mb-2">
//                     {imagePreview ? (
//                       <img
//                         src={imagePreview}
//                         alt="Preview"
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                         }}
//                       />
//                     ) : (
//                       <span className="text-muted">No Image Selected</span>
//                     )}
//                   </div>
//                   <Form.Control
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Publishing Status</Form.Label>
//                   <Form.Select
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value)}
//                   >
//                     <option value="active">Active</option>
//                     <option value="deactive">Deactive</option>
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3 d-flex align-items-center">
//                   <Form.Check
//                     type="switch"
//                     id="featured-switch"
//                     label="Mark as Featured"
//                     checked={featured}
//                     onChange={(e) => setFeatured(e.target.checked)}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Video Link</Form.Label>
//                   <Form.Control
//                     type="url"
//                     placeholder="https://youtube.com/..."
//                     value={videoLink}
//                     onChange={(e) => setVideoLink(e.target.value)}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer className="bg-light flex-column flex-sm-row">
//           <Button
//             variant="secondary"
//             className="w-100 w-sm-auto mb-2 mb-sm-0"
//             onClick={handleClose}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="dark"
//             className="px-4 shadow-sm w-100 w-sm-auto"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? (
//               <Spinner animation="border" size="sm" />
//             ) : editId ? (
//               "Update Article"
//             ) : (
//               "Save Article"
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default ArticlePost;
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Badge,
  Spinner,
  Container,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import CustomPagination from "../components/common/CustomPagination";
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getAllCategories,
  getAllSubCategories,
  getFullImageUrl,
} from "../Services/adminService";

const ArticlePost = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // --- Filter States ---
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // --- Form States ---
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(""); // 1. Added Author State
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [featureImage, setFeatureImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [status, setStatus] = useState("active");
  const [featured, setFeatured] = useState(false);

  const limitTitle = (text) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : text;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [artRes, catRes, subRes] = await Promise.all([
        getAllArticles(),
        getAllCategories(),
        getAllSubCategories(),
      ]);
      if (artRes?.status) setArticles(artRes.articles || []);
      if (catRes?.status) setCategories(catRes.categories || []);
      if (subRes?.status) {
        setSubCategories(subRes.data || subRes.subCategories || []);
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setEditId(null);
    setTitle("");
    setAuthor(""); // 2. Reset Author State
    setContent("");
    setCategoryId("");
    setSubCategoryId("");
    setVideoLink("");
    setFeatureImage(null);
    setImagePreview("");
    setStatus("active");
    setFeatured(false);
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setTitle(item.title || "");
    setAuthor(item.author || ""); // 3. Populate Author State for editing
    setContent(item.content || "");
    setCategoryId(item.category?._id || item.category || "");
    setSubCategoryId(item.subCategory?._id || item.subCategory || "");
    setVideoLink(item.videoLink || "");
    setStatus(item.status || "active");
    setFeatured(item.featured === true || item.featured === "true");

    if (item.featureImage) {
      setImagePreview(getFullImageUrl(item.featureImage));
    }

    setFeatureImage(null);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeatureImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (loading) return;

    if (!title || !categoryId || !subCategoryId || !content) {
      return toast.warning("Please fill all required fields");
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("author", author.trim());
      formData.append("content", content);
      formData.append("category", categoryId);
      formData.append("subCategory", subCategoryId);
      formData.append("videoLink", videoLink || "");
      formData.append("status", status);
      formData.append("featured", featured.toString());

      if (featureImage) {
        formData.append("featureImage", featureImage);
      }

      const res = editId
        ? await updateArticle(editId, formData)
        : await createArticle(formData);

      if (res?.status) {
        toast.success(
          editId ? "Updated successfully ✅" : "Created successfully ✅",
        );
        handleClose();
        fetchData();
      } else {
        toast.error(res?.message || "Operation failed ❌");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Operation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this article?")) {
      try {
        const res = await deleteArticle(id);
        if (res?.status) {
          toast.success("Deleted successfully");
          fetchData();
        }
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const handleCategoryChange = (val) => {
    setCategoryId(val);
    setSubCategoryId("");
  };

  // --- Filtering Logic ---
  const filteredArticles = articles.filter((item) => {
    const titleMatch = (item.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch = (item.category?.categoryName || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const articleDate = new Date(item.createdAt).setHours(0, 0, 0, 0);
    const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
    const end = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;

    let dateMatch = true;
    if (start && end) {
      dateMatch = articleDate >= start && articleDate <= end;
    } else if (start) {
      dateMatch = articleDate >= start;
    } else if (end) {
      dateMatch = articleDate <= end;
    }

    return (titleMatch || categoryMatch) && dateMatch;
  });

  const itemsPerPage = 10;
  const currentItems = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Container fluid className="py-4">
      <style>{`
        .ck-editor__editable_inline { min-height: 250px; }
        .image-preview-box {
            width: 100%;
            height: 150px;
            border: 2px dashed #ddd;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background: #f9f9f9;
        }
        .table-responsive {
            border-radius: 8px;
        }
        @media (max-width: 768px) {
            .header-stack {
                flex-direction: column;
                align-items: flex-start !important;
                gap: 15px;
            }
            .sidebar-border {
                border-left: none !important;
                border-top: 1px solid #dee2e6;
                padding-top: 20px;
                margin-top: 20px;
            }
        }
      `}</style>

      {/* Responsive Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 header-stack">
        <h2 className="fw-bold text-dark mb-0">Article Management</h2>
        <Button
          variant="dark"
          className="px-4 shadow-sm w-sm-100"
          onClick={() => setShowModal(true)}
        >
          + Create Article
        </Button>
      </div>

      {/* Responsive Filter Section */}
      <div className="bg-white p-3 rounded shadow-sm border mb-4">
        <Row className="g-3">
          <Col xs={12} md={4} lg={5}>
            <Form.Group>
              <Form.Label className="small fw-bold">Search Articles</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by title, category..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </Form.Group>
          </Col>
          <Col xs={6} md={3} lg={2}>
            <Form.Group>
              <Form.Label className="small fw-bold">From Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </Form.Group>
          </Col>
          <Col xs={6} md={3} lg={2}>
            <Form.Group>
              <Form.Label className="small fw-bold">To Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={2} lg={3} className="d-flex align-items-end">
            <Button
              variant="outline-secondary"
              className="w-100"
              onClick={() => {
                setSearchTerm("");
                setStartDate("");
                setEndDate("");
              }}
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </div>

      <div className="bg-white p-3 rounded shadow-sm border">
        <div className="table-responsive">
          <Table hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ minWidth: "50px" }}>S.No</th>
                <th style={{ minWidth: "80px" }}>Image</th>
                <th style={{ minWidth: "150px" }}>Title</th>
                <th style={{ minWidth: "120px" }}>Category</th>
                <th style={{ minWidth: "120px" }}>Subcategory</th>
                <th style={{ minWidth: "100px" }}>Status</th>
                <th style={{ minWidth: "100px" }}>Featured</th>
                <th className="text-center" style={{ minWidth: "150px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && articles.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    <Spinner animation="border" variant="dark" />
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      <img
                        src={getFullImageUrl(item.featureImage)}
                        alt="article"
                        width="55"
                        height="40"
                        className="rounded border"
                        style={{ objectFit: "cover" }}
                      />
                    </td>
                    <td className="fw-bold">{limitTitle(item.title)}</td>
                    <td>
                      <Badge bg="light" className="text-dark border">
                        {item.category?.categoryName || "NA"}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg="secondary">
                        {item.subCategory?.subCategoryName || "None"}
                      </Badge>
                    </td>
                    <td>
                      <Badge
                        bg={item.status === "active" ? "success" : "danger"}
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td>
                      {item.featured ? (
                        <Badge bg="warning" className="text-dark">
                          Featured
                        </Badge>
                      ) : (
                        "No"
                      )}
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-muted">
                    No articles found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="mt-3">
          <CustomPagination
            current={currentPage}
            totalItems={filteredArticles.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        size="xl"
        centered
        backdrop="static"
        fullscreen="lg-down"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-bold">
            {editId ? "Update" : "Create New"} Article
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 p-md-4">
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col lg={8}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Article Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* 5. Added Author Input Field */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Author Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter author name..."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Content Body</Form.Label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => setContent(editor.getData())}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} className="sidebar-border border-start">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Category</Form.Label>
                  <Form.Select
                    value={categoryId}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Subcategory</Form.Label>
                  <Form.Select
                    value={subCategoryId}
                    onChange={(e) => setSubCategoryId(e.target.value)}
                    disabled={!categoryId}
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {subCategories
                      .filter(
                        (sub) =>
                          (sub.category?._id || sub.category) === categoryId,
                      )
                      .map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.subCategoryName}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Feature Image</Form.Label>
                  <div className="image-preview-box mb-2">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span className="text-muted">No Image Selected</span>
                    )}
                  </div>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Publishing Status</Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="deactive">Deactive</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 d-flex align-items-center">
                  <Form.Check
                    type="switch"
                    id="featured-switch"
                    label="Mark as Featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Video Link</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://youtube.com/..."
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-light flex-column flex-sm-row">
          <Button
            variant="secondary"
            className="w-100 w-sm-auto mb-2 mb-sm-0"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="dark"
            className="px-4 shadow-sm w-100 w-sm-auto"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : editId ? (
              "Update Article"
            ) : (
              "Save Article"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ArticlePost;
