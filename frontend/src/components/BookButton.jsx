import { Link } from 'react-router-dom';
function BookButton({ className, link, text }) {
  const baseClasses =
    "px-6 md:px-[30px] py-3 rounded-[10px] text-sm font-poppins font-semibold uppercase hover:opacity-90 transition-opacity";

  return (
    <Link to={link} className={`${baseClasses} ${className}`}>
      {text}
    </Link>
  );
}
export default BookButton;