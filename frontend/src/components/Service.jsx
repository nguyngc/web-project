import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Service = ({ service, reverse }) => {
  const { _id, image, serviceName: name, shortDescription} = service;

  return (
    <article
      className={`flex flex-col rounded-[14px] border border-black/10 bg-white overflow-hidden hover:shadow-lg transition-shadow ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image */}
      <div
        className="relative h-[239px] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Info */}
      <div className="p-6 flex flex-col gap-6">
        <h3 className="text-[#0f55e1] text-lg font-inter font-medium leading-[27px] text-center">
          {name}
        </h3>
        <p className="text-vision-text-light text-base leading-6">
          {shortDescription}
        </p>

        {/* CTA */}
          <Link
            to={`/services/`}
            className="flex items-center gap-2 text-[#155DFC] text-base font-medium hover:gap-3 transition-all"
          >
            Learn more
            <ArrowRight className="w-4 h-4" strokeWidth={1.33} />
          </Link>
      </div>
    </article>
  );
};

export default Service;
