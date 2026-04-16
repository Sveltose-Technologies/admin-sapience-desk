import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  Badge,
  Spinner,
  Button,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { toast } from "react-toastify";
import CustomPagination from "../components/common/CustomPagination";
import { getAllPayments, deletePaymentRecord } from "../Services/adminService";

const Transaction = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Date filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await getAllPayments();
      console.log("transections response ", res);

      const paymentData = Array.isArray(res) ? res : res?.data || [];
      setPayments([...paymentData].reverse());
    } catch (error) {
      console.error("Payment Fetch Error:", error);
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // --- Date Range Filter Logic ---
  const filteredItems = useMemo(() => {
    return payments.filter((item) => {
      // If no dates are selected, show everything
      if (!startDate && !endDate) return true;

      const paymentDate = new Date(item.createdAt).getTime();

      // Start Date: Set to 12:00:00 AM
      if (startDate && !endDate) {
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        return paymentDate >= start;
      }

      // End Date: Set to 11:59:59 PM
      if (!startDate && endDate) {
        const end = new Date(endDate).setHours(23, 59, 59, 999);
        return paymentDate <= end;
      }

      // Both dates: Between start 12 AM and end 11:59 PM
      if (startDate && endDate) {
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        const end = new Date(endDate).setHours(23, 59, 59, 999);
        return paymentDate >= start && paymentDate <= end;
      }

      return true;
    });
  }, [payments, startDate, endDate]);

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // --- Export to CSV (Filtered Data) ---
  const exportToCSV = () => {
    if (filteredItems.length === 0) return toast.info("No records to export");

    const headers = "S.No,User ID,Transaction ID,Amount,Currency,Date,Status\n";
    const rows = filteredItems
      .map((pay, index) => {
        const date = pay.createdAt
          ? new Date(pay.createdAt).toLocaleDateString()
          : "N/A";
        return `${index + 1},${pay.userId},${pay.paymentIntentId},${pay.amount},${pay.currency},${date},${pay.status}`;
      })
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Payments_${startDate || "start"}_to_${endDate || "end"}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deletePaymentRecord(userId);
        toast.success("Record deleted successfully");
        fetchPayments();
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === "succeeded" || s === "success") return "success";
    if (s === "pending") return "warning";
    if (s === "failed") return "danger";
    return "secondary";
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Payment Transactions</h2>
        <div className="d-flex gap-2">
          <Button variant="success" size="sm" onClick={exportToCSV}>
            Export to Excel (CSV)
          </Button>
          <Button
            variant="dark"
            size="sm"
            onClick={fetchPayments}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Refresh"}
          </Button>
        </div>
      </div>

      {/* --- Filter Logic UI --- */}
      <Card className="p-3 mb-4 shadow-sm border-0 bg-light">
        <Row className="align-items-end">
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={2}>
            <Button
              variant="outline-secondary"
              className="w-100"
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setCurrentPage(1);
              }}
            >
              Clear Filter
            </Button>
          </Col>
          <Col className="text-end">
            <div className="text-muted small">
              Records Found: <b>{filteredItems.length}</b>
            </div>
          </Col>
        </Row>
      </Card>

      <div className="bg-white p-3 rounded shadow-sm border">
        <Table responsive hover className="mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: "80px" }}>S.No</th>
              <th>User ID</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-5">
                  <Spinner animation="border" size="sm" />
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((pay, index) => (
                <tr key={pay._id || index}>
                  <td>
                    {String(indexOfFirstItem + index + 1).padStart(2, "0")}
                  </td>
                  <td>
                    <small className="text-muted">{pay.userId}</small>
                  </td>
                  <td>
                    <code style={{ fontSize: "11px" }}>
                      {pay.paymentIntentId}
                    </code>
                  </td>
                  <td className="fw-bold">₹{pay.amount}</td>
                  <td>
                    {pay.createdAt
                      ? new Date(pay.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <Badge
                      bg={getStatusBadge(pay.status)}
                      className="px-3 py-2"
                    >
                      {pay.status}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <Button
                      variant="link"
                      className="text-danger p-0"
                      onClick={() => handleDelete(pay.userId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No Transactions in this range.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {!loading && filteredItems.length > 0 && (
          <CustomPagination
            current={currentPage}
            totalItems={filteredItems.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default Transaction;
