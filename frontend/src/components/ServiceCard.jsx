import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const ServiceCard = ({ image, title, description, extra, features, CTA, url, reverse }) => {
    return (
        <div
            className={`flex flex-row items-start gap-[25px] w-[1040px] h-[386px] shadow-[0_12px_4px_rgba(0,0,0,0.25)] ${reverse ? "flex-row-reverse" : ""
                }`}
        >
            {/* Image Card */}
            <div
                className="flex flex-col items-center p-[30px] gap-[15px] w-[510px] h-[386px] border border-[rgba(191,210,248,0.2)] rounded-[20px]"
                style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
            ></div>

            {/* Text Card */}
            <div className="flex flex-col items-start px-[30px] pb-[30px] gap-[15px] w-[505px] h-[386px] bg-[#F2F2F7] border border-[rgba(191,210,248,0.2)] rounded-[20px]">
                <h2 className="w-full text-[#1C398E] text-[20px] leading-[18px] font-inter font-medium tracking-[2px] text-center mt-4">
                    {title}
                </h2>
                <p className="text-[#102C56] text-[14px] leading-[24px]">
                    {description}
                </p>
                <p className="text-[#102C56] text-[14px] leading-[18px] font-semibold">
                    {extra}
                </p>

                {features && (
                    <ul className="flex flex-col gap-4">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-[#0088FF] font-bold mt-1" strokeWidth={3} />
                                <span className="text-[#102C56] text-[14px] leading-[24px]">{feature}</span>
                            </li>

                        ))}
                    </ul>
                )}

                <Link
                    to={url}
                    className=" self-end w-[132px] h-[24px] text-[14px] leading-[18px] text-center text-[#0088FF] font-poppins font-semibold hover:opacity-90 transition-opacity mt-auto"
                >
                    {CTA}
                </Link>
            </div>
        </div>
    );
};

export default ServiceCard;
