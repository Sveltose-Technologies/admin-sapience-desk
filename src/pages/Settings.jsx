// // import React, { useState, useEffect } from "react";
// // import {
// //   Card,
// //   Table,
// //   Button,
// //   Modal,
// //   Form,
// //   Tabs,
// //   Tab,
// //   Spinner,
// //   Alert,
// // } from "react-bootstrap";
// // import { toast } from "react-toastify";
// // import TextEditor from "../components/common/TextEditor";
// // import CustomPagination from "../components/common/CustomPagination";
// // import {
// //   getAllAboutUs,
// //   updateAboutUs,
// //   createAboutUs,
// //   deleteAboutUs,
// //   getAllContactUs,
// //   updateContactUs,
// //   deleteContactUs,
// //   getFullImageUrl,
// // } from "../Services/adminService";

// // const Settings = () => {
// //   const [activeTab, setActiveTab] = useState("about");
// //   const [showModal, setShowModal] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [btnLoading, setBtnLoading] = useState(false);
// //   const [editId, setEditId] = useState(null);

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 5;

// //   // --- Data States ---
// //   const [aboutList, setAboutList] = useState([]);
// //   const [contactList, setContactList] = useState([]);

// //   // Terms & Privacy ke liye static data
// //   const [termsData, setTermsData] = useState({
// //     _id: "static-terms",
// //     text: "<h3>Terms & Conditions</h3><p>Our terms and conditions are currently being prepared. Please check back soon for updates.</p><p>In the meantime, you can contact us if you have any questions.</p>",
// //     createdAt: new Date().toISOString(),
// //     updatedAt: new Date().toISOString(),
// //   });

// //   const [privacyData, setPrivacyData] = useState({
// //     _id: "static-privacy",
// //     text: "<h3>Privacy Policy</h3><p>Our privacy policy is under development. We are committed to protecting your data and will update this section shortly.</p><p>We value your privacy and will ensure transparent data practices.</p>",
// //     createdAt: new Date().toISOString(),
// //     updatedAt: new Date().toISOString(),
// //   });

// //   // --- Form States ---
// //   const [textData, setTextData] = useState("");
// //   const [imageFile, setImageFile] = useState(null);
// //   const [contactData, setContactData] = useState({
// //     name: "",
// //     email: "",
// //     subject: "",
// //     message: "",
// //   });

// //   // Terms & Privacy ke liye form state
// //   const [staticTextData, setStaticTextData] = useState("");

// //   // Helper functions
// //   const stripHtml = (html) => {
// //     if (!html) return "";
// //     const cleanText = html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
// //     return cleanText;
// //   };

// //   const formatDescription = (html, limit) => {
// //     const plainText = stripHtml(html);
// //     const words = plainText.split(/\s+/).filter((word) => word.length > 0);
// //     if (words.length <= limit) return plainText;
// //     return words.slice(0, limit).join(" ") + "...";
// //   };

// //   // Fetch data for About Us and Contact Us
// //   const fetchData = async () => {
// //     setLoading(true);
// //     try {
// //       if (activeTab === "about") {
// //         const res = await getAllAboutUs();
// //         console.log("About Us Response:", res);

// //         // API returns sections array directly from the fix
// //         if (Array.isArray(res)) {
// //           setAboutList(res);
// //         } else if (res && res.sections && Array.isArray(res.sections)) {
// //           setAboutList(res.sections);
// //         } else if (res && res.data && res.data.sections) {
// //           setAboutList(res.data.sections);
// //         } else {
// //           setAboutList([]);
// //         }
// //       } else if (activeTab === "contact") {
// //         const res = await getAllContactUs();
// //         console.log("Contact Us Response:", res);

// //         if (Array.isArray(res)) {
// //           setContactList(res);
// //         } else if (res && res.data) {
// //           setContactList(res.data);
// //         } else {
// //           setContactList([]);
// //         }
// //       }
// //       // Terms & Privacy static rahenge, fetch nahi karenge
// //     } catch (error) {
// //       console.error("Fetch error:", error);
// //       if (activeTab === "about") {
// //         toast.error("Failed to fetch About Us data");
// //         setAboutList([]);
// //       } else if (activeTab === "contact") {
// //         toast.error("Failed to fetch Contact Us data");
// //         setContactList([]);
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     setCurrentPage(1);
// //     if (activeTab === "about" || activeTab === "contact") {
// //       fetchData();
// //     }
// //   }, [activeTab]);

// //   // Modal handlers
// //   const handleOpenModal = (item = null) => {
// //     if (item) {
// //       setEditId(item._id);
// //       if (activeTab === "contact") {
// //         setContactData({
// //           name: item.name || "",
// //           email: item.email || "",
// //           subject: item.subject || "",
// //           message: item.message || "",
// //         });
// //       } else if (activeTab === "about") {
// //         setTextData(item.text || "");
// //       } else if (activeTab === "terms") {
// //         setStaticTextData(item.text || "");
// //       } else if (activeTab === "privacy") {
// //         setStaticTextData(item.text || "");
// //       }
// //     } else {
// //       setEditId(null);
// //       setTextData("");
// //       setImageFile(null);
// //       setStaticTextData("");
// //       setContactData({ name: "", email: "", subject: "", message: "" });
// //     }
// //     setShowModal(true);
// //   };

