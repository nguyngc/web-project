import { Link } from 'react-router-dom';

const ServiceLink = ({ item }) => {
  const { name, link } = item;

  return (
    <Link to={link} className="text-[#DBEAFE] text-sm hover:text-white transition-colors">
      {name}
    </Link>
  );
}

export default ServiceLink;