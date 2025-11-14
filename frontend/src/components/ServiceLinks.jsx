import ServiceLink from "./ServiceLink";
import { services } from "../data/data";

function ServiceLinks() {
  return (
    <nav className="flex flex-col gap-2">
      {services.map((service) => {
        return <ServiceLink key={service.id} item={service} />;
      })}
    </nav >
  );
}

export default ServiceLinks;