// //   const handleCloseModal = () => {
// //     setShowModal(false);
// //     setEditId(null);
// //     setImageFile(null);
// //     setStaticTextData("");
// //   };

// //   // Handle form submit
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setBtnLoading(true);

// //     try {
// //       if (activeTab === "about") {
// //         const formData = new FormData();
// //         formData.append("text", textData);
// //         if (imageFile) formData.append("image", imageFile);
// //         formData.append("mission", ""); // Add if needed

// //         let res;
// //         if (editId) {
// //           res = await updateAboutUs(editId, formData);
// //         } else {
// //           res = await createAboutUs(formData);
// //         }

// //         if (res && res.status !== false) {
// //           toast.success(
// //             editId ? "Updated Successfully" : "Created Successfully",
// //           );
// //           handleCloseModal();
// //           fetchData();
// //         } else {
// //           toast.error(res?.message || "Operation failed");
// //         }
// //       } else if (activeTab === "contact") {
// //         const contactFormData = {
// //           name: contactData.name,
// //           email: contactData.email,
// //           subject: contactData.subject,
// //           message: contactData.message,
// //         };

// //         if (editId) {
// //           const res = await updateContactUs(editId, contactFormData);
// //           if (res && res.status !== false) {
// //             toast.success("Contact Updated Successfully");
// //             handleCloseModal();
// //             fetchData();
// //           } else {
// //             toast.error(res?.message || "Operation failed");
// //           }
// //         }
// //       } else if (activeTab === "terms" || activeTab === "privacy") {
// //         // Static save - Just update local state
// //         if (activeTab === "terms") {
// //           setTermsData({
// //             ...termsData,
// //             text: staticTextData,
// //             updatedAt: new Date().toISOString(),
// //           });
// //         } else if (activeTab === "privacy") {
// //           setPrivacyData({
// //             ...privacyData,
// //             text: staticTextData,
// //             updatedAt: new Date().toISOString(),
// //           });
// //         }

// //         toast.success("Content saved locally");
// //         handleCloseModal();
// //       }
// //     } catch (error) {
// //       console.error("Submit error:", error);
// //       toast.error(error.response?.data?.message || "Operation failed");
// //     } finally {
// //       setBtnLoading(false);
// //     }
// //   };

// //   // Delete handler
// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this?")) {
// //       try {
// //         let res;
// //         if (activeTab === "about") {
// //           res = await deleteAboutUs(id);
// //         } else if (activeTab === "contact") {
// //           res = await deleteContactUs(id);
// //         }

// //         if (res) {
// //           toast.success("Deleted successfully");
// //           fetchData();
// //         }
// //       } catch (error) {
// //         toast.error("Delete failed");
// //       }
// //     }
// //   };

// //   // Render Static Content for Terms & Privacy
// //   const renderStaticContent = (data, type) => {
// //     return (
// //       <div className="bg-white p-4 rounded border mt-3">
// //         <div className="d-flex justify-content-between align-items-center mb-4">
// //           <h5 className="fw-bold mb-0 text-capitalize">{type}</h5>
// //           <Button
// //             variant="dark"
// //             size="sm"
// //             onClick={() => handleOpenModal(data)}>
// //             Edit Content
// //           </Button>
// //         </div>

// //         <Alert variant="info" className="mb-4">
// //           <i className="fas fa-info-circle me-2"></i>
// //           This is a static content section. The backend APIs for {type} are
// //           under development.
// //         </Alert>

// //         <div className="border p-4 rounded bg-light">
// //           <div
// //             className="static-content"
// //             dangerouslySetInnerHTML={{ __html: data.text }}
// //             style={{ minHeight: "200px" }}
// //           />

// //           <div className="mt-4 pt-3 border-top small text-muted">
// //             <div className="d-flex justify-content-between">
// //               <span>
// //                 <i className="far fa-calendar me-1"></i>
// //                 Created: {new Date(data.createdAt).toLocaleDateString()}
// //               </span>
// //               <span>
// //                 <i className="far fa-clock me-1"></i>
// //                 Last Updated: {new Date(data.updatedAt).toLocaleDateString()}
// //               </span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // Render Table for About Us and Contact Us
// //   const renderTable = (list, type) => {
// //     const safeList = Array.isArray(list) ? list : [];
// //     const indexOfLastItem = currentPage * itemsPerPage;
// //     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //     const currentItems = safeList.slice(indexOfFirstItem, indexOfLastItem);

// //     return (
// //       <div className="bg-white p-3 rounded border mt-3">
// //         <div className="d-flex justify-content-between align-items-center mb-3">
// //           <h5 className="fw-bold mb-0 text-capitalize">{type} List</h5>
// //           {activeTab === "about" && (
// //             <Button variant="dark" size="sm" onClick={() => handleOpenModal()}>
// //               + Create New
// //             </Button>
// //           )}
// //         </div>

