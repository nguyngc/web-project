import ServiceLink from "./ServiceLink";
import useFetch from "../hooks/useFetch";

function ServiceLinks() {
  const { data: dataServices, loading, error } = useFetch('/api/services?isActive=true', {}, true);

  return (
    <>
      {!loading && !error && Array.isArray(dataServices) && (
        <nav className="flex flex-col gap-2">
          {dataServices.length === 0 ? (
            <p className="text-center">No services available at the moment.</p>
          ) : (
            dataServices.map((service) => {
              return <ServiceLink key={service._id} item={service} />;
            })
          )}
        </nav >
      )}
    </>
  );
}

export default ServiceLinks;