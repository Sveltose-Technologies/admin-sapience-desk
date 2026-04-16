import API from "./api";

export const IMG_URL = "https://node.sapiencedesk.com";

// --- Helper: Image URL processing with Cache Buster ---
export const getFullImageUrl = (path) => {
  if (!path || typeof path !== "string") {
    return "https://placehold.co/50x40?text=NA";
  }

  // 1. Agar URL pehle se hi full (Cloudinary/External) hai
  if (path.startsWith("http")) {
    return `${path}?t=${new Date().getTime()}`; // Cache bust karne ke liye
  }

  // 2. Local Path clean-up
  let cleanPath = path.replace(/\\/g, "/");

  if (cleanPath.startsWith("/")) {
    cleanPath = cleanPath.substring(1);
  }

  // Ensure uploads/ prefix (Agar backend 'uploads/' ke sath nahi deta)
  if (!cleanPath.startsWith("uploads/") && !cleanPath.startsWith("public/")) {
    cleanPath = `uploads/${cleanPath}`;
  }

  return `${IMG_URL}/${cleanPath}?t=${new Date().getTime()}`;
};
// ==========================
// 1. ARTICLE METHODS
// ==========================

export const getAllPayments = async () => {
  try {
    const response = await API.get("/payment/getall");
    console.log("Payments API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all payments:", error);
    throw error;
  }
};
export const getPaymentsByUserId = async (userId) => {
  try {
    const response = await API.get(`/payment/get-by-userId/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching payments for user ${userId}:`, error);
    throw error;
  }
};