// //         <Table responsive hover className="align-middle mb-0">
// //           <thead className="table-light">
// //             <tr style={{ fontSize: "0.85rem" }}>
// //               <th>S.No</th>
// //               {activeTab === "about" && <th>Image</th>}
// //               {activeTab === "contact" ? (
// //                 <>
// //                   <th>Name</th>
// //                   <th>Email</th>
// //                   <th>Subject</th>
// //                   <th>Message</th>
// //                 </>
// //               ) : (
// //                 <th>Description</th>
// //               )}
// //               <th>Date</th>
// //               <th className="text-center">Action</th>
// //             </tr>
// //           </thead>
// //           <tbody style={{ fontSize: "0.9rem" }}>
// //             {loading ? (
// //               <tr>
// //                 <td colSpan="7" className="text-center py-5">
// //                   <Spinner animation="border" size="sm" />
// //                 </td>
// //               </tr>
// //             ) : currentItems.length > 0 ? (
// //               currentItems.map((item, index) => (
// //                 <tr key={item._id} style={{ height: "70px" }}>
// //                   <td>
// //                     {String(indexOfFirstItem + index + 1).padStart(2, "0")}
// //                   </td>
// //                   {activeTab === "about" && (
// //                     <td>
// //                       <img
// //                         src={getFullImageUrl(item.image)}
// //                         alt="about"
// //                         width="60"
// //                         height="40"
// //                         className="rounded border shadow-sm"
// //                         style={{ objectFit: "cover" }}
// //                         onError={(e) => {
// //                           e.target.src =
// //                             "https://via.placeholder.com/50x40?text=NA";
// //                         }}
// //                       />
// //                     </td>
// //                   )}
// //                   {activeTab === "contact" ? (
// //                     <>
// //                       <td>{item.name}</td>
// //                       <td>{item.email}</td>
// //                       <td>{item.subject}</td>
// //                       <td>
// //                         <div style={{ maxWidth: "250px" }} title={item.message}>
// //                           {item.message && item.message.length > 50
// //                             ? `${item.message.substring(0, 50)}...`
// //                             : item.message}
// //                         </div>
// //                       </td>
// //                     </>
// //                   ) : (
// //                     <td>
// //                       <div
// //                         style={{ maxWidth: "450px", color: "#555" }}
// //                         title={stripHtml(item.text)}>
// //                         {formatDescription(item.text, 5)}
// //                       </div>
// //                     </td>
// //                   )}
// //                   <td>{new Date(item.createdAt).toLocaleDateString()}</td>
// //                   <td className="text-center">
// //                     <Button
// //                       variant="link"
// //                       size="sm"
// //                       className="fw-bold me-2 text-decoration-none"
// //                       onClick={() => handleOpenModal(item)}>
// //                       Edit
// //                     </Button>
// //                     <Button
// //                       variant="link"
// //                       size="sm"
// //                       className="text-danger fw-bold text-decoration-none"
// //                       onClick={() => handleDelete(item._id)}>
// //                       Delete
// //                     </Button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="7" className="text-center py-4 text-muted">
// //                   No data found.
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </Table>

// //         {safeList.length > itemsPerPage && (
// //           <div className="mt-4">
// //             <CustomPagination
// //               current={currentPage}
// //               totalItems={safeList.length}
// //               itemsPerPage={itemsPerPage}
// //               onPageChange={setCurrentPage}
// //             />
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="container-fluid py-4">
// //       <Card className="border-0 shadow-sm p-4">
// //         <h2 className="fw-bold mb-4 text-dark">General Settings</h2>
// //         <Tabs
// //           activeKey={activeTab}
// //           onSelect={(k) => setActiveTab(k)}
// //           className="custom-tabs border-bottom-0">
// //           <Tab eventKey="about" title="About Us">
// //             {renderTable(aboutList, "about us")}
// //           </Tab>
// //           <Tab eventKey="terms" title="Terms & Condition">
// //             {renderStaticContent(termsData, "Terms & Conditions")}
// //           </Tab>
// //           <Tab eventKey="privacy" title="Privacy Policy">
// //             {renderStaticContent(privacyData, "Privacy Policy")}
// //           </Tab>
// //           <Tab eventKey="contact" title="Contact Us">
// //             {renderTable(contactList, "contact us")}
// //           </Tab>
// //         </Tabs>

// //         {/* Modal for editing content */}
// //         <Modal
// //           show={showModal}
// //           onHide={handleCloseModal}
// //           size={activeTab === "contact" ? "md" : "lg"}
// //           centered
// //           backdrop="static">
// //           <Modal.Header closeButton className="border-0 pb-0">
// //             <Modal.Title className="fw-bold">
// //               {editId ? "Update" : activeTab === "about" ? "Create" : "Edit"}{" "}
// //               {activeTab.toUpperCase()}
// //             </Modal.Title>
// //           </Modal.Header>
// //           <Form onSubmit={handleSubmit}>
// //             <Modal.Body className="p-4">
// //               {/* About Us Fields */}
// //               {activeTab === "about" && (
// //                 <>
// //                   <Form.Group className="mb-4">
// //                     <Form.Label className="fw-bold small">
// //                       Featured Image {editId && "(Leave blank to keep current)"}
// //                     </Form.Label>
// //                     <Form.Control
// //                       type="file"
// //                       onChange={(e) => setImageFile(e.target.files[0])}
// //                       accept="image/*"
// //                     />
// //                   </Form.Group>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label className="fw-bold small">
// //                       Content Description
// //                     </Form.Label>
// //                     <TextEditor value={textData} onChange={setTextData} />
// //                   </Form.Group>
// //                 </>
// //               )}

