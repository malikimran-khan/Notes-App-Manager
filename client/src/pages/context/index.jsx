import React from "react";
import { AuthProvider } from "./AuthContext";
import { NoteProvider } from "./NoteContext"; 

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <NoteProvider>
        {children}
      </NoteProvider>
    </AuthProvider>
  );
};
