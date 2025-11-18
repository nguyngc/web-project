import Badge from "react-bootstrap/Badge";

const StatusBox = ({ children, variant = "user", className }) => {
  const variantClasses = {
    active: "bg-[#3F9C36] text-white",
    inactive: "bg-[#ECEEF2] text-[#030213]",
    doctor: "bg-[#BFD2F8] text-[#364153]",
    admin: "bg-[#159EEC] text-white",
    user: "bg-[#ECEEF2] text-[#030213]",
  };

  return (
    <Badge
      pill
      bg="" // important: disable Bootstrap colors
      className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Badge>
  );
}

export default StatusBox;