export const deletePaymentRecord = async (userId) => {
  try {
    const response = await API.get(`/payment/get-by-userId/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllArticles = async () => {
  try {
    const response = await API.get("/article/get-all");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching articles:", error);
    throw error;
  }
};

export const createArticle = async (formData) => {
  try {
    const response = await API.post("/article/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateArticle = async (id, formData) => {
  try {
    console.log(`🔄 Updating article ID: ${id}`);

    // Request bhejne se pehle headers ensure karein
    const response = await API.put(`/article/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("✅ Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error updating article:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const response = await API.delete(`/article/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getArticleById = async (id) => {
  try {
    const response = await API.get(`/article/get-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const adminLogin = async (credentials) => {
  try {
    console.log("📤 Login request:", credentials.email);

    const config = {
      headers: { "Content-Type": "application/json" },
      timeout: 20000,
    };
    console.log("Request payload:", credentials);

    const response = await API.post("/admin/login", credentials, config);

    console.log("✅ Response received:", response.status);
    console.log("Response data:", response.data);
    console.log("Response headers:", response.headers);

    // Save token and user data if login successful
    if (response.data?.status === true) {
      const token = response.data.admin?.token;
      const user = response.data.admin;

      if (token) {
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminUser", JSON.stringify(user));
        console.log("💾 Data saved to localStorage");
      }

      return response.data;
    }

    return response.data;
  } catch (error) {
    // Detailed error logging to capture server 500 body
    console.error("❌ Login failed");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    if (error.config)
      console.error(
        "Request attempted:",
        error.config.url,
        error.config.method,
        error.config.data,
      );
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error(
        "No response received. Possible network/CORS/server-down issue.",
      );
    }
    // Re-throw so caller can display friendly message
    throw error;
  }
};

export const adminLogout = async () => {
  try {
    await API.post("/admin/logout");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  } catch (error) {
    // Clear local storage even if logout fails
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await API.post("/admin/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 2. Verify OTP
export const verifyOtp = async (email, otp) => {
  try {
    const response = await API.post("/admin/verify-otp", { email, otp });
    console.log("otp verfiy", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};
// 3. Reset Password (PUT Method)
export const resetPassword = async (data) => {
  try {
    const response = await API.put("/admin/reset-password", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Services/adminService.js mein
export const getAdminProfile = async (id) => {
  try {
    const response = await API.get("/admin/get-all"); // get all admins
    const admin = response.data.admins.find((a) => a._id === id);
    if (!admin) throw new Error("Admin not found");
    return { status: true, data: admin };
  } catch (error) {
    throw error;
  }
};

// adminService.js

export const updateAdminProfile = async (id, data) => {
  try {
    const response = await API.put(`/admin/update/${id}`, data);
    console.log("update profile", response);

    if (response.data.status) {
      localStorage.setItem("adminUser", JSON.stringify(response.data.admin));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
// ==========================
// 2. CATEGORY METHODS
// ==========================

export const getAllCategories = async () => {
  try {
    console.log("📡 Flow: Fetching Categories...");
    const response = await API.get("/category/get-all");
    console.log("✅ Flow: Categories List Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Get Categories Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const getCategoryById = (id) => {
  return apiClient.get(`/category/get-by-id/${id}`);
};
export const createCategory = async (data) => {
  try {
    console.log("🚀 Flow: Creating Category Payload:", data);
    const response = await API.post("/category/create", data);
    console.log("✅ Flow: Create Category Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Create Category Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    console.log(`🔄 Flow: Updating Category ID: ${id}`, data);
    const response = await API.put(`/category/update/${id}`, data);
    console.log("✅ Flow: Update Category Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Update Category Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    console.log(`🗑️ Flow: Trying Delete with ID: ${id}`);
    const response = await API.delete(`/category/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Flow: Delete Error:", error.response?.data);
    throw error;
  }
};

// ==========================
// 3. SUBCATEGORY METHODS
// ==========================

export const getAllSubCategories = async () => {
  try {
    console.log("📡 Flow: Fetching SubCategories...");
    const response = await API.get("/subcategory/get-all");
    console.log("✅ Flow: SubCategories List Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Get SubCategories Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
// Temporary fix - direct API call
export const getSubCategoryById = (id) => {
  const token = localStorage.getItem("adminToken");

  return fetch(
    `https://lawnode.rxchartsquare.com/subCategory/get-by-id/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    },
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("SubCategory by ID response:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching subcategory:", error);
      throw error;
    });
};
export const createSubCategory = async (data) => {
  try {
    // Parameters expected: category (ID), subCategoryName
    console.log("🚀 Flow: Creating SubCategory Payload:", data);
    const response = await API.post("/subcategory/create", data);
    console.log("✅ Flow: Create SubCategory Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Create SubCategory Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// adminService.js (Sirf updateSubCategory wala hissa badlein ya check karein)

export const updateSubCategory = async (id, formData) => {
  try {
    console.log(`🔄 Flow: Updating SubCategory ID: ${id}`);

    // Debugging ke liye FormData check karein
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await API.put(`/subcategory/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Flow: Update SubCategory Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Update SubCategory Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const deleteSubCategory = async (id) => {
  try {
    console.log(`🗑️ Flow: Trying Delete SubCategory with ID: ${id}`);
    const response = await API.delete(`/subcategory/delete/${id}`);
    console.log("✅ Flow: Delete SubCategory Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Delete SubCategory Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// // ==========================
// // ARTICLE METHODS
// // ==========================

// export const createArticle = async (formData) => {
//   const response = await API.post("/article/create", formData);
//   return response.data;
// };

// export const getAllArticles = async () => {
//   const response = await API.get("/article/get-all");
//   console.log("article",response.data)
//   return response.data;
// };

// export const getArticleById = async (id) => {
//   const response = await API.get(`/article/get-by-id/${id}`);
//   return response.data;
// };

// export const updateArticle = async (id, formData) => {
//   // Parameters: title, content, category, featureImage, videoLink, status, featured
//   const response = await API.put(`/article/update/${id}`, formData);
//   return response.data;
// };

// export const deleteArticle = async (id) => {
//   const response = await API.delete(`/article/delete/${id}`);
//   return response.data;
// };
// ==========================
// 4. USER METHODS
// ==========================

// Get all users
export const getAllUsers = async () => {
  const response = await API.get("/user/get-all");
  console.log("user", response.data);

  return response.data;
};

// Update user (FormData handle karega profilePic)
export const updateUser = async (id, formData) => {
  console.log(`🔄 Flow: Updating User ID: ${id}`);
  const response = await API.put(`/user/update/${id}`, formData);
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  console.log(`🗑️ Flow: Deleting User ID: ${id}`);
  const response = await API.delete(`/user/delete/${id}`);
  return response.data;
};

// --- MEDIA TYPE APIs ---
export const getAllMediaTypes = () => API.get("/media-type/get-all");
export const createMediaType = (data) => API.post("/media-type/create", data);
export const getMediaTypeById = (id) => API.get(`/media-type/get-by-id/${id}`);
export const updateMediaType = (id, data) =>
  API.put(`/media-type/update/${id}`, data);
export const deleteMediaType = (id) => API.delete(`/media-type/delete/${id}`);

// --- MEDIA APIs ---
export const getAllMedia = () => API.get("/media/get-all");
export const createMedia = (formData) =>
  API.post("/media/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getMediaById = (id) => API.get(`/media/get-by-id/${id}`);
export const updateMedia = (id, formData) =>
  API.put(`/media/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteMedia = (id) => API.delete(`/media/delete/${id}`);
// ==========================
// COMMENT METHODS
// ==========================

// 1. Get All Comments
export const getAllComments = async () => {
  try {
    console.log("📡 Flow: 1. Fetching All Comments...");
    const response = await API.get("/comment/get-all");
    console.log("✅ Flow: 2. All Comments Received:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Flow: Get All Comments Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// 2. Create Comment
export const createComment = async (data) => {
  try {
    console.log("🚀 Flow: Creating Comment...", data);
    const response = await API.post("/comment/create", data);
    return response.data;
  } catch (error) {
    console.error("❌ Flow: Create Error:", error.response?.data);
    throw error;
  }
};

// 3. Update Comment
export const updateComment = async (id, data) => {
  try {
    console.log(`🔄 Flow: Updating Comment ID: ${id}`, data);
    const response = await API.put(`/comment/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("❌ Flow: Update Error:", error.response?.data);
    throw error;
  }
};

// 4. Delete Comment
export const deleteComment = async (id) => {
  try {
    console.log(`🗑️ Flow: Deleting Comment ID: ${id}`);
    const response = await API.delete(`/comment/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Flow: Delete Error:", error.response?.data);
    throw error;
  }
};

// ========== ABOUT US APIs ==========
// --- ABOUT US APIs ---
export const getAllAboutUs = async () => {
  const response = await API.get("/aboutus/get-all");
  return response.data; // Response contains status, data { mission, sections }
};
export const createAboutUs = (formData) =>
  API.post("/aboutus/create", formData);
export const updateAboutUs = (id, formData) =>
  API.put(`/aboutus/update/${id}`, formData);
export const deleteAboutUs = (id) => API.delete(`/aboutus/delete/${id}`);

// --- TERMS & CONDITIONS APIs ---
export const getAllTerms = async () => {
  const res = await API.get("/terms/get-all");
  console.log("GET ALL TERMS:", res.data);
  return res.data;
};
export const createTerms = (data) => API.post("/terms/create", data);
export const updateTerms = (id, data) => API.put(`/terms/update/${id}`, data);
export const deleteTerms = (id) => API.delete(`/terms/delete/${id}`);

// --- PRIVACY POLICY APIs ---
export const getAllPrivacy = async () => {
  try {
    const res = await API.get("/privacy/get-all");
    console.log("GET ALL PRIVACY:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "❌ Error fetching privacy policies:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const createPrivacy = (data) => API.post("/privacy/create", data);
export const updatePrivacy = (id, data) =>
  API.put(`/privacy/update/${id}`, data);
export const deletePrivacy = (id) => API.delete(`/privacy/delete/${id}`);

// ==========================================
// ADMIN CONTACT US METHODS (Fixed)
// ==========================================

// 1. Create Contact Us
export const createContactUs = async (data) => {
  console.log("API CALL: Create Contact Us - Data:", data);
  try {
    // raw axios ki jagah API instance use karein
    const response = await API.post("/admin-contact/create", data);
    console.log("API RESPONSE: Create Contact Us:", response.data);
    return response.data;
  } catch (error) {
    console.error("API ERROR: Create Contact Us:", error);
    throw error;
  }
};

// 2. Get All Contact Us
export const getAllContactUs = async () => {
  console.log("API CALL: Get All Contact Us");
  try {
    const response = await API.get("/admin-contact/get-all");
    console.log("API RESPONSE: Get All Contact Us:", response.data);
    return response.data;
  } catch (error) {
    console.error("API ERROR: Get All Contact Us:", error);
    throw error;
  }
};

// 3. Get Contact Us By ID
export const getContactById = async (id) => {
  console.log(`API CALL: Get Contact By ID - ID: ${id}`);
  try {
    const response = await API.get(`/admin-contact/get-by-id/${id}`);
    console.log("API RESPONSE: Get Contact By ID:", response.data);
    return response.data;
  } catch (error) {
    console.error("API ERROR: Get Contact By ID:", error);
    throw error;
  }
};

// 4. Update Contact Us
export const updateContactUs = async (id, data) => {
  console.log(`API CALL: Update Contact Us - ID: ${id}, Data:`, data);
  try {
    const response = await API.put(`/admin-contact/update/${id}`, data);
    console.log("API RESPONSE: Update Contact Us:", response.data);
    return response.data;
  } catch (error) {
    console.error("API ERROR: Update Contact Us:", error);
    throw error;
  }
};

// 5. Delete Contact Us
export const deleteContactUs = async (id) => {
  console.log(`API CALL: Delete Contact Us - ID: ${id}`);
  try {
    const response = await API.delete(`/admin-contact/delete/${id}`);
    console.log("API RESPONSE: Delete Contact Us:", response.data);
    return response.data;
  } catch (error) {
    console.error("API ERROR: Delete Contact Us:", error);
    throw error;
  }
};

// ==========================================
// ADMIN Events METHODS
// ==========================================
export const getALLEvents = async () => {
  try {
    const response = await API.get("/events/get-all");
    return response.data;
  } catch (error) {
    console.error("API ERROR: Get All Events:", error);
    throw error;
  }
};

export const createEvent = async (formData) => {
  try {
    const response = await API.post("/events/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("API ERROR: Create Event:", error);
    throw error;
  }
};

export const toggleEventStatus = (id, status) => {
  return API.put(`/events/toggle-status/${id}`, { status });
};
export const updateEvent = (id, data) => {
  return API.put(`/events/update/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteEvent = async (id) => {
  try {
    const response = await API.delete(`/events/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("API ERROR: Delete Event:", error);
    throw error;
  }
};
// ==========================================
// ADMIN Video METHODS
// ==========================================

// Get all videos
export const getAllVideos = async () => {
  try {
    const response = await API.get("/videos/get-all");
    // console.log("API RESPONSE: Get All Videos:", response.data);
    return response.data;
  } catch (error) {
    console.error("API ERROR: Get All Videos:", error);
    throw error;
  }
  // return axios.get(`/videos/get-all`);
};

// Create video
export const createVideo = async (data) => {
  try {
    const response = await API.post("/videos/create", data);
    return response.data;
  } catch (error) {
    console.error("API ERROR: Create Video:", error);
    throw error;
  }
  // return axios.post(`/videos/create`, data);
};

// Update video
export const updateVideo = async (id, data) => {
  try {
    const response = await API.put(`/videos/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("API ERROR: Update Video:", error);
    throw error;
  }
};

// Delete video
export const deleteVideo = async (id) => {
  // return axios.delete(`/videos/delete/${id}`);
  try {
    const response = await API.delete(`/videos/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("API ERROR: Delete Video:", error);
    throw error;
  }
};
