// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Spinner,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { getAdminProfile, updateAdminProfile } from "../Services/adminService";
// import { FaSave, FaYoutube } from "react-icons/fa";

// const Profile = () => {
//   const [loading, setLoading] = useState(false);
//   const [adminId, setAdminId] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     contactNo: "",
//     facebook: "",
//     twitter: "",
//     linkedin: "",
//     youtube: "", // Added YouTube field
//     street: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   // Fetch profile from API
//   const fetchProfile = async (id) => {
//     try {
//       setLoading(true);
//       const res = await getAdminProfile(id);

//       if (res.status && res.data) {
//         const data = res.data;
//         setFormData({
//           name: data.name || "",
//           email: data.email || "",
//           contactNo: data.contactNo || "",
//           facebook: data.facebook || "",
//           twitter: data.twitter || "",
//           linkedin: data.linkedin || "",
//           youtube: data.youtube || "", // Set YouTube from API
//           street: data.address?.street || "",
//           city: data.address?.city || "",
//           state: data.address?.state || "",
//           pincode: data.address?.pincode || "",
//           country: data.address?.country || "",
//           newPassword: "",
//           confirmPassword: "",
//         });
//       }
//     } catch (err) {
//       toast.error("Failed to load profile details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("adminUser"));
//     if (userData) {
//       const id = userData._id || userData.id;
//       setAdminId(id);

//       setFormData((prev) => ({
//         ...prev,
//         name: userData.name || "",
//         email: userData.email || "",
//       }));

//       fetchProfile(id);
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       formData.newPassword &&
//       formData.newPassword !== formData.confirmPassword
//     ) {
//       return toast.error("Passwords do not match!");
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         name: formData.name,
//         email: formData.email,
//         contactNo: formData.contactNo,
//         facebook: formData.facebook,
//         twitter: formData.twitter,
//         linkedin: formData.linkedin,
//         youtube: formData.youtube, // Included in payload
//         street: formData.street,
//         city: formData.city,
//         state: formData.state,
//         pincode: formData.pincode,
//         country: formData.country,
//       };

//       if (formData.newPassword) {
//         payload.newPassword = formData.newPassword;
//         payload.confirmPassword = formData.confirmPassword;
//       }

//       const res = await updateAdminProfile(adminId, payload);
//       if (res.status) {
//         toast.success("Profile Updated Successfully!");
//         setFormData((prev) => ({
//           ...prev,
//           newPassword: "",
//           confirmPassword: "",
//         }));
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Internal Server Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container fluid="md" className="py-3 px-2 px-md-3">
//       {/* Mini Profile Header - Responsive Flex */}
//       <Card className="mb-3 border-0 shadow-sm bg-white">
//         <Card.Body className="py-2 px-3 d-flex align-items-center">
//           <div
//             className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0"
//             style={{ width: "45px", height: "45px", fontSize: "1.1rem" }}
//           >
//             {formData.name?.charAt(0).toUpperCase()}
//           </div>
//           <div className="ms-3 overflow-hidden">
//             <h6 className="mb-0 fw-bold text-truncate">{formData.name}</h6>
//             <small
//               className="text-muted text-truncate d-block"
//               style={{ fontSize: "11px" }}
//             >
//               {formData.email}
//             </small>
//           </div>
//         </Card.Body>
//       </Card>

//       <Form onSubmit={handleSubmit}>
//         <Row className="g-3">
//           {/* Left Column: Personal, Social & Security */}
//           <Col xs={12} lg={7}>
//             {/* Personal & Social */}
//             <Card className="border-0 shadow-sm mb-3">
//               <Card.Body className="p-3">
//                 <h6
//                   className="fw-bold mb-3 text-primary border-bottom pb-2"
//                   style={{ fontSize: "14px" }}
//                 >
//                   Personal & Social Profiles
//                 </h6>
//                 <Row className="g-2">
//                   <Col xs={12} md={6}>
//                     <Form.Label className="small mb-0">Full Name</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                     />
//                   </Col>
//                   <Col xs={12} md={6}>
//                     <Form.Label className="small mb-0">Email</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                     />
//                   </Col>
//                   <Col xs={12} md={6}>
//                     <Form.Label className="small mb-0">Contact No</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       name="contactNo"
//                       value={formData.contactNo}
//                       onChange={handleChange}
//                     />
//                   </Col>
//                   <Col xs={12} md={6}>
//                     <Form.Label className="small mb-0">Facebook</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       name="facebook"
//                       value={formData.facebook}
//                       onChange={handleChange}
//                     />
//                   </Col>
//                   <Col xs={12} md={6}>
//                     <Form.Label className="small mb-0">Twitter</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       name="twitter"
//                       value={formData.twitter}
//                       onChange={handleChange}
//                     />
//                   </Col>
//                   <Col xs={12} md={6}>
//                     <Form.Label className="small mb-0">LinkedIn</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       name="linkedin"
//                       value={formData.linkedin}
//                       onChange={handleChange}
//                     />
//                   </Col>
//                   {/* Added YouTube Field */}
//                   <Col xs={12}>
//                     <Form.Label className="small mb-0">
//                       YouTube Channel
//                     </Form.Label>
//                     <Form.Control
//                       size="sm"
//                       name="youtube"
//                       value={formData.youtube}
//                       onChange={handleChange}
//                       placeholder="https://youtube.com/..."
//                     />
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>

