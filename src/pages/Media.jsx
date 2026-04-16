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
  Tabs,
  Tab,
} from "react-bootstrap";
import { toast } from "react-toastify";
import TextEditor from "../components/common/TextEditor";
import CustomPagination from "../components/common/CustomPagination";
import { useMedia } from "../context/MediaContext"; // Import Context
import {
  getAllMedia,
  createMedia,
  updateMedia,
  deleteMedia,
  getAllMediaTypes,
  createMediaType,
  updateMediaType,
  deleteMediaType,
  getFullImageUrl,
} from "../Services/adminService";

const Media = () => {
  const { updateLogo } = useMedia(); // Access update function
  const [activeTab, setActiveTab] = useState("library");
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [mediaList, setMediaList] = useState([]);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [isEditMedia, setIsEditMedia] = useState(false);
  const [mediaForm, setMediaForm] = useState({
    id: "",
    type: "",
    note: "",
    status: "active",
    image: null,
  });

  const [mediaPage, setMediaPage] = useState(1);
  const itemsPerPage = 10;

  const [typeList, setTypeList] = useState([]);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [isEditType, setIsEditType] = useState(false);
  const [typeForm, setTypeForm] = useState({ id: "", typeName: "" });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [mediaRes, typeRes] = await Promise.all([
        getAllMedia(),
        getAllMediaTypes(),
      ]);
      if (mediaRes.data?.status)
        setMediaList(mediaRes.data.data || mediaRes.data.media || []);
      if (typeRes.data?.status)
        setTypeList(typeRes.data.mediaTypes || typeRes.data.data || []);
    } catch (error) {
      toast.error("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastMedia = mediaPage * itemsPerPage;
  const indexOfFirstMedia = indexOfLastMedia - itemsPerPage;
  const currentMediaItems = mediaList.slice(
    indexOfFirstMedia,
    indexOfLastMedia,
  );

  const handleMediaSubmit = async () => {
    if (!mediaForm.type) return toast.warning("Please select a media type");

    setBtnLoading(true);
    const formData = new FormData();

    if (mediaForm.image instanceof File) {
      formData.append("image", mediaForm.image);
    }

    formData.append("type", mediaForm.type);
    formData.append("note", mediaForm.note);
    formData.append("status", mediaForm.status);

    try {
      let res = isEditMedia
        ? await updateMedia(mediaForm.id, formData)
        : await createMedia(formData);
      if (res.data.status) {
        toast.success(isEditMedia ? "Media updated" : "Media uploaded");
        setShowMediaModal(false);
        fetchAllData();
        updateLogo(); // Trigger Sidebar logo refresh
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteMediaHandler = async (id) => {
    if (window.confirm("Delete this media?")) {
      const res = await deleteMedia(id);
      if (res.data.status) {
        toast.success("Media deleted");
        fetchAllData();
        updateLogo(); // Trigger Sidebar logo refresh
      }
    }
  };

  const handleTypeSubmit = async () => {
    if (!typeForm.typeName) return toast.warning("Type name is required");
    setBtnLoading(true);
    try {
      const payload = { type: typeForm.typeName.toLowerCase().trim() };
      let res = isEditType
        ? await updateMediaType(typeForm.id, payload)
        : await createMediaType(payload);
      if (res.data.status) {
        toast.success("Type saved");
        setShowTypeModal(false);
        fetchAllData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save type");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteTypeHandler = async (id) => {
    if (window.confirm("Delete this media type?")) {
      const res = await deleteMediaType(id);
      if (res.data.status) {
        toast.success("Type deleted");
        fetchAllData();
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm border">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0 fw-bold">Media Management</h3>
        {activeTab === "library" ? (
          <Button
            variant="dark"
            size="sm"
            onClick={() => {
              setIsEditMedia(false);
              setMediaForm({
                id: "",
                type: "",
                note: "",
                status: "active",
                image: null,
              });
              setShowMediaModal(true);
            }}
          >
            + Upload Media
          </Button>
        ) : (
          <Button
            variant="dark"
            size="sm"
            onClick={() => {
              setIsEditType(false);
              setTypeForm({ id: "", typeName: "" });
              setShowTypeModal(true);
            }}
          >
            + Add New Type
          </Button>
        )}
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4 custom-tabs border-bottom"
      >
        <Tab eventKey="library" title="Media Library">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th>S.No</th>
                <th>Media</th>
                <th>Type</th>
                <th>Description</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <Spinner animation="border" size="sm" />
                  </td>
                </tr>
              ) : currentMediaItems.length > 0 ? (
                currentMediaItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>
                      {String(indexOfFirstMedia + index + 1).padStart(2, "0")}
                    </td>
                    <td>
                      <img
                        src={getFullImageUrl(item.image)}
                        alt="media"
                        width="50"
                        height="40"
                        className="rounded border"
                        style={{ objectFit: "cover" }}
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/50x40?text=NA")
                        }
                      />
                    </td>
                    <td>
                      <span className="text-capitalize fw-semibold">
                        {item.type?.type || "N/A"}
                      </span>
                    </td>
                    <td style={{ width: "20px" }}>
                      <div
                        className="text-muted small"
                        style={{
                          maxWidth: "350px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: "2",
                          WebkitBoxOrient: "vertical",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: item.note || "No description",
                        }}
                      />
                    </td>
                    <td>
                      <Badge
                        bg={item.status === "active" ? "success" : "danger"}
                        className="fw-normal"
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-decoration-none fw-bold me-2"
                        onClick={() => {
                          setIsEditMedia(true);
                          setMediaForm({
                            id: item._id,
                            type: item.type?._id,
                            note: item.note,
                            status: item.status,
                            image: null,
                          });
                          setShowMediaModal(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-danger text-decoration-none fw-bold"
                        onClick={() => deleteMediaHandler(item._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No Media Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {mediaList.length > itemsPerPage && (
            <CustomPagination
              current={mediaPage}
              totalItems={mediaList.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(p) => setMediaPage(p)}
            />
          )}
        </Tab>

        <Tab eventKey="types" title="Media Types">
          <Table
            responsive
            hover
            className="mb-0 align-middle"
            style={{ maxWidth: "700px" }}
          >
            <thead className="bg-light">
              <tr>
                <th>S.No</th>
                <th>Type Name</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {typeList.map((t, index) => (
                <tr key={t._id}>
                  <td>{String(index + 1).padStart(2, "0")}</td>
                  <td className="text-capitalize fw-bold">{t.type}</td>
                  <td className="text-center">
                    <Button
                      variant="link"
                      size="sm"
                      className="text-decoration-none fw-bold me-2"
                      onClick={() => {
                        setIsEditType(true);
                        setTypeForm({ id: t._id, typeName: t.type });
                        setShowTypeModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-danger text-decoration-none fw-bold"
                      onClick={() => deleteTypeHandler(t._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      <Modal
        show={showMediaModal}
        onHide={() => setShowMediaModal(false)}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold">
            {isEditMedia ? "Edit Media" : "Upload Media"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label className="fw-bold small">Media Type</Form.Label>
                <Form.Select
                  value={mediaForm.type}
                  onChange={(e) =>
                    setMediaForm({ ...mediaForm, type: e.target.value })
                  }
                >
                  <option value="">-- Select Type --</option>
                  {typeList.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.type}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="fw-bold small">Status</Form.Label>
                <Form.Select
                  value={mediaForm.status}
                  onChange={(e) =>
                    setMediaForm({ ...mediaForm, status: e.target.value })
                  }
                >
                  <option value="active">Active</option>
                  <option value="deactive">Deactive</option>
                </Form.Select>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Label className="fw-bold small">Upload File</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setMediaForm({ ...mediaForm, image: e.target.files[0] })
                  }
                />
              </Col>
              <Col md={12} className="mb-3">
                <Form.Label className="fw-bold small">Description</Form.Label>
                <TextEditor
                  value={mediaForm.note}
                  onChange={(val) => setMediaForm({ ...mediaForm, note: val })}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMediaModal(false)}>
            Cancel
          </Button>
          <Button
            variant="dark"
            onClick={handleMediaSubmit}
            disabled={btnLoading}
          >
            {btnLoading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showTypeModal}
        onHide={() => setShowTypeModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold">
            {isEditType ? "Edit Type" : "Add Type"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form.Group>
            <Form.Label className="fw-bold small">Type Name</Form.Label>
            <Form.Control
              placeholder="e.g. logo, banner"
              value={typeForm.typeName}
              onChange={(e) =>
                setTypeForm({ ...typeForm, typeName: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTypeModal(false)}>
            Cancel
          </Button>
          <Button
            variant="dark"
            onClick={handleTypeSubmit}
            disabled={btnLoading}
          >
            {btnLoading ? "Save" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Media;
