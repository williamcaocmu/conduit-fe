import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const token = localStorage.getItem("jwtToken");
  const [authenticated, setAuthenticated] = useState(token ? true : false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (token) {
          const response = await axios.get(
            "http://localhost:3000/api/users/user",
            {
              headers: { Authorization: `Token ${token}` },
            }
          );

          if (response.data.user) {
            setAuthenticated(true);
            setUserProfile(response.data.user);
          } else {
            setAuthenticated(false);
            localStorage.removeItem("jwtToken");
          }
        }
      } catch (error) {
        // if token is invalid
        // step 1: set authenticated to false
        setAuthenticated(false);
        // step 2: remove token from local storage
        localStorage.removeItem("jwtToken");
      }
    };

    checkToken();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        // authentication
        authenticated,
        setAuthenticated,

        // user profile
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
