import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogout = () => {
  const { setUsr, usr } = useAuthContext();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) {
      console.log("getting Imtem");
      setUsr(stored);
    }
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/newuser/logout",
        null, // No data payload for logout request
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${usr.accessToken}`,
          },
        }
      );
      console.log(response, "logged out successfully");
      const Removed = localStorage.removeItem("user");
      if (Removed === null) setUsr(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return { logout };
};
