import React from "react";
import Sidebar from "../components/Sidebar";

const security = ({ theme, setTheme }) => {
  return (
    <div>
      <Sidebar theme={theme} setTheme={setTheme}></Sidebar>
    </div>
  );
};

export default security;