// //               {/* Contact Us Fields */}
// //               {activeTab === "contact" && (
// //                 <>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label className="fw-bold small">Name</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       value={contactData.name}
// //                       onChange={(e) =>
// //                         setContactData({ ...contactData, name: e.target.value })
// //                       }
// //                     />
// //                   </Form.Group>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label className="fw-bold small">Email</Form.Label>
// //                     <Form.Control
// //                       type="email"
// //                       value={contactData.email}
// //                       onChange={(e) =>
// //                         setContactData({
// //                           ...contactData,
// //                           email: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   </Form.Group>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label className="fw-bold small">Subject</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       value={contactData.subject}
// //                       onChange={(e) =>
// //                         setContactData({
// //                           ...contactData,
// //                           subject: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   </Form.Group>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label className="fw-bold small">Message</Form.Label>
// //                     <Form.Control
// //                       as="textarea"
// //                       rows={4}
// //                       value={contactData.message}
// //                       onChange={(e) =>
// //                         setContactData({
// //                           ...contactData,
// //                           message: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   </Form.Group>
// //                 </>
// //               )}

// //               {/* Terms & Privacy Fields */}
// //               {(activeTab === "terms" || activeTab === "privacy") && (
// //                 <Form.Group className="mb-3">
// //                   <Form.Label className="fw-bold small">Content</Form.Label>
// //                   <TextEditor
// //                     value={staticTextData}
// //                     onChange={setStaticTextData}
// //                   />
// //                   <div className="text-muted small mt-2">
// //                     <i className="fas fa-info-circle me-1"></i>
// //                     This content is saved locally. Backend API is under
// //                     development.
// //                   </div>
// //                 </Form.Group>
// //               )}
// //             </Modal.Body>
// //             <Modal.Footer className="border-0 pt-0">
// //               <Button
// //                 variant="light"
// //                 className="fw-bold px-4"
// //                 onClick={handleCloseModal}>
// //                 Cancel
// //               </Button>
// //               <Button
// //                 variant="dark"
// //                 type="submit"
// //                 className="fw-bold px-4"
// //                 disabled={btnLoading}>
// //                 {btnLoading ? "Processing..." : "Save Changes"}
// //               </Button>
// //             </Modal.Footer>
// //           </Form>
// //         </Modal>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default Settings;

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Table,
//   Button,
//   Modal,
//   Form,
//   Tabs,
//   Tab,
//   Spinner,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import TextEditor from "../components/common/TextEditor";
// import {
//   getAllAboutUs,
//   updateAboutUs,
//   createAboutUs,
//   deleteAboutUs,
//   getFullImageUrl,
//   getAllContactUs,
//   updateContactUs,
//   createContactUs,
//   getAllTerms,
//   createTerms,
//   updateTerms,
//   deleteTerms,
//   getAllPrivacy,
//   createPrivacy,
//   updatePrivacy,
//   deletePrivacy,
// } from "../Services/adminService";

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState("about");
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [aboutList, setAboutList] = useState([]);
//   const [termsList, setTermsList] = useState([]);
//   const [privacyList, setPrivacyList] = useState([]);
//   const [contactContent, setContactContent] = useState({ _id: null, text: "" });

//   const [textData, setTextData] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   // Clean English Preview Logic
//   const getPreviewText = (html) => {
//     if (!html) return "No content";
//     const doc = new DOMParser().parseFromString(html, "text/html");
//     const plainText = doc.body.textContent || "";
//     const cleanText = plainText.replace(/\s+/g, " ").trim();
//     const words = cleanText.split(" ").filter((w) => w !== "");
//     return words.length <= 5 ? cleanText : words.slice(0, 5).join(" ") + "...";
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       if (activeTab === "about") {
//         const res = await getAllAboutUs();
//         setAboutList(res?.data?.sections || []);
//       } else if (activeTab === "terms") {
//         const res = await getAllTerms();
//         setTermsList(res?.data || []);
//       } else if (activeTab === "privacy") {
//         const res = await getAllPrivacy();
//         setPrivacyList(res?.data || []);
//       } else if (activeTab === "contact") {
//         const res = await getAllContactUs();
//         const data = Array.isArray(res?.data) ? res.data[0] : res.data;
//         setContactContent({ _id: data?._id || null, text: data?.text || "" });
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);

//   const handleOpenModal = (item = null) => {
//     if (item) {
//       setEditId(item._id);
//       setTextData(item.text || "");
//     } else {
//       setEditId(null);
//       setTextData("");
//       setImageFile(null);
//     }
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);
//     try {
//       let res;
//       if (activeTab === "about") {
//         const formData = new FormData();
//         formData.append("text", textData);
//         if (imageFile) formData.append("image", imageFile);
//         res = editId
//           ? await updateAboutUs(editId, formData)
//           : await createAboutUs(formData);
//       } else if (activeTab === "terms") {
//         res = editId
//           ? await updateTerms(editId, { text: textData })
//           : await createTerms({ text: textData });
//       } else if (activeTab === "privacy") {
//         res = editId
//           ? await updatePrivacy(editId, { text: textData })
//           : await createPrivacy({ text: textData });
//       }
//       if (res) {
//         toast.success("Saved Successfully");
//         setShowModal(false);
//         fetchData();
//       }
//     } catch (error) {
//       toast.error("Error saving data");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this item?")) return;
//     try {
//       if (activeTab === "about") await deleteAboutUs(id);
//       else if (activeTab === "terms") await deleteTerms(id);
//       else if (activeTab === "privacy") await deletePrivacy(id);
//       toast.success("Deleted");
//       fetchData();
//     } catch (error) {
//       toast.error("Delete failed");
//     }
//   };

