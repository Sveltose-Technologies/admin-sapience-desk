import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { toast } from "react-toastify";
import TextEditor from "../components/common/TextEditor";
import CustomPagination from "../components/common/CustomPagination";
import {
  getAllCategories,
  getAllSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryById,
  getFullImageUrl,
} from "../Services/adminService";

const SubCategories = () => {
  const [show, setShow] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // States
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [note, setNote] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState("");
  const [editId, setEditId] = useState(null);
  const [editorKey, setEditorKey] = useState(Date.now());
  const [refreshKey, setRefreshKey] = useState(Date.now());

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catRes, subCatRes] = await Promise.all([
        getAllCategories(),
        getAllSubCategories(),
      ]);
      if (catRes?.status) setCategories(catRes.categories || []);
      if (subCatRes?.status) setSubCategories((subCatRes.data || []).reverse());
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!subCategoryName.trim() || !categoryId) {
      toast.warning("Category and Name are required");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("subCategoryName", subCategoryName.trim());
      formData.append("category", categoryId);
      formData.append("note", note || "");

      if (iconFile) {
        formData.append("icon", iconFile);
      }

      const res = editId
        ? await updateSubCategory(editId, formData)
        : await createSubCategory(formData);

      if (res?.status) {
        toast.success("Successfully Saved!");
        setRefreshKey(Date.now());
        handleClose();
        fetchData();
      }
    } catch (error) {
      toast.error("Save failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (sub) => {
    setLoading(true);
    try {
      const res = await getSubCategoryById(sub._id);
      if (res?.status) {
        const fullData = res.data;
        setEditId(fullData._id);
        setSubCategoryName(fullData.subCategoryName || "");
        setCategoryId(fullData.category?._id || fullData.category || "");
        setNote(fullData.note || "");
        setIconPreview(fullData.icon ? getFullImageUrl(fullData.icon) : "");
        setEditorKey(Date.now());
        setShow(true);
      }
    } catch (error) {
      toast.error("Failed to load details");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setSubCategoryName("");
    setCategoryId("");
    setNote("");
    setIconFile(null);
    setIconPreview("");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subCategories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container fluid className="py-4">
      {/* Header section - stacks on mobile */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <h2 className="fw-bold mb-0">Sub-Category List</h2>
        <Button
          variant="dark"
          className="px-4 py-2"
          onClick={() => {
            setEditorKey(Date.now());
            setShow(true);
          }}
        >
          + Create Sub-Category
        </Button>
      </div>

      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-3">S.No</th>
                  <th>Icon</th>
                  <th>Main Category</th>
                  <th>Sub-Category Name</th>
                  <th className="text-end pe-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && subCategories.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <Spinner animation="border" variant="primary" size="sm" />
                    </td>
                  </tr>
                ) : (
                  currentItems.map((sub, index) => (
                    <tr key={sub._id}>
                      <td className="ps-3">
                        {String(indexOfFirstItem + index + 1).padStart(2, "0")}
                      </td>
                      <td>
                        <img
                          src={
                            sub.icon
                              ? `${getFullImageUrl(sub.icon)}?t=${refreshKey}`
                              : "https://placehold.co/50x50?text=No+Icon"
                          }
                          alt="icon"
                          width="45"
                          height="45"
                          className="rounded border"
                          style={{ objectFit: "cover" }}
                        />
                      </td>
                      <td className="text-primary text-nowrap">
                        {sub.category?.categoryName || "N/A"}
                      </td>
                      <td className="fw-bold">{sub.subCategoryName}</td>
                      <td className="text-end pe-3">
                        <div className="d-flex justify-content-end gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEdit(sub)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={async () => {
                              if (window.confirm("Delete?")) {
                                await deleteSubCategory(sub._id);
                                fetchData();
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
        <Card.Footer className="bg-white border-top-0 py-3">
          <CustomPagination
            current={currentPage}
            totalItems={subCategories.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </Card.Footer>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        backdrop="static"
        fullscreen="sm-down" // Fullscreen only on small mobile devices
      >
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold">
            {editId ? "Update" : "Create"} Sub-Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6} className="mb-3 mb-md-0">
                <Form.Label className="fw-bold small">Main Category</Form.Label>
                <Form.Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold small">
                  Sub-Category Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold small">Icon</Form.Label>
              <div className="d-flex flex-column flex-sm-row gap-3 align-items-start align-items-sm-center">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                  className="flex-grow-1"
                />
                {iconPreview && (
                  <img
                    src={iconPreview}
                    alt="Preview"
                    width="60"
                    height="60"
                    className="rounded border shadow-sm"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-0">
              <Form.Label className="fw-bold small">Note</Form.Label>
              <div className="border rounded">
                <TextEditor key={editorKey} value={note} onChange={setNote} />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button variant="light" onClick={handleClose} className="px-4">
            Cancel
          </Button>
          <Button
            variant="dark"
            onClick={handleSave}
            disabled={loading}
            className="px-4"
          >
            {loading ? <Spinner size="sm" /> : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SubCategories;
