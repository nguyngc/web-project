import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const InfoCard = ({ image, title, description, features, CTA, url}) => {
    return (
        <div className={"flex flex-col lg:flex-row items-stretch gap-12"}>
            {/* Image */}
            <div className="flex-1">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded-[10px] shadow"
                />
            </div>

            {/* Text */}
            <div className="flex-1 flex flex-col gap-6 max-w-[472px]">
                <h2 className="text-[#1C398E] text-3xl md:text-4xl font-inter font-medium tracking-[2px]">
                    {title}
                </h2>
                <p className="text-vision-text-light text-base leading-[30px]">
                    {description}
                </p>

                {/* if features exist */}
                {features && (
                    <ul className="flex flex-col gap-4">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="bg-vision-secondary rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                                </div>
                                <span className="text-vision-text text-base leading-6">{feature}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <Link
                    to={url}
                    className="bg-linear-to-b from-[rgba(21,158,236,0.5)] to-[#159EEC] text-white px-6 py-3 rounded-[10px] shadow-[0_4px_4px_0_rgba(37,57,169,0.25)] text-sm font-poppins font-semibold hover:opacity-90 transition-opacity w-fit"
                >
                    {CTA}
                </Link>
            </div>
        </div>
    );
};

export default InfoCard;
