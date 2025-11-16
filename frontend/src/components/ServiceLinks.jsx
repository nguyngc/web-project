import ServiceLink from "./ServiceLink";
import dataServices from "../data/dataServices";

function ServiceLinks() {
  return (
    <nav className="flex flex-col gap-2">
      {dataServices.map((service) => {
        return <ServiceLink key={service.serviceID} item={service} />;
      })}
    </nav >
  );
}

export default ServiceLinks;