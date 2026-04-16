import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : "https://node.sapiencedesk.com",
});
console.log("✅ Axios API initialized");
console.log("Mode:", import.meta.env.DEV ? "DEV (proxy enabled)" : "PROD");
console.log("BaseURL being used:", API.defaults.baseURL); // Debug ke liye

// Request Interceptor
API.interceptors.request.use(
  (config) => {
    console.log(
      `📤 Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`,
    );

    // Log request data for debugging (especially for POST/PUT)
    if ((config.method === "post" || config.method === "put") && config.data) {
      if (config.data instanceof FormData) {
        // FormData cannot be directly logged, so we log a note
        console.log("📦 Request Data: FormData (file upload)");
      } else {
        console.log("📦 Request Data:", JSON.stringify(config.data, null, 2));
      }
    }

    const token = localStorage.getItem("adminToken");
    if (token && !config.url.includes("/admin/login")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
API.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: ${response.status}`);
    return response;
  },
  (error) => {
    // Detailed error logging for debugging
    console.error("❌ Error occurred");
    console.error("Error type:", error.code);
    console.error("Error message:", error.message);

    if (error.response) {
      // Server responded with error status
      console.error("HTTP Status:", error.response.status);
      console.error("Response Headers:", error.response.headers);
      console.error("Response Data:", error.response.data);

      // If it's a 500 error, log more debugging info
      if (error.response.status === 500) {
        console.error("🔴 SERVER ERROR (500) - Check server logs");
        console.error("Request URL:", error.config?.url);
        console.error("Request Method:", error.config?.method);
        console.error(
          "Request Data:",
          error.config?.data instanceof FormData
            ? "FormData"
            : error.config?.data,
        );
      }
    } else if (error.request) {
      // Request was made but no response
      console.error("No response - Network/CORS issue");
      console.error("Requested URL:", error.config?.url);
      console.error("Base URL:", error.config?.baseURL);
    } else {
      // Request setup error
      console.error("Setup error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default API;
