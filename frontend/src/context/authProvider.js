import React, { createContext, useState } from "react";
export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const [apiUrl, setApiUrl] = useState("http://localhost:9000/api");

  return (
    <AuthContext.Provider
      value={{
        posts,
        setPosts,
        apiUrl,
        setApiUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
