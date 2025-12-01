import ServiceCard from "./ServiceCard";
import Spinner from "./common/Spinner";
import useFetch from "../hooks/useFetch";

function ServiceCards() {
  const { data: dataServices, loading, error } = useFetch('/api/services?isActive=true', {}, true);

  return (
    <section className="flex flex-col gap-12 px-4 lg:px-[200px] py-12 w-full max-w-[1440px] mx-auto">
      <h2 className="text-[#1C398E] text-3xl md:text-4xl font-medium text-center">
        Our Services
      </h2>

      {loading && <Spinner loading={loading} />}

      {!loading && !error && Array.isArray(dataServices) && (
        <div className="flex flex-col gap-16 w-full max-w-[1040px] mx-auto">
          {dataServices.length === 0 ? (
            <p className="text-center">No services available at the moment.</p>
          ) : (
            dataServices.map((service, index) => (
              <ServiceCard
                key={service._id}
                service={service}
                reverse={index % 2 !== 0}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default ServiceCards;
