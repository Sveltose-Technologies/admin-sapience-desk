import React, { useState, useEffect } from "react";
import { Table, Badge, Button, Modal, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import TextEditor from "../components/common/TextEditor";
import CustomPagination from "../components/common/CustomPagination";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getFullImageUrl,
} from "../Services/adminService";

const Categories = () => {
  // --- States ---
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- Form States ---
  const [categoryName, setCategoryName] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("active");
  const [editId, setEditId] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState("");

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- HTML Cleanup for Table View ---
  const getShortNote = (htmlContent) => {
    if (!htmlContent) return "N/A";
    let plainText = htmlContent.replace(/<[^>]*>/g, "");
    plainText = plainText.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
    const words = plainText.trim().split(/\s+/);
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return plainText;
  };

  // --- Fetch Categories ---
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      console.log("Categories API Response:", res);
      if (res && res.status === true) {
        const sortedCategories = (res.categories || []).reverse(); // Reverse कर दिया
        setCategories(sortedCategories);
      }
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  // --- Handle Icon Upload ---
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, GIF, WebP)");
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setIconFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Remove Icon ---
  const handleRemoveIcon = () => {
    setIconFile(null);
    setIconPreview("");
  };

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  // --- Handlers ---
  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.warning("Category Name is required");
      return;
    }

    // FormData object create karein
    const formData = new FormData();
    formData.append("categoryName", categoryName.trim());
    formData.append("note", note);
    formData.append("status", status);

    // Agar icon file select ki hai to add karein
    if (iconFile) {
      formData.append("icon", iconFile);
    }

    try {
      let res;
      if (editId) {
        res = await updateCategory(editId, formData);
      } else {
        res = await createCategory(formData);
      }

      if (res && res.status === true) {
        toast.success(
          editId
            ? "Category Updated Successfully!"
            : "Category Created Successfully!",
        );
        handleClose();
        fetchCategories();
      } else {
        toast.error(res.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const res = await deleteCategory(id);
        if (res && res.status === true) {
          toast.success("Deleted Successfully!");
          fetchCategories();
        } else {
          toast.error(res?.message || "Delete failed");
        }
      } catch (error) {
        toast.error("Delete failed: " + error.message);
      }
    }
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setCategoryName(cat.categoryName);
    setNote(cat.note || "");
    setStatus(cat.status || "active");

    // Set icon preview using existing function
    if (cat.icon) {
      setIconPreview(getFullImageUrl(cat.icon));
    } else {
      setIconPreview("");
    }

    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setCategoryName("");
    setNote("");
    setStatus("active");
    setIconFile(null);
    setIconPreview("");
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Category List</h2>
        <Button variant="dark" onClick={() => setShow(true)}>
          + Create Category
        </Button>
      </div>

      <div className="bg-white p-3 rounded shadow-sm border">
        <Table responsive hover className="mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: "80px" }}>S.No</th>
              <th style={{ width: "200px" }}>Category Name</th>
              <th style={{ width: "250px" }}>Note</th>
              <th style={{ width: "120px" }}>Icon</th>
              <th style={{ width: "150px" }}>Date</th>
              <th style={{ width: "120px" }}>Status</th>
              <th style={{ width: "150px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-5">
                  <Spinner animation="border" size="sm" className="me-2" />
                  Loading Categories...
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((cat, index) => {
                const iconUrl = getFullImageUrl(cat.icon);

                return (
                  <tr key={cat._id || index}>
                    <td>
                      {String(indexOfFirstItem + index + 1).padStart(2, "0")}
                    </td>
                    <td className="fw-bold">{cat.categoryName}</td>
                    <td style={{ maxWidth: "250px", overflow: "hidden" }}>
                      <span title={cat.note?.replace(/<[^>]*>/g, "")}>
                        {getShortNote(cat.note)}
                      </span>
                    </td>
                    <td>
                      {cat.icon ? (
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            width: "60px",
                            height: "60px",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={iconUrl}
                            alt={cat.categoryName}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "6px",
                              border: "1px solid #dee2e6",
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/60x60?text=No+Image";
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          className="d-flex align-items-center justify-content-center text-muted"
                          style={{
                            width: "60px",
                            height: "60px",
                            border: "1px dashed #dee2e6",
                            borderRadius: "6px",
                            fontSize: "12px",
                          }}
                        >
                          No icon
                        </div>
                      )}
                    </td>
                    <td>{new Date(cat.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Badge
                        bg={cat.status === "active" ? "success" : "danger"}
                        className="px-3 py-2"
                        style={{ fontSize: "12px" }}
                      >
                        {cat.status === "active" ? "Active" : "Deactive"}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(cat)}
                          disabled={loading}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(cat._id)}
                          disabled={loading}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* --- Pagination --- */}
        {!loading && categories.length > 0 && (
          <CustomPagination
            current={currentPage}
            totalItems={categories.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      {/* --- Create / Edit Modal --- */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="border-bottom-0 pb-0">
          <Modal.Title className="h4 fw-bold">
            {editId ? "Update Category" : "Create New Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <Form>
            <div className="row mb-3">
              <div className="col-md-8">
                <Form.Group>
                  <Form.Label className="fw-bold">
                    Category Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Technology, Lifestyle, Business"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="py-2"
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group>
                  <Form.Label className="fw-bold">Status</Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="py-2"
                  >
                    <option value="active">Active</option>
                    <option value="deactive">Deactive</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            {/* --- Icon Upload Section --- */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Category Icon</Form.Label>
              <div className="d-flex align-items-start gap-3">
                <div>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleIconChange}
                    className="mb-2"
                  />
                  <Form.Text className="text-muted">
                    Recommended: Square image, max 5MB, PNG/JPG/WebP
                  </Form.Text>
                </div>
                {iconPreview && (
                  <div className="position-relative">
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        overflow: "hidden",
                        borderRadius: "8px",
                        border: "2px solid #dee2e6",
                      }}
                    >
                      <img
                        src={iconPreview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0 mt-1 me-1"
                      onClick={handleRemoveIcon}
                      style={{ padding: "2px 6px", fontSize: "12px" }}
                    >
                      ×
                    </Button>
                  </div>
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Description / Note</Form.Label>
              <TextEditor value={note} onChange={setNote} />
              <Form.Text className="text-muted">
                Optional: Add a detailed description for this category
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top-0 pt-0">
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark" className="px-4" onClick={handleSave}>
            {editId ? "Update Category" : "Create Category"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Categories;
