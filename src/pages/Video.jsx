// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Button,
//   Modal,
//   Form,
//   Spinner,
//   Container,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import CustomPagination from "../components/common/CustomPagination";
// import {
//   getAllVideos,
//   createVideo,
//   updateVideo,
//   deleteVideo,
// } from "../Services/adminService";

// const Videos = () => {
//   const [videoList, setVideoList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [btnLoading, setBtnLoading] = useState(false);

//   const [showModal, setShowModal] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);

//   const [videoForm, setVideoForm] = useState({
//     id: "",
//     videoLink: "",
//     title: "",
//     description: "",
//   });

//   const [page, setPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     setLoading(true);
//     try {
//       const res = await getAllVideos();
//       if (res.status) {
//         setVideoList(res.data || []);
//       }
//     } catch (error) {
//       toast.error("Failed to load videos");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const indexOfLast = page * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentVideos = videoList.slice(indexOfFirst, indexOfLast);

//   const convertToEmbedUrl = (url) => {
//     if (!url) return "";
//     const videoId = url.split("v=")[1]?.split("&")[0];
//     return `https://www.youtube.com/embed/${videoId}`;
//   };

//   const handleSubmit = async () => {
//     if (!videoForm.title || !videoForm.videoLink)
//       return toast.warning("Title and Video Link are required");

//     setBtnLoading(true);
//     try {
//       const payload = {
//         videoLink: videoForm.videoLink,
//         title: videoForm.title,
//         description: videoForm.description,
//       };

//       const res = isEdit
//         ? await updateVideo(videoForm.id, payload)
//         : await createVideo(payload);

//       if (res.status) {
//         toast.success(isEdit ? "Video updated" : "Video created");
//         setShowModal(false);
//         fetchVideos();
//       }
//     } catch (error) {
//       toast.error("Operation failed");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this video?")) {
//       const res = await deleteVideo(id);
//       if (res.status) {
//         toast.success("Video deleted");
//         fetchVideos();
//       }
//     }
//   };

//   return (
//     <Container fluid className="bg-white p-3 p-md-4 rounded shadow-sm border">
//       {/* Responsive Header */}
//       <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
//         <h3 className="fw-bold mb-0">Video Management</h3>
//         <Button
//           variant="dark"
//           className="px-4 w-100 w-md-auto"
//           onClick={() => {
//             setIsEdit(false);
//             setVideoForm({
//               id: "",
//               videoLink: "",
//               title: "",
//               description: "",
//             });
//             setShowModal(true);
//           }}
//         >
//           + Add Video
//         </Button>
//       </div>

//       {/* Responsive Table Wrapper */}
//       <div className="table-responsive">
//         <Table hover className="align-middle">
//           <thead className="table-light">
//             <tr>
//               <th style={{ width: "60px" }}>S.No</th>
//               <th style={{ minWidth: "140px" }}>Preview</th>
//               <th style={{ minWidth: "150px" }}>Title</th>
//               <th style={{ minWidth: "200px" }}>Description</th>
//               <th className="text-center" style={{ width: "150px" }}>
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="5" className="text-center py-5">
//                   <Spinner animation="border" variant="dark" />
//                 </td>
//               </tr>
//             ) : currentVideos.length > 0 ? (
//               currentVideos.map((item, index) => (
//                 <tr key={item._id}>
//                   <td>{String(indexOfFirst + index + 1).padStart(2, "0")}</td>
//                   <td>
//                     <div
//                       className="ratio ratio-16x9"
//                       style={{ width: "120px" }}
//                     >
//                       <iframe
//                         src={convertToEmbedUrl(item.videoLink)}
//                         title={item.title}
//                         allowFullScreen
//                         className="rounded"
//                       ></iframe>
//                     </div>
//                   </td>
//                   <td className="fw-semibold">{item.title}</td>
//                   <td>
//                     <div
//                       className="text-muted small"
//                       style={{
//                         maxWidth: "250px",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                         display: "-webkit-box",
//                         WebkitLineClamp: "2",
//                         WebkitBoxOrient: "vertical",
//                       }}
//                     >
//                       {item.description}
//                     </div>
//                   </td>
//                   <td className="text-center">
//                     <div className="d-flex justify-content-center gap-2">
//                       <Button
//                         variant="outline-primary"
//                         size="sm"
//                         onClick={() => {
//                           setIsEdit(true);
//                           setVideoForm({
//                             id: item._id,
//                             videoLink: item.videoLink,
//                             title: item.title,
//                             description: item.description,
//                           });
//                           setShowModal(true);
//                         }}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="outline-danger"
//                         size="sm"
//                         onClick={() => handleDelete(item._id)}
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center py-4">
//                   No Videos Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>

//       {videoList.length > itemsPerPage && (
//         <div className="mt-4">
//           <CustomPagination
//             current={page}
//             totalItems={videoList.length}
//             itemsPerPage={itemsPerPage}
//             onPageChange={(p) => setPage(p)}
//           />
//         </div>
//       )}

//       {/* Responsive Add / Edit Modal */}
//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         centered
//         backdrop="static"
//         fullscreen="sm-down"
//       >
//         <Modal.Header closeButton className="bg-light">
//           <Modal.Title className="fw-bold">
//             {isEdit ? "Edit Video" : "Add Video"}
//           </Modal.Title>
//         </Modal.Header>

