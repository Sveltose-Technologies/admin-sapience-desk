// import React, { useState, useEffect } from "react";
// import { Row, Col, Card, Container, Spinner } from "react-bootstrap";
// import {
//   getAllUsers,
//   getAllArticles,
//   getAllCategories,
//   getAllComments,
// } from "../Services/adminService";

// const Dashboard = () => {
//   const [statsData, setStatsData] = useState({
//     users: 0,
//     articles: 0,
//     categories: 0,
//     comments: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardStats = async () => {
//       try {
//         setLoading(true);
//         const [usersRes, articlesRes, categoriesRes, commentsRes] =
//           await Promise.all([
//             getAllUsers(),
//             getAllArticles(),
//             getAllCategories(),
//             getAllComments(),
//           ]);

//         setStatsData({
//           users: usersRes.users?.length || usersRes.data?.length || 0,
//           articles:
//             articlesRes.articles?.length || articlesRes.data?.length || 0,
//           categories:
//             categoriesRes.categories?.length || categoriesRes.data?.length || 0,
//           comments:
//             commentsRes.comments?.length || commentsRes.data?.length || 0,
//         });
//       } catch (error) {
//         console.error("Error fetching dashboard stats:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardStats();
//   }, []);

//   const stats = [
//     {
//       title: "TOTAL USER",
//       count: statsData.users,
//       icon: "bi bi-people",
//       color: "#4f46e5",
//     },
//     {
//       title: "TOTAL POST",
//       count: statsData.articles,
//       icon: "bi bi-file-earmark-text",
//       color: "#f59e0b",
//     },
//     {
//       title: "TOTAL CATEGORY",
//       count: statsData.categories,
//       icon: "bi bi-grid",
//       color: "#10b981",
//     },
//     {
//       title: "TOTAL COMMENTS",
//       count: statsData.comments,
//       icon: "bi bi-chat-dots",
//       color: "#ef4444",
//     },
//   ];

//   return (
//     <Container fluid className="py-4">
//       {/* Header Section - Fixed */}
//       <div className="mb-4">
//         <h2 className="fw-bold mb-2 text-dark">Dashboard Overview</h2>
//         <p className="text-muted mb-4">
//           Welcome back, Admin! Here's what's happening today.
//         </p>
//       </div>

//       {/* Stats Cards - Improved Responsive Grid */}
//       <Row className="g-3">
//         {stats.map((item, i) => (
//           <Col xs={12} sm={6} md={3} key={i} className="mb-3">
//             <Card
//               className="border-0 shadow-sm h-100"
//               style={{ minHeight: "120px" }}
//             >
//               <Card.Body className="p-3 d-flex flex-column justify-content-center align-items-center text-center">
//                 {/* Count with large font */}
//                 <h1
//                   className="display-6 fw-bold mb-2"
//                   style={{ color: item.color }}
//                 >
//                   {loading ? (
//                     <Spinner animation="border" size="sm" />
//                   ) : (
//                     item.count
//                   )}
//                 </h1>

//                 {/* Title */}
//                 <p className="text-muted mb-0 small fw-bold text-uppercase">
//                   {item.title}
//                 </p>

//                 {/* Optional icon */}
//                 <div className="mt-2">
//                   <i
//                     className={`${item.icon} fs-5`}
//                     style={{ color: item.color }}
//                   ></i>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Row, Col, Card, Container, Spinner } from "react-bootstrap";
// 1. Import Link from react-router-dom
import { Link } from "react-router-dom";
import {
  getAllUsers,
  getAllArticles,
  getAllCategories,
  getAllComments,
} from "../Services/adminService";

const Dashboard = () => {
  const [statsData, setStatsData] = useState({
    users: 0,
    articles: 0,
    categories: 0,
    comments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const [usersRes, articlesRes, categoriesRes, commentsRes] =
          await Promise.all([
            getAllUsers(),
            getAllArticles(),
            getAllCategories(),
            getAllComments(),
          ]);

        setStatsData({
          users: usersRes.users?.length || usersRes.data?.length || 0,
          articles:
            articlesRes.articles?.length || articlesRes.data?.length || 0,
          categories:
            categoriesRes.categories?.length || categoriesRes.data?.length || 0,
          comments:
            commentsRes.comments?.length || commentsRes.data?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  // Add 'path' property to match your App.js routes
  const stats = [
    {
      title: "TOTAL USER",
      count: statsData.users,
      icon: "bi bi-people",
      color: "#4f46e5",
      path: "/admin/users",
    },
    {
      title: "TOTAL POST",
      count: statsData.articles,
      icon: "bi bi-file-earmark-text",
      color: "#f59e0b",
      path: "/admin/articles",
    },
    {
      title: "TOTAL CATEGORY",
      count: statsData.categories,
      icon: "bi bi-grid",
      color: "#10b981",
      path: "/admin/categories",
    },
    {
      title: "TOTAL COMMENTS",
      count: statsData.comments,
      icon: "bi bi-chat-dots",
      color: "#ef4444",
      path: "/admin/comments",
    },
  ];

  return (
    <Container fluid className="py-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-2 text-dark">Dashboard Overview</h2>
        <p className="text-muted mb-4">
          Welcome back, Admin! Here's what's happening today.
        </p>
      </div>

      <Row className="g-3">
        {stats.map((item, i) => (
          <Col xs={12} sm={6} md={3} key={i} className="mb-3">
            {/* 3. Wrap the Card in a Link or use Link as the component */}
            <Link to={item.path} style={{ textDecoration: "none" }}>
              <Card
                className="border-0 shadow-sm h-100 stats-card"
                style={{
                  minHeight: "120px",
                  transition: "transform 0.2s", // Added a subtle hover effect
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Card.Body className="p-3 d-flex flex-column justify-content-center align-items-center text-center">
                  <h1
                    className="display-6 fw-bold mb-2"
                    style={{ color: item.color }}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      item.count
                    )}
                  </h1>

                  <p className="text-muted mb-0 small fw-bold text-uppercase">
                    {item.title}
                  </p>

                  <div className="mt-2">
                    <i
                      className={`${item.icon} fs-5`}
                      style={{ color: item.color }}
                    ></i>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
