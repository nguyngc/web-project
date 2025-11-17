import React from "react";
import { Button } from "react-bootstrap";

const GradientButton = ({ children, type = "button", className = "", ...props }) => {
  return (
    <Button
      type={type}
      className={`flex items-center justify-center gap-3 w-full px-6 py-2.5 rounded-lg 
        bg-gradient-to-b from-[rgba(21,158,236,0.5)] to-[#159EEC] 
        text-white text-sm font-medium hover:opacity-90 transition-opacity
        ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GradientButton;
