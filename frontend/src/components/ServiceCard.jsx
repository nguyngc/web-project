import { Link } from "react-router-dom";

const ServiceCard = ({ service, reverse }) => {
    const { _id, serviceName: name, shortDescription, image, features } = service;
    const featureList = features.split(';');

    return (
        <div
            className={`flex flex-col lg:flex-row items-stretch gap-[25px] w-full max-w-[1040px] rounded-[20px]  ${reverse ? "lg:flex-row-reverse" : ""
                }`}
        >
            {/* Image */}
            <div
                className="w-full lg:w-[510px] min-h-[200px] rounded-[20px] border border-[rgba(191,210,248,0.2)] shadow-[0_12px_4px_rgba(0,0,0,0.25)] bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            ></div>

            {/* Text */}
            <div className="flex flex-col items-start px-[30px] pb-[30px] gap-[12px] w-full lg:w-[505px] border border-[rgba(191,210,248,0.2)] shadow-[0_12px_4px_rgba(0,0,0,0.25)] rounded-[20px]">
                {/* Title */}
                <h2 className="w-full text-[#B43F3F] text-[20px] leading-[24px] font-inter font-medium tracking-[2px] text-center mt-4">
                    {name}
                </h2>

                {/* Description */}
                <p className="text-[#102C56] text-[14px] leading-[22px]">
                    {shortDescription}
                </p>
                {/* Extra */}
                <p className="text-[#102C56] text-[14px] leading-[20px] font-semibold">
                    What's inclued:
                </p>

                {/* Features list */}
                {featureList && (
                    <ul className="flex flex-col gap-2 pl-6 list-disc">
                        {featureList.map((feature, index) => (
                            <li
                                key={index}
                                className="text-[#102C56] text-[14px] leading-[20px] font-inter font-normal"
                            >
                                {feature}
                            </li>
                        ))}
                    </ul>
                )}

                {/* CTA - Learn more*/}
                <Link
                    to={`/services/${_id}`}
                    className="mt-auto text-[14px] leading-[20px] text-[#0088FF] font-poppins font-semibold hover:opacity-90 transition-opacity"
                >
                    Learn More...
                </Link>
            </div>
        </div>
    );
};

export default ServiceCard;
