import { Link } from 'react-router-dom';
import BookButton from './BookButton';

function Navigation({ mobileMenuOpen }) {
  return (
    <nav
      className={`${mobileMenuOpen ? "flex" : "hidden"
        } lg:flex absolute lg:relative top-full left-0 right-0 lg:top-auto bg-white lg:bg-transparent flex-col lg:flex-row items-center gap-6 lg:gap-2.5 p-6 lg:p-0 shadow-lg lg:shadow-none z-50`}
    >
      <Link
        to="/"
        className="text-vision-primary text-sm font-poppins font-semibold uppercase hover:text-vision-secondary transition-colors"
      >
        Home
      </Link>
      <Link
        to="/about"
        className="text-vision-primary text-sm font-poppins font-semibold uppercase hover:text-vision-secondary transition-colors"
      >
        About Us
      </Link>
      <Link
        to="/services"
        className="text-vision-primary text-sm font-poppins font-semibold uppercase hover:text-vision-secondary transition-colors"
      >
        Services
      </Link>
      <Link
        to="/news"
        className="text-vision-primary text-sm font-poppins font-semibold uppercase hover:text-vision-secondary transition-colors"
      >
        News
      </Link>
      <Link
        to="/contact"
        className="text-vision-primary text-sm font-poppins font-semibold uppercase hover:text-vision-secondary transition-colors"
      >
        Contact Us
      </Link>
      <BookButton className="bg-linear-to-b from-[#1C398E] to-[#6E85C3] text-white" />
    </nav>
  );
}

export default Navigation;