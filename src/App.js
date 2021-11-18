import React from "react";

import AuthProvider from "./context/AuthContext";

import Router from "./AppRouter"



function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