//   const renderTable = (list, type) => (
//     <div className="bg-white p-3 rounded border mt-3">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="fw-bold mb-0">{type} Management</h5>
//         <Button variant="dark" size="sm" onClick={() => handleOpenModal()}>
//           + Add New
//         </Button>
//       </div>
//       <Table responsive hover className="align-middle mb-0">
//         <thead className="table-light">
//           <tr>
//             <th style={{ width: "70px" }}>S.NO</th>
//             {activeTab === "about" && <th>IMAGE</th>}
//             <th>DESCRIPTION</th>
//             <th className="text-center" style={{ width: "180px" }}>
//               ACTION
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="5" className="text-center">
//                 <Spinner size="sm" />
//               </td>
//             </tr>
//           ) : (
//             list.map((item, index) => (
//               <tr key={item._id}>
//                 <td>{index + 1}</td>
//                 {activeTab === "about" && (
//                   <td>
//                     <img
//                       src={getFullImageUrl(item.image)}
//                       width="50"
//                       height="35"
//                       className="rounded border"
//                       alt="img"
//                     />
//                   </td>
//                 )}
//                 <td className="text-dark fw-medium">
//                   {getPreviewText(item.text)}
//                 </td>
//                 <td className="text-center">
//                   <Button
//                     variant="link"
//                     className="text-decoration-none fw-bold me-2"
//                     onClick={() => handleOpenModal(item)}>
//                     Edit
//                   </Button>
//                   <Button
//                     variant="link"
//                     className="text-danger text-decoration-none fw-bold"
//                     onClick={() => handleDelete(item._id)}>
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>
//     </div>
//   );

//   return (
//     <div className="container-fluid py-4">
//       <Card className="border-0 shadow-sm p-4">
//         <h2 className="fw-bold mb-4">Settings</h2>
//         <Tabs
//           activeKey={activeTab}
//           onSelect={(k) => setActiveTab(k)}
//           className="custom-tabs">
//           <Tab eventKey="about" title="About Us">
//             {renderTable(aboutList, "About Us")}
//           </Tab>
//           <Tab eventKey="terms" title="Terms & Conditions">
//             {renderTable(termsList, "Terms")}
//           </Tab>
//           <Tab eventKey="privacy" title="Privacy Policy">
//             {renderTable(privacyList, "Privacy")}
//           </Tab>
//           <Tab eventKey="contact" title="Contact Us">
//             <div className="p-4 border rounded bg-white mt-3">
//               <TextEditor
//                 value={contactContent.text}
//                 onChange={(v) =>
//                   setContactContent({ ...contactContent, text: v })
//                 }
//               />
//               <Button
//                 variant="dark"
//                 className="mt-3"
//                 onClick={async () => {
//                   setBtnLoading(true);
//                   contactContent._id
//                     ? await updateContactUs(contactContent._id, {
//                         text: contactContent.text,
//                       })
//                     : await createContactUs({ text: contactContent.text });
//                   toast.success("Contact Updated");
//                   setBtnLoading(false);
//                   fetchData();
//                 }}
//                 disabled={btnLoading}>
//                 Update Contact
//               </Button>
//             </div>
//           </Tab>
//         </Tabs>
//       </Card>

