import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MediaProvider } from "./context/MediaContext";
// Layout
import AdminLayout from "./components/layout/AdminLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import Categories from "./pages/Categories";
import ArticlePost from "./pages/ArticlePost";
import Comments from "./pages/Comments";
import Media from "./pages/Media";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import SubCategories from "./pages/subcategories";
import Videos from "./pages/Video";
import Event from "./pages/Events";
import Transaction from "./pages/Transaction";

function App() {
  return (
    <MediaProvider>
      <ToastContainer autoClose={2000} theme="colored" />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="categories" element={<Categories />} />
          <Route path="articles" element={<ArticlePost />} />
          <Route path="comments" element={<Comments />} />
          <Route path="media" element={<Media />} />
          <Route path="events" element={<Event />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="videos" element={<Videos />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="subcategories" element={<SubCategories />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </MediaProvider>
  );
}

export default App;
