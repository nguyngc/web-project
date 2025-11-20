import { useParams } from "react-router-dom";
import dataServices from "../data/dataServices";
import { Link } from "react-router-dom";
import { Calendar, Clock, DollarSign} from "lucide-react";

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

                {/* back button */}
                <div className="absolute top-4 left-4 z-10">
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 text-[#2b3eac] text-[20px] md:text-[28px] font-bold hover:underline"
                    >
                        ← Back
                    </Link>
                </div>

                {/* Overlay */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[1040px] bg-white flex flex-col justify-center py-6 rounded-t-lg px-6 md:px-10">
                    <h1 className="text-[#2b3eac] text-2xl md:text-4xl font-medium">
                        {service.name}
                    </h1>
                    <p className="text-[#2b3eac] text-base md:text-xl font-medium mt-4">
                        {service.shortDescription}
                    </p>
                </div>
            </section>

            {/* Content section */}
            <section className="py-12 w-full max-w-[1040px] mx-auto px-4">
                {/* Info cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#FEE9E9] rounded-lg p-6 text-center flex flex-col items-center gap-2">
                        <div className="flex justify-center items-center w-12 h-12 rounded-full bg-[#159EEC]">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold">Duration</h3>
                        <p>{service.duration}</p>
                    </div>
                    <div className="bg-[#FEE9E9] rounded-lg p-6 text-center flex flex-col items-center gap-2">
                        <div className="flex justify-center items-center w-12 h-12 rounded-full bg-[#159EEC]">
                            <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold">Price</h3>
                        <p>{service.price}</p>
                    </div>
                    <div className="bg-[#FEE9E9] rounded-lg p-6 text-center flex flex-col items-center gap-2">
                        <div className="flex justify-center items-center w-12 h-12 rounded-full bg-[#159EEC]">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold">Frequency</h3>
                        <p>{service.frequency}</p>
                    </div>
                </div>

                {/* Full description */}
                <div className="bg-[#FEE9E9] shadow-md rounded-lg p-6 mb-12">
                    <p className="font-inter text-[16px] leading-[24px] text-black whitespace-pre-line">
                        {service.fullDescription}
                    </p>
                </div>

                {/* What's Included & Key Benefits */}
                <div className="grid md:grid-cols-2 gap-6 mb-20">
                    <div className="rounded-lg border border-pink-200 p-6">
                        <h3 className="font-inter text-[16px] leading-[24px] text-black font-semibold mb-4">
                            What's Included
                        </h3>
                        <ul className="list-disc pl-6 space-y-2">
                            {service.features.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-lg border border-pink-200 p-6">
                        <h3 className="font-inter text-[16px] leading-[24px] text-black font-semibold mb-4">
                            Key Benefits
                        </h3>
                        <ul className="list-disc pl-6 space-y-2">
                            {service.benefits.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ServiceDetail;