//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         size="lg"
//         centered>
//         <Modal.Header closeButton className="fw-bold">
//           Manage Content
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             {activeTab === "about" && (
//               <Form.Group className="mb-3">
//                 <Form.Label>Image</Form.Label>
//                 <Form.Control
//                   type="file"
//                   onChange={(e) => setImageFile(e.target.files[0])}
//                 />
//               </Form.Group>
//             )}
//             <Form.Group>
//               <Form.Label>Description (English)</Form.Label>
//               <TextEditor value={textData} onChange={setTextData} />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="light" onClick={() => setShowModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="dark" type="submit" disabled={btnLoading}>
//               {btnLoading ? "Saving..." : "Save"}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Settings;
// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Table,
//   Button,
//   Modal,
//   Form,
//   Tabs,
//   Tab,
//   Spinner,
//   Alert,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import TextEditor from "../components/common/TextEditor";
// import {
//   getAllAboutUs,
//   updateAboutUs,
//   createAboutUs,
//   deleteAboutUs,
//   getFullImageUrl,
//   getAllContactUs,
//   updateContactUs,
//   createContactUs,
//   deleteContactUs, // AdminService mein ye method honi chahiye
//   getAllTerms,
//   createTerms,
//   updateTerms,
//   deleteTerms,
//   getAllPrivacy,
//   createPrivacy,
//   updatePrivacy,
//   deletePrivacy,
// } from "../Services/adminService";

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState("about");
//   const [loading, setLoading] = useState(false);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [aboutList, setAboutList] = useState([]);
//   const [termsList, setTermsList] = useState([]);
//   const [privacyList, setPrivacyList] = useState([]);

//   // Contact State
//   const [contactContent, setContactContent] = useState({ _id: null, text: "" });

//   const [textData, setTextData] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       if (activeTab === "about") {
//         const res = await getAllAboutUs();
//         setAboutList(res?.data?.sections || []);
//       } else if (activeTab === "terms") {
//         const res = await getAllTerms();
//         setTermsList(res?.data || []);
//       } else if (activeTab === "privacy") {
//         const res = await getAllPrivacy();
//         setPrivacyList(res?.data || []);
//       } else if (activeTab === "contact") {
//         const res = await getAllContactUs();
//         console.log("Contact GET API Response:", res.data);
//         const data = Array.isArray(res?.data) ? res.data[0] : res.data;

//         if (data && data._id) {
//           setContactContent({ _id: data._id, text: data.text || "" });
//         } else {
//           setContactContent({ _id: null, text: "" });
//         }
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);

//   // ==========================================
//   // CONTACT US LOGIC (POST, PUT, DELETE)
//   // ==========================================

//   const handleContactSave = async () => {
//     if (!contactContent.text) return toast.warn("Please enter text");

//     setBtnLoading(true);
//     try {
//       if (contactContent._id) {
//         // PUT LOGIC (Update)
//         console.log(
//           "Action: PUT (Update), ID:",
//           contactContent._id,
//           "Data:",
//           contactContent.text,
//         );
//         await updateContactUs(contactContent._id, {
//           text: contactContent.text,
//         });
//         toast.success("Contact Updated Successfully");
//       } else {
//         // POST LOGIC (Create)
//         console.log("Action: POST (Create), Data:", contactContent.text);
//         await createContactUs({ text: contactContent.text });
//         toast.success("Contact Created Successfully");
//       }
//       fetchData();
//     } catch (error) {
//       toast.error("Operation failed");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const handleContactDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete contact data?"))
//       return;

//     setBtnLoading(true);
//     try {
//       console.log("Action: DELETE, ID:", contactContent._id);
//       await deleteContactUs(contactContent._id);
//       toast.success("Contact Deleted Successfully");
//       setContactContent({ _id: null, text: "" });
//       fetchData();
//     } catch (error) {
//       toast.error("Delete failed");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   // ==========================================
//   // COMMON LOGIC (ABOUT, TERMS, PRIVACY)
//   // ==========================================

//   const handleOpenModal = (item = null) => {
//     if (item) {
//       setEditId(item._id);
//       setTextData(item.text || "");
//     } else {
//       setEditId(null);
//       setTextData("");
//       setImageFile(null);
//     }
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);
//     try {
//       let res;
//       if (activeTab === "about") {
//         const formData = new FormData();
//         formData.append("text", textData);
//         if (imageFile) formData.append("image", imageFile);
//         res = editId
//           ? await updateAboutUs(editId, formData)
//           : await createAboutUs(formData);
//       } else if (activeTab === "terms") {
//         res = editId
//           ? await updateTerms(editId, { text: textData })
//           : await createTerms({ text: textData });
//       } else if (activeTab === "privacy") {
//         res = editId
//           ? await updatePrivacy(editId, { text: textData })
//           : await createPrivacy({ text: textData });
//       }
//       if (res) {
//         toast.success("Saved Successfully");
//         setShowModal(false);
//         fetchData();
//       }
//     } catch (error) {
//       toast.error("Error saving data");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const getPreviewText = (html) => {
//     if (!html) return "No content";
//     const doc = new DOMParser().parseFromString(html, "text/html");
//     const plainText = doc.body.textContent || "";
//     const words = plainText.trim().split(/\s+/);
//     return words.length <= 5 ? plainText : words.slice(0, 5).join(" ") + "...";
//   };

//   const renderTable = (list, type) => (
//     <div className="bg-white p-3 rounded border mt-3">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="fw-bold mb-0">{type} Management</h5>
//         <Button variant="dark" size="sm" onClick={() => handleOpenModal()}>
//           + Add New
//         </Button>
//       </div>
//       <Table responsive hover className="align-middle mb-0">
//         <thead className="table-light">
//           <tr>
//             <th style={{ width: "70px" }}>S.NO</th>
//             {activeTab === "about" && <th>IMAGE</th>}
//             <th>DESCRIPTION</th>
//             <th className="text-center" style={{ width: "180px" }}>
//               ACTION
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="5" className="text-center">
//                 <Spinner size="sm" />
//               </td>
//             </tr>
//           ) : (
//             list.map((item, index) => (
//               <tr key={item._id}>
//                 <td>{index + 1}</td>
//                 {activeTab === "about" && (
//                   <td>
//                     <img
//                       src={getFullImageUrl(item.image)}
//                       width="50"
//                       height="35"
//                       className="rounded border"
//                       alt="img"
//                     />
//                   </td>
//                 )}
//                 <td className="text-dark fw-medium">
//                   {getPreviewText(item.text)}
//                 </td>
//                 <td className="text-center">
//                   <Button
//                     variant="link"
//                     className="text-decoration-none fw-bold me-2"
//                     onClick={() => handleOpenModal(item)}>
//                     Edit
//                   </Button>
//                   <Button
//                     variant="link"
//                     className="text-danger text-decoration-none fw-bold"
//                     onClick={async () => {
//                       if (!window.confirm("Delete?")) return;
//                       if (activeTab === "about") await deleteAboutUs(item._id);
//                       else if (activeTab === "terms")
//                         await deleteTerms(item._id);
//                       else if (activeTab === "privacy")
//                         await deletePrivacy(item._id);
//                       fetchData();
//                     }}>
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>
//     </div>
//   );

