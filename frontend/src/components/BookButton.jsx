import { Link } from 'react-router-dom';
function BookButton({ className }) {
  const baseClasses =
    "px-6 md:px-[30px] py-3 rounded-[10px] text-sm font-poppins font-semibold uppercase hover:opacity-90 transition-opacity";

  return (
    <Link to="/bookApp" className={`${baseClasses} ${className}`}>
      BOOK AN APPOINTMENT
    </Link>
  );
}
export default BookButton;