import { useEffect } from 'react';
import BookButton from './BookButton';
import PageLinks from './PageLinks';

function Navigation({ mobileMenuOpen, currentUser }) {
  const userRole = currentUser?.role;
  let link = "/bookApp";
  let text = "Book An Appointment";

  if (userRole === 'doctor' || userRole === 'admin') {
    link = "/" + userRole;
    text = "Dashboard";
  }

  return (
    <nav
      className={`${mobileMenuOpen ? "flex" : "hidden"} lg:flex flex-col lg:flex-row 
                  absolute lg:relative top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent items-center 
                  gap-6 lg:gap-8 p-6 lg:p-0 shadow-lg lg:shadow-none z-50`}
    >
      <PageLinks parentClass="flex flex-col lg:flex-row gap-6 lg:gap-8" itemClass="text-vision-primary text-sm font-poppins font-semibold uppercase hover:text-vision-secondary transition-colors" />
      <BookButton className="bg-linear-to-b from-[#1C398E] to-[#6E85C3] text-white"
        link={link} text={text}
      />
    </nav>
  );
}

export default Navigation;