//   return (
//     <div className="container-fluid py-4">
//       <Card className="border-0 shadow-sm p-4">
//         <h2 className="fw-bold mb-4">Settings</h2>
//         <Tabs
//           activeKey={activeTab}
//           onSelect={(k) => setActiveTab(k)}
//           className="custom-tabs">
//           <Tab eventKey="about" title="About Us">
//             {renderTable(aboutList, "About Us")}
//           </Tab>
//           <Tab eventKey="terms" title="Terms & Conditions">
//             {renderTable(termsList, "Terms")}
//           </Tab>
//           <Tab eventKey="privacy" title="Privacy Policy">
//             {renderTable(privacyList, "Privacy")}
//           </Tab>

//           <Tab eventKey="contact" title="Contact Us">
//             <div className="p-4 border rounded bg-white mt-3">
//               {/* Data Empty Check */}
//               {!contactContent._id && !loading && (
//                 <Alert variant="info" className="fw-bold">
//                   Data is empty. Please enter details to create contact
//                   information.
//                 </Alert>
//               )}

//               <TextEditor
//                 value={contactContent.text}
//                 onChange={(v) =>
//                   setContactContent({ ...contactContent, text: v })
//                 }
//               />

//               <div className="mt-3 d-flex gap-2">
//                 {/* Create or Update Button based on _id */}
//                 <Button
//                   variant={contactContent._id ? "success" : "dark"}
//                   onClick={handleContactSave}
//                   disabled={btnLoading}>
//                   {btnLoading
//                     ? "Processing..."
//                     : contactContent._id
//                       ? "Update Contact "
//                       : "Create Contact"}
//                 </Button>

//                 {/* Delete Button - Only shows if data exists */}
//                 {contactContent._id && (
//                   <Button
//                     variant="danger"
//                     onClick={handleContactDelete}
//                     disabled={btnLoading}>
//                     Delete Contact
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </Tab>
//         </Tabs>
//       </Card>

