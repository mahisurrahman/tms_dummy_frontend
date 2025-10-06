import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userAPI } from "../api/endpoints/user.api";

export const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userAccessToken, setUserAccessToken] = useState(null);

  const handleLoginData = async (userCreds) => {
    try {
      setLoading(true);
      let loginUser = await userAPI.loginUser(userCreds);

      if (loginUser?.error === false) {
        const getUserDetails = await userAPI.getUserInfo(
          loginUser?.data?.accessToken
        );

        console.log(getUserDetails, "User Details");

        const userData = loginUser?.data;
        const userInfo = getUserDetails?.data;

        // Store in localStorage
        localStorage.setItem("userCreds", JSON.stringify(userData));
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        // Update state
        setUser(userInfo);
        setUserAccessToken(userData.accessToken);

        setLoading(false);

        // 🔑 return BOTH token & user info
        return { ...userData, userInfo };
      }
    } catch (error) {
      toast.error("❌ Failed !! Login Creds Doesn't match !!");
      setLoading(false);
      return null;
    }
  };

  const getUserData = () => {
    try {
      setLoading(true);
      let getUserDetails = JSON.parse(localStorage.getItem("userInfo"));
      let getUserAccessToken = JSON.parse(
        localStorage.getItem("userCreds")
      )?.accessToken;

      if (getUserDetails && getUserAccessToken) {
        setUser(getUserDetails);
        setUserAccessToken(getUserAccessToken);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    return new Promise((resolve) => {
      localStorage.removeItem("userCreds");
      localStorage.removeItem("userInfo");
      setUser(null);
      setUserAccessToken(null);
      resolve(true);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    handleLoginData,
    handleLogout,
    userAccessToken,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