//             {/* Security */}
//             <Card className="border-0 shadow-sm mb-3 mb-lg-0">
//               <Card.Body className="p-3">
//                 <h6
//                   className="fw-bold mb-3 text-danger border-bottom pb-2"
//                   style={{ fontSize: "14px" }}
//                 >
//                   Security Settings
//                 </h6>
//                 <Row className="g-2">
//                   <Col xs={12} md={6}>
//                     <Form.Label className="small mb-0">New Password</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       type="password"
//                       name="newPassword"
//                       value={formData.newPassword}
//                       onChange={handleChange}
//                       placeholder="******"
//                     />
//                   </Col>
//                   <Col xs={12} md={6}>
//                     <Form.Label className="small mb-0">
//                       Confirm Password
//                     </Form.Label>
//                     <Form.Control
//                       size="sm"
//                       type="password"
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       placeholder="******"
//                     />
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           </Col>

//           {/* Right Column: Address */}
//           <Col xs={12} lg={5}>
//             <Card className="border-0 shadow-sm h-100">
//               <Card.Body className="p-3 d-flex flex-column">
//                 <h6
//                   className="fw-bold mb-3 text-success border-bottom pb-2"
//                   style={{ fontSize: "14px" }}
//                 >
//                   Address Details
//                 </h6>
//                 <Row className="g-2 flex-grow-1">
//                   <Col xs={12}>
//                     <Form.Label className="small mb-0">
//                       Street Address
//                     </Form.Label>
//                     <Form.Control
//                       size="sm"
//                       name="street"
//                       value={formData.street}
//                       onChange={handleChange}
//                     />
//                   </Col>
//                   <Col xs={6}>
//                     <Form.Label className="small mb-0">City</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                     />
//                   </Col>
//                   <Col xs={6}>
//                     <Form.Label className="small mb-0">State</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       name="state"
//                       value={formData.state}
//                       onChange={handleChange}
//                     />
//                   </Col>
//                   <Col xs={6}>
//                     <Form.Label className="small mb-0">Pincode</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       name="pincode"
//                       value={formData.pincode}
//                       onChange={handleChange}
//                     />
//                   </Col>
//                   <Col xs={6}>
//                     <Form.Label className="small mb-0">Country</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       name="country"
//                       value={formData.country}
//                       onChange={handleChange}
//                     />
//                   </Col>
//                 </Row>

