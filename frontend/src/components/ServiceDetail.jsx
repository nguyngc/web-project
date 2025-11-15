import { useParams } from "react-router-dom";
import dataServices from "../data/dataServices";
import { Link } from "react-router-dom";
import { Calendar, Clock, Currency, Wallet2 } from "lucide-react";

function ServiceDetail() {
    const { slug } = useParams();
    const service = dataServices.find((s) => s.url.endsWith(slug));

    if (!service) {
        return (
            <div className="p-8">
                <h2 className="text-red-600 text-xl">Service not found</h2>
                <Link to="/services" className="text-blue-600 underline">
                    ← Back to Services
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            {/* Hero section */}
            <section className="relative h-[300px] md:h-[400px] w-full">
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                />

                {/* Nút quay lại */}
                <div className="absolute top-4 left-4 z-10">
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 bg-[#4458cb] text-white font-bold hover:underline"
                    >
                        ← Back to Services
                    </Link>
                </div>

                {/* Overlay */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1040px] bg-[#4458cb] flex flex-col items-center justify-center text-center py-6 rounded-t-lg">
                    <h1 className="text-white text-3xl md:text-4xl font-bold">
                        {service.name}
                    </h1>
                    <p className="text-white text-lg md:text-xl font-medium mt-2">
                        {service.shortDescription}
                    </p>
                </div>
            </section>

            <section className="py-12 w-[1040px] mx-auto">
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#FEE9E9] rounded-lg p-6 text-center flex flex-col items-center gap-2">
                        <Clock className="w-8 h-8 text-[#0b219c] " />
                        <h3 className="font-semibold">Duration</h3>
                        <p>{service.duration}</p>
                    </div>
                    <div className="bg-[#FEE9E9] rounded-lg p-6 text-center flex flex-col items-center gap-2">
                        <Wallet2 className="w-8 h-8 text-[#0b219c] " />
                        <h3 className="font-semibold">Price</h3>
                        <p>{service.price}</p>
                    </div>
                    <div className="bg-[#FEE9E9] rounded-lg p-6 text-center flex flex-col items-center gap-2">
                        <Calendar className="w-8 h-8 text-[#0b219c] " />
                        <h3 className="font-semibold">Frequency</h3>
                        <p>{service.frequency}</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center px-[200px] py-[50px] gap-[10px] w-[1px] mx-auto">
                    <div className="w-[1040px] h-[200px] bg-[#FEE9E9] shadow-[0px_12px_4px_rgba(0,0,0,0.25)] flex items-center justify-center relative">
                        <p className="absolute left-[11px] top-[19px] w-[998px] h-[126px] font-inter text-[16px] leading-[24px] text-black whitespace-pre-line">
                            {service.fullDescription}
                        </p>
                    </div>
                    <div className="flex flex-row items-start gap-[10px] w-[1040px] mt-6 mb-20">
                        {/* Frame 10 - What's Included */}
                        <div className="w-[510px]  relative rounded-lg border border-pink-200">
                            <h3 className="absolute left-[100px] top-10 font-inter text-[16px] leading-[24px] text-black font-semibold">
                                What's Included
                            </h3>
                            <ul className="absolute left-[100px] top-[70px] w-[250px] h-[257px] font-inter text-[16px] leading-[24px] text-black list-disc pl-4">
                                {service.features.map((f, i) => (
                                    <li key={i}>{f}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Frame 11 - Key Benefits */}
                        <div className="w-[510px]  relative rounded-lg border border-pink-200">
                            <h3 className="absolute left-[100px] top-10 font-inter text-[16px] leading-[24px] text-black font-semibold">
                                Key Benefits
                            </h3>
                            <ul className="absolute left-[100px] top-[70px] w-[327px] h-[195px] font-inter text-[16px] leading-[24px] text-black list-disc pl-4">
                                {service.benefits.map((b, i) => (
                                    <li key={i}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ServiceDetail;
