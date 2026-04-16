import React, { createContext, useState, useEffect, useContext } from "react";
import { getAllMedia } from "../Services/adminService";

const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState(null);

  const updateLogo = async () => {
    try {
      const res = await getAllMedia();
      if (res.data?.status) {
        const list = res.data.data || res.data.media || [];
        const logoData = list.find(
          (item) => item.type?.type?.toLowerCase() === "logo",
        );
        if (logoData) {
          setLogoUrl(logoData.image);
        }
      }
    } catch (error) {
      console.error("Logo fetch error:", error);
    }
  };

  useEffect(() => {
    updateLogo();
  }, []);

  return (
    <MediaContext.Provider value={{ logoUrl, updateLogo }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