//                 <div className="mt-4 pt-3">
//                   <Button
//                     variant="primary"
//                     type="submit"
//                     size="sm"
//                     className="w-100 py-2 fw-bold shadow-sm mt-auto"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <Spinner animation="border" size="sm" />
//                     ) : (
//                       <>
//                         <FaSave className="me-2" /> Save Profile
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Form>
//     </Container>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { getAdminProfile, updateAdminProfile } from "../Services/adminService";
import { FaSave, FaYoutube, FaEdit } from "react-icons/fa";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [adminId, setAdminId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    youtube: "",
    textEditor: "", // Added parameter
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch profile from API
  const fetchProfile = async (id) => {
    try {
      setLoading(true);
      const res = await getAdminProfile(id);

      if (res.status && res.data) {
        const data = res.data;
        setFormData({
          name: data.name || "",
          email: data.email || "",
          contactNo: data.contactNo || "",
          facebook: data.facebook || "",
          twitter: data.twitter || "",
          linkedin: data.linkedin || "",
          youtube: data.youtube || "",
          textEditor: data.textEditor || "",
          street: data.address?.street || "",
          city: data.address?.city || "",
          state: data.address?.state || "",
          pincode: data.address?.pincode || "",
          country: data.address?.country || "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      toast.error("Failed to load profile details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("adminUser"));
    if (userData) {
      const id = userData._id || userData.id;
      setAdminId(id);

      setFormData((prev) => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
      }));

      fetchProfile(id);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      return toast.error("Passwords do not match!");
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        contactNo: formData.contactNo,
        facebook: formData.facebook,
        twitter: formData.twitter,
        linkedin: formData.linkedin,
        youtube: formData.youtube,
        textEditor: formData.textEditor, // Included in payload
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        country: formData.country,
      };

      if (formData.newPassword) {
        payload.newPassword = formData.newPassword;
        payload.confirmPassword = formData.confirmPassword;
      }

      const res = await updateAdminProfile(adminId, payload);
      if (res.status) {
        toast.success("Profile Updated Successfully!");
        setFormData((prev) => ({
          ...prev,
          newPassword: "",
          confirmPassword: "",
        }));
        // Optional: Re-fetch to confirm update in UI
        fetchProfile(adminId);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid="md" className="py-3 px-2 px-md-3">
      <Card className="mb-3 border-0 shadow-sm bg-white">
        <Card.Body className="py-2 px-3 d-flex align-items-center">
          <div
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0"
            style={{ width: "45px", height: "45px", fontSize: "1.1rem" }}
          >
            {formData.name?.charAt(0).toUpperCase()}
          </div>
          <div className="ms-3 overflow-hidden">
            <h6 className="mb-0 fw-bold text-truncate">{formData.name}</h6>
            <small
              className="text-muted text-truncate d-block"
              style={{ fontSize: "11px" }}
            >
              {formData.email}
            </small>
          </div>
        </Card.Body>
      </Card>

      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col xs={12} lg={7}>
            <Card className="border-0 shadow-sm mb-3">
              <Card.Body className="p-3">
                <h6
                  className="fw-bold mb-3 text-primary border-bottom pb-2"
                  style={{ fontSize: "14px" }}
                >
                  Personal & Social Profiles
                </h6>
                <Row className="g-2">
                  <Col xs={12} md={6}>
                    <Form.Label className="small mb-0">Full Name</Form.Label>
                    <Form.Control
                      size="sm"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Label className="small mb-0">Email</Form.Label>
                    <Form.Control
                      size="sm"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Label className="small mb-0">Contact No</Form.Label>
                    <Form.Control
                      size="sm"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Label className="small mb-0">Facebook</Form.Label>
                    <Form.Control
                      size="sm"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Label className="small mb-0">Twitter</Form.Label>
                    <Form.Control
                      size="sm"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Label className="small mb-0">LinkedIn</Form.Label>
                    <Form.Control
                      size="sm"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={12}>
                    <Form.Label className="small mb-0">
                      YouTube Channel
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      name="youtube"
                      value={formData.youtube}
                      onChange={handleChange}
                      placeholder="https://youtube.com/..."
                    />
                  </Col>

                  {/* Added Field: Footer Content */}
                  <Col xs={12}>
                    <Form.Label className="small mb-0">
                      Footer Content
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      size="sm"
                      name="textEditor"
                      value={formData.textEditor}
                      onChange={handleChange}
                      placeholder="Enter footer content..."
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm mb-3 mb-lg-0">
              <Card.Body className="p-3">
                <h6
                  className="fw-bold mb-3 text-danger border-bottom pb-2"
                  style={{ fontSize: "14px" }}
                >
                  Security Settings
                </h6>
                <Row className="g-2">
                  <Col xs={12} md={6}>
                    <Form.Label className="small mb-0">New Password</Form.Label>
                    <Form.Control
                      size="sm"
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="******"
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Label className="small mb-0">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="******"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={5}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-3 d-flex flex-column">
                <h6
                  className="fw-bold mb-3 text-success border-bottom pb-2"
                  style={{ fontSize: "14px" }}
                >
                  Address Details
                </h6>
                <Row className="g-2 flex-grow-1">
                  <Col xs={12}>
                    <Form.Label className="small mb-0">
                      Street Address
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={6}>
                    <Form.Label className="small mb-0">City</Form.Label>
                    <Form.Control
                      size="sm"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={6}>
                    <Form.Label className="small mb-0">State</Form.Label>
                    <Form.Control
                      size="sm"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={6}>
                    <Form.Label className="small mb-0">Pincode</Form.Label>
                    <Form.Control
                      size="sm"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={6}>
                    <Form.Label className="small mb-0">Country</Form.Label>
                    <Form.Control
                      size="sm"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <div className="mt-4 pt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    size="sm"
                    className="w-100 py-2 fw-bold shadow-sm mt-auto"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <>
                        <FaSave className="me-2" /> Save Profile
                      </>
                    )}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Profile;