//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         size="lg"
//         centered>
//         <Modal.Header closeButton className="fw-bold">
//           Manage Content
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             {activeTab === "about" && (
//               <Form.Group className="mb-3">
//                 <Form.Label>Image</Form.Label>
//                 <Form.Control
//                   type="file"
//                   onChange={(e) => setImageFile(e.target.files[0])}
//                 />
//               </Form.Group>
//             )}
//             <Form.Group>
//               <Form.Label>Description (English)</Form.Label>
//               <TextEditor value={textData} onChange={setTextData} />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="light" onClick={() => setShowModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="dark" type="submit" disabled={btnLoading}>
//               {btnLoading ? "Saving..." : "Save"}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Settings;
import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Tabs,
  Tab,
  Spinner,
  Alert,
} from "react-bootstrap";
import { toast } from "react-toastify";
import TextEditor from "../components/common/TextEditor";
import {
  getAllAboutUs,
  updateAboutUs,
  createAboutUs,
  deleteAboutUs,
  getFullImageUrl,
  getAllContactUs,
  updateContactUs,
  createContactUs,
  deleteContactUs,
  getAllTerms,
  createTerms,
  updateTerms,
  deleteTerms,
  getAllPrivacy,
  createPrivacy,
  updatePrivacy,
  deletePrivacy,
} from "../Services/adminService";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [aboutList, setAboutList] = useState([]);
  const [termsList, setTermsList] = useState([]);
  const [privacyList, setPrivacyList] = useState([]);

  // Contact State
  const [contactContent, setContactContent] = useState({ _id: null, text: "" });

  const [textData, setTextData] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "about") {
        const res = await getAllAboutUs();
        setAboutList(res?.data?.sections || []);
      } else if (activeTab === "terms") {
        const res = await getAllTerms();
        setTermsList(res?.data || []);
      } else if (activeTab === "privacy") {
        const res = await getAllPrivacy();
        setPrivacyList(res?.data || []);
      } else if (activeTab === "contact") {
        const res = await getAllContactUs();
        const data = Array.isArray(res?.data) ? res.data[0] : res.data;

        if (data && data._id) {
          setContactContent({ _id: data._id, text: data.text || "" });
        } else {
          setContactContent({ _id: null, text: "" });
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleContactSave = async () => {
    if (!contactContent.text) return toast.warn("Please enter text");
    setBtnLoading(true);
    try {
      if (contactContent._id) {
        await updateContactUs(contactContent._id, {
          text: contactContent.text,
        });
        toast.success("Contact Updated Successfully");
      } else {
        await createContactUs({ text: contactContent.text });
        toast.success("Contact Created Successfully");
      }
      fetchData();
    } catch (error) {
      toast.error("Operation failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleContactDelete = async () => {
    if (!window.confirm("Are you sure you want to delete contact data?"))
      return;
    setBtnLoading(true);
    try {
      await deleteContactUs(contactContent._id);
      toast.success("Contact Deleted Successfully");
      setContactContent({ _id: null, text: "" });
      fetchData();
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditId(item._id);
      setTextData(item.text || "");
    } else {
      setEditId(null);
      setTextData("");
      setImageFile(null);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      let res;
      if (activeTab === "about") {
        const formData = new FormData();
        formData.append("text", textData);
        if (imageFile) formData.append("image", imageFile);
        res = editId
          ? await updateAboutUs(editId, formData)
          : await createAboutUs(formData);
      } else if (activeTab === "terms") {
        res = editId
          ? await updateTerms(editId, { text: textData })
          : await createTerms({ text: textData });
      } else if (activeTab === "privacy") {
        res = editId
          ? await updatePrivacy(editId, { text: textData })
          : await createPrivacy({ text: textData });
      }
      if (res) {
        toast.success("Saved Successfully");
        setShowModal(false);
        fetchData();
      }
    } catch (error) {
      toast.error("Error saving data");
    } finally {
      setBtnLoading(false);
    }
  };

  const getPreviewText = (html) => {
    if (!html) return "No content";
    const doc = new DOMParser().parseFromString(html, "text/html");
    const plainText = doc.body.textContent || "";
    const words = plainText.trim().split(/\s+/);
    return words.length <= 5 ? plainText : words.slice(0, 5).join(" ") + "...";
  };

  const renderTable = (list, type) => (
    <div className="bg-white p-2 p-md-3 rounded border mt-3">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 gap-2">
        <h5 className="fw-bold mb-0">{type} Management</h5>
        <Button variant="dark" size="sm" onClick={() => handleOpenModal()}>
          + Add New
        </Button>
      </div>
      <div className="table-responsive">
        <Table hover className="align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ width: "70px" }}>S.NO</th>
              {activeTab === "about" && <th>IMAGE</th>}
              <th>DESCRIPTION</th>
              <th className="text-center" style={{ width: "180px" }}>
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  <Spinner size="sm" />
                </td>
              </tr>
            ) : list.length > 0 ? (
              list.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  {activeTab === "about" && (
                    <td>
                      <img
                        src={getFullImageUrl(item.image)}
                        width="50"
                        height="35"
                        className="rounded border"
                        alt="img"
                      />
                    </td>
                  )}
                  <td className="text-dark fw-medium">
                    {getPreviewText(item.text)}
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <Button
                        variant="link"
                        className="text-decoration-none fw-bold p-1"
                        onClick={() => handleOpenModal(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="link"
                        className="text-danger text-decoration-none fw-bold p-1"
                        onClick={async () => {
                          if (!window.confirm("Delete?")) return;
                          if (activeTab === "about")
                            await deleteAboutUs(item._id);
                          else if (activeTab === "terms")
                            await deleteTerms(item._id);
                          else if (activeTab === "privacy")
                            await deletePrivacy(item._id);
                          fetchData();
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-3">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* CSS to ensure tabs stay on one line and scroll on mobile */}
      <style>{`
            .responsive-tabs .nav-tabs {
                display: flex;
                flex-wrap: nowrap;
                overflow-x: auto;
                overflow-y: hidden;
                white-space: nowrap;
                border-bottom: 1px solid #dee2e6;
            }
            .responsive-tabs .nav-link {
                padding: 10px 15px;
            }
            .responsive-tabs::-webkit-scrollbar { display: none; }
        `}</style>

      <Card className="border-0 shadow-sm p-2 p-md-4">
        <h2 className="fw-bold mb-4 px-2 px-md-0">Settings</h2>

        <div className="responsive-tabs">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="custom-tabs"
          >
            <Tab eventKey="about" title="About Us">
              {renderTable(aboutList, "About Us")}
            </Tab>
            <Tab eventKey="terms" title="Terms & Conditions">
              {renderTable(termsList, "Terms")}
            </Tab>
            <Tab eventKey="privacy" title="Privacy Policy">
              {renderTable(privacyList, "Privacy")}
            </Tab>

            <Tab eventKey="contact" title="Contact Us">
              <div className="p-2 p-md-4 border rounded bg-white mt-3">
                {!contactContent._id && !loading && (
                  <Alert variant="info" className="fw-bold small">
                    Data is empty. Please enter details to create contact
                    information.
                  </Alert>
                )}

                <div className="editor-container overflow-hidden">
                  <TextEditor
                    value={contactContent.text}
                    onChange={(v) =>
                      setContactContent({ ...contactContent, text: v })
                    }
                  />
                </div>

                {/* Maintained the exact same button order and placement */}
                <div className="mt-3 d-flex flex-wrap gap-2">
                  <Button
                    variant={contactContent._id ? "success" : "dark"}
                    onClick={handleContactSave}
                    disabled={btnLoading}
                    className="flex-grow-1 flex-md-grow-0"
                  >
                    {btnLoading
                      ? "Processing..."
                      : contactContent._id
                        ? "Update Contact "
                        : "Create Contact"}
                  </Button>

                  {contactContent._id && (
                    <Button
                      variant="danger"
                      onClick={handleContactDelete}
                      disabled={btnLoading}
                      className="flex-grow-1 flex-md-grow-0"
                    >
                      Delete Contact
                    </Button>
                  )}
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </Card>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        fullscreen="sm-down"
      >
        <Modal.Header closeButton className="fw-bold">
          Manage Content
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {activeTab === "about" && (
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </Form.Group>
            )}
            <Form.Group>
              <Form.Label className="fw-bold">Description (English)</Form.Label>
              <TextEditor value={textData} onChange={setTextData} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="dark" type="submit" disabled={btnLoading}>
              {btnLoading ? "Saving..." : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Settings;
