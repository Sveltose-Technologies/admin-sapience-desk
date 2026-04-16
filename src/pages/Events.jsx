import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import {
  getALLEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../Services/adminService";
import { toast } from "react-toastify";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    startTime: "",
    endTime: "",
    image: null,
    status: "active",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await getALLEvents();
    if (res?.status) {
      setEvents(res.events || []);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const convertTo12Hour = (time) => {
    if (!time) return "";
    if (time.includes("AM") || time.includes("PM")) return time;
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
  };

  const convertTo24Hour = (hour, minute, period) => {
    let h = parseInt(hour);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${minute}`;
  };

  const TimeSelector = ({ value, onChange }) => {
    const [hour, setHour] = useState("01");
    const [minute, setMinute] = useState("00");
    const [period, setPeriod] = useState("AM");

    useEffect(() => {
      if (value && !value.includes("AM") && !value.includes("PM")) {
        const [h, m] = value.split(":");
        let hourNum = parseInt(h);
        const newPeriod = hourNum >= 12 ? "PM" : "AM";
        hourNum = hourNum % 12 || 12;
        setHour(String(hourNum).padStart(2, "0"));
        setMinute(m);
        setPeriod(newPeriod);
      }
    }, [value]);

    const handleChange = (newHour, newMinute, newPeriod) => {
      const finalHour = newHour || hour;
      const finalMinute = newMinute || minute;
      const finalPeriod = newPeriod || period;
      setHour(finalHour);
      setMinute(finalMinute);
      setPeriod(finalPeriod);
      const newTime = convertTo24Hour(finalHour, finalMinute, finalPeriod);
      onChange(newTime);
    };

    return (
      <Row className="g-1">
        <Col>
          <Form.Select
            value={hour}
            onChange={(e) => handleChange(e.target.value, null, null)}
          >
            {[...Array(12)].map((_, i) => {
              const val = String(i + 1).padStart(2, "0");
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select
            value={minute}
            onChange={(e) => handleChange(null, e.target.value, null)}
          >
            {[...Array(60)].map((_, i) => {
              const val = String(i).padStart(2, "0");
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select
            value={period}
            onChange={(e) => handleChange(null, null, e.target.value)}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </Form.Select>
        </Col>
      </Row>
    );
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.startDate ||
      !formData.startTime ||
      (!editId && !formData.image)
    ) {
      toast.error("Required fields must be filled");
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image" && !formData[key]) return;
        data.append(key, formData[key]);
      });
      if (editId) {
        await updateEvent(editId, data);
      } else {
        await createEvent(data);
      }
      toast.success(editId ? "Event updated" : "Event created");
      await fetchEvents();
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const handleEdit = (event) => {
    setEditId(event._id);
    setFormData({
      ...event,
      startDate: formatDateForInput(event.startDate),
      endDate: formatDateForInput(event.endDate),
      image: null,
    });
    setShow(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteEvent(id);
      fetchEvents();
    }
  };

  const toggleStatus = async (event) => {
    const newStatus = event.status === "active" ? "deactive" : "active";
    await updateEvent(event._id, { status: newStatus });
    fetchEvents();
  };

  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      location: "",
      startTime: "",
      endTime: "",
      image: null,
      status: "active",
    });
  };

  return (
    <Container fluid="md" className="py-4">
      {/* Responsive Header Section */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
        <h3 className="mb-0">Event Management</h3>
        <Button variant="dark" onClick={() => setShow(true)} className="px-4">
          + Create Event
        </Button>
      </div>

      {/* Responsive Table */}
      <div className="table-responsive shadow-sm rounded">
        <Table bordered hover className="mb-0 bg-white">
          <thead className="table-light text-center">
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Status</th>
              <th style={{ minWidth: "160px" }}>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>
                  <small>
                    {formatDate(event.startDate)} - {formatDate(event.endDate)}
                  </small>
                </td>
                <td>
                  <small>
                    {convertTo12Hour(event.startTime)} -{" "}
                    {convertTo12Hour(event.endTime)}
                  </small>
                </td>
                <td>{event.location}</td>
                <td>
                  <Badge
                    bg={event.status === "active" ? "success" : "secondary"}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleStatus(event)}
                  >
                    {event.status}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        fullscreen="sm-down"
      >
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Event" : "Create Event"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Title</Form.Label>
              <Form.Control
                value={formData.title}
                placeholder="Event Title"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6} className="mb-3 mb-md-0">
                <Form.Label className="fw-bold">Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold">End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Location</Form.Label>
              <Form.Control
                value={formData.location}
                placeholder="Venue location"
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6} className="mb-3 mb-md-0">
                <Form.Label className="fw-bold">Start Time</Form.Label>
                <TimeSelector
                  value={formData.startTime}
                  onChange={(val) =>
                    setFormData({ ...formData, startTime: val })
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold">End Time</Form.Label>
                <TimeSelector
                  value={formData.endTime}
                  onChange={(val) => setFormData({ ...formData, endTime: val })}
                />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Event Banner Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
              {editId && (
                <Form.Text className="text-muted">
                  Leave empty to keep existing image
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="dark"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4"
          >
            {isSubmitting
              ? "Processing..."
              : editId
                ? "Update Event"
                : "Create Event"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Event;
