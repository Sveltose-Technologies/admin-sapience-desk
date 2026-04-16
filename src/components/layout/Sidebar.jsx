// import { NavLink } from "react-router-dom";
// import { useMedia } from "../../context/MediaContext";
// import { getFullImageUrl } from "../../Services/adminService";
// import defaultLogo from "../../assets/logo.png";

// const Sidebar = ({ onClose }) => {
//   const { logoUrl } = useMedia();

//   const logoStyle = {
//     height: "50px",
//     width: "160px",
//     objectFit: "contain",
//   };

//   return (
//     <div className="sidebar-container shadow">
//       {/* Mobile Header */}
//       <div className="d-lg-none d-flex align-items-center justify-content-between p-2 border-bottom border-secondary">
//         <img
//           src={logoUrl ? getFullImageUrl(logoUrl) : defaultLogo}
//           alt="Logo"
//           style={{ height: "35px", objectFit: "contain" }}
//         />
//         <button
//           className="btn btn-link text-white p-0"
//           onClick={onClose}
//           style={{ fontSize: "28px" }}
//         >
//           &times;
//         </button>
//       </div>

//       {/* Desktop Header */}
//       <div className="d-none d-lg-block p-4 text-center border-bottom border-secondary">
//         <img
//           src={logoUrl ? getFullImageUrl(logoUrl) : defaultLogo}
//           alt="Logo"
//           style={logoStyle}
//         />
//       </div>

//       {/* Menu Items */}
//       <div className="sidebar-menu-wrapper p-3">
//         <SidebarItem
//           to="/admin/dashboard"
//           icon="bi-grid-1x2"
//           label="Dashboard"
//           onClick={onClose}
//         />
//         <SidebarItem
//           to="/admin/users"
//           icon="bi-people"
//           label="User"
//           onClick={onClose}
//         />
//         <SidebarItem
//           to="/admin/categories"
//           icon="bi-tags"
//           label="Categories"
//           onClick={onClose}
//         />
//         <SidebarItem
//           to="/admin/subcategories"
//           icon="bi-layers"
//           label="SubCategories"
//           onClick={onClose}
//         />
//         <SidebarItem
//           to="/admin/articles"
//           icon="bi-file-earmark-richtext"
//           label="Article Post"
//           onClick={onClose}
//         />
//         <SidebarItem
//           to="/admin/comments"
//           icon="bi-chat-left-dots"
//           label="Comments"
//           onClick={onClose}
//         />
//         <SidebarItem
//           to="/admin/media"
//           icon="bi-images"
//           label="Media "
//           onClick={onClose}
//         />
//         <SidebarItem
//           to="/admin/events"
//           icon="bi-calendar-event"
//           label="Events "
//           onClick={onClose}
//         />
//         <SidebarItem
//           to="/admin/videos"
//           icon="bi-play-circle"
//           label="Videos "
//           onClick={onClose}
//         />
//         <SidebarItem
//           to="/admin/transaction"
//           icon="bi-cash-stack"
//           label="Transaction"
//           onClick={onClose}
//         />

//         <SidebarItem
//           to="/admin/settings"
//           icon="bi-gear"
//           label="Settings"
//           onClick={onClose}
//         />
//       </div>
//     </div>
//   );
// };

// const SidebarItem = ({ to, icon, label, onClick }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       `nav-link-custom d-flex align-items-center px-3 py-2 ${isActive ? "active" : ""}`
//     }
//     onClick={onClick}
//     style={{ textDecoration: "none", color: "inherit" }}
//   >
//     <i
//       className={`bi ${icon} me-3`}
//       style={{ fontSize: "1.2rem", display: "inline-block" }}
//     ></i>
//     <span>{label}</span>
//   </NavLink>
// );

// export default Sidebar;
import { NavLink } from "react-router-dom";
import { useMedia } from "../../context/MediaContext";
import { getFullImageUrl } from "../../Services/adminService";
import defaultLogo from "../../assets/logo.png";

const Sidebar = ({ onClose }) => {
  const { logoUrl } = useMedia();

  // ✅ Reduced logo size only
  const logoStyle = {
    height: "38px", // reduced from 50px
    width: "130px", // reduced from 160px
    objectFit: "contain",
  };

  return (
    <div className="sidebar-container shadow">
      {/* Mobile Header */}
      <div className="d-lg-none d-flex align-items-center justify-content-between p-2 border-bottom border-secondary">
        <img
          src={logoUrl ? getFullImageUrl(logoUrl) : defaultLogo}
          alt="Logo"
          style={{
            height: "50px", // reduced from 35px
            width: "150px",
            marginLeft: "10px",
            objectFit: "contain",
          }}
        />
        <button
          className="btn text-black p-0"
          onClick={onClose}
          style={{ fontSize: "28px" }}
        >
          &times;
        </button>
      </div>

      {/* Desktop Header */}
      <div className="d-none d-lg-block p-3 text-center border-bottom border-secondary">
        <img
          src={logoUrl ? getFullImageUrl(logoUrl) : defaultLogo}
          alt="Logo"
          style={logoStyle}
        />
      </div>

      {/* Menu Items */}
      <div className="sidebar-menu-wrapper p-3">
        <SidebarItem
          to="/admin/dashboard"
          icon="bi-grid-1x2"
          label="Dashboard"
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/users"
          icon="bi-people"
          label="User"
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/categories"
          icon="bi-tags"
          label="Categories"
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/subcategories"
          icon="bi-layers"
          label="SubCategories"
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/articles"
          icon="bi-file-earmark-richtext"
          label="Article Post"
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/comments"
          icon="bi-chat-left-dots"
          label="Comments"
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/media"
          icon="bi-images"
          label="Media "
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/events"
          icon="bi-calendar-event"
          label="Events "
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/videos"
          icon="bi-play-circle"
          label="Videos "
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/transaction"
          icon="bi-cash-stack"
          label="Transaction"
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/settings"
          icon="bi-gear"
          label="Settings"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `nav-link-custom d-flex align-items-center px-3 py-2 ${
        isActive ? "active" : ""
      }`
    }
    onClick={onClick}
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <i
      className={`bi ${icon} me-3`}
      style={{ fontSize: "1.2rem", display: "inline-block" }}
    ></i>
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
