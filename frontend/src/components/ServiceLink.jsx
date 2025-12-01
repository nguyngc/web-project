import { Link } from 'react-router-dom';

const ServiceLink = ({ item }) => {
  const { _id, serviceName: name } = item;

  return (
    <Link to={`/services/${_id}`} className="text-[#DBEAFE] text-sm hover:text-white transition-colors">
      {name}
    </Link>
  );
}

export default ServiceLink;