//         <Modal.Body className="p-4">
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label className="fw-bold">Video Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter video title"
//                 value={videoForm.title}
//                 onChange={(e) =>
//                   setVideoForm({ ...videoForm, title: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label className="fw-bold">YouTube Link</Form.Label>
//               <Form.Control
//                 type="url"
//                 placeholder="https://www.youtube.com/watch?v=..."
//                 value={videoForm.videoLink}
//                 onChange={(e) =>
//                   setVideoForm({ ...videoForm, videoLink: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-0">
//               <Form.Label className="fw-bold">Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={4}
//                 placeholder="Briefly describe the video content"
//                 value={videoForm.description}
//                 onChange={(e) =>
//                   setVideoForm({ ...videoForm, description: e.target.value })
//                 }
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>

//         <Modal.Footer className="bg-light">
//           <Button
//             variant="secondary"
//             className="px-4"
//             onClick={() => setShowModal(false)}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="dark"
//             className="px-4"
//             onClick={handleSubmit}
//             disabled={btnLoading}
//           >
//             {btnLoading ? (
//               <>
//                 <Spinner animation="border" size="sm" className="me-2" />
//                 Saving...
//               </>
//             ) : (
//               "Save Video"
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Videos;
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Container,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { HiPlus } from "react-icons/hi"; // Added for a better look
import CustomPagination from "../components/common/CustomPagination";
import {
  getAllVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../Services/adminService";

const Videos = () => {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [videoForm, setVideoForm] = useState({
    id: "",
    videoLink: "",
    title: "",
    description: "",
  });

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await getAllVideos();
      if (res.status) {
        setVideoList(res.data || []);
      }
    } catch (error) {
      toast.error("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLast = page * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentVideos = videoList.slice(indexOfFirst, indexOfLast);

  const convertToEmbedUrl = (url) => {
    if (!url) return "";
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleSubmit = async () => {
    if (!videoForm.title || !videoForm.videoLink)
      return toast.warning("Title and Video Link are required");

    setBtnLoading(true);
    try {
      const payload = {
        videoLink: videoForm.videoLink,
        title: videoForm.title,
        description: videoForm.description,
      };

      const res = isEdit
        ? await updateVideo(videoForm.id, payload)
        : await createVideo(payload);

      if (res.status) {
        toast.success(isEdit ? "Video updated" : "Video created");
        setShowModal(false);
        fetchVideos();
      }
    } catch (error) {
      toast.error("Operation failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this video?")) {
      const res = await deleteVideo(id);
      if (res.status) {
        toast.success("Video deleted");
        fetchVideos();
      }
    }
  };

  return (
    <Container fluid className="bg-white p-3 p-md-4 rounded shadow-sm border">
      {/* Refined Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0 text-dark">Video Management</h4>
        <Button
          variant="dark"
          size="sm" // Smaller size
          className="px-3 d-flex align-items-center shadow-sm"
          style={{ borderRadius: "6px", fontWeight: "500" }}
          onClick={() => {
            setIsEdit(false);
            setVideoForm({
              id: "",
              videoLink: "",
              title: "",
              description: "",
            });
            setShowModal(true);
          }}
        >
          <HiPlus className="me-1" size={18} /> Add Video
        </Button>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="table-responsive">
        <Table hover className="align-middle">
          <thead className="table-light">
            <tr style={{ fontSize: "0.9rem" }}>
              <th style={{ width: "60px" }}>S.No</th>
              <th style={{ minWidth: "140px" }}>Preview</th>
              <th style={{ minWidth: "150px" }}>Title</th>
              <th style={{ minWidth: "200px" }}>Description</th>
              <th className="text-center" style={{ width: "150px" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.95rem" }}>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  <Spinner animation="border" variant="dark" />
                </td>
              </tr>
            ) : currentVideos.length > 0 ? (
              currentVideos.map((item, index) => (
                <tr key={item._id}>
                  <td>{String(indexOfFirst + index + 1).padStart(2, "0")}</td>
                  <td>
                    <div
                      className="ratio ratio-16x9 shadow-sm"
                      style={{
                        width: "110px",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <iframe
                        src={convertToEmbedUrl(item.videoLink)}
                        title={item.title}
                        allowFullScreen
                        className="border-0"
                      ></iframe>
                    </div>
                  </td>
                  <td className="fw-semibold">{item.title}</td>
                  <td>
                    <div
                      className="text-muted small"
                      style={{
                        maxWidth: "250px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.description}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="px-3"
                        onClick={() => {
                          setIsEdit(true);
                          setVideoForm({
                            id: item._id,
                            videoLink: item.videoLink,
                            title: item.title,
                            description: item.description,
                          });
                          setShowModal(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="px-3"
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
                <td colSpan="5" className="text-center py-4 text-muted">
                  No Videos Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {videoList.length > itemsPerPage && (
        <div className="mt-4">
          <CustomPagination
            current={page}
            totalItems={videoList.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold h5">
            {isEdit ? "Update Video Details" : "Add New Video"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Video Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter video title"
                className="shadow-none border-secondary-subtle"
                value={videoForm.title}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">YouTube URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                className="shadow-none border-secondary-subtle"
                value={videoForm.videoLink}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, videoLink: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-0">
              <Form.Label className="small fw-bold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Briefly describe the video content"
                className="shadow-none border-secondary-subtle"
                value={videoForm.description}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button
            variant="light"
            className="px-4 fw-semibold text-muted"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="dark"
            className="px-4 fw-semibold"
            onClick={handleSubmit}
            disabled={btnLoading}
          >
            {btnLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Saving...
              </>
            ) : isEdit ? (
              "Update Video"
            ) : (
              "Save Video"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Videos;
