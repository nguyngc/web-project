import { useLocation } from "react-router-dom";
import { Calendar, Clock, MapPin, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";


function Confirm() {
    const location = useLocation();

    const { date, slot } = location.state || {};
    return (
        <section className="flex flex-col items-center px-4 sm:px-[200px] py-[50px] gap-8 w-full max-w-[1440px] mx-auto bg-[#F9FAFB]">
            {/* Icon + Heading */}
            <div className="flex flex-col items-center gap-4 w-full max-w-[1040px]">
                {/* Success Icon */}
                <div className="flex justify-center items-center w-20 h-20 bg-[#DCFCE7] rounded-full">
                    <CheckCircle className="w-10 h-10 text-[#00A63E]" />
                </div>

                {/* Heading */}
                <h2 className="text-center font-inter font-medium text-[24px] leading-[24px] text-[#0D542B]">
                    Appointment Confirmed!
                </h2>

                {/* Paragraph */}
                <p className="text-center font-inter text-[16px] leading-[24px] text-[#4A5565]">
                    Your appointment has been successfully scheduled.
                </p>
            </div>

            {/* Card */}
            <div className="flex flex-col justify-center items-center p-6 gap-6 w-full max-w-[341px] bg-white border border-black/10 rounded-xl shadow">
                {/* Card Title */}
                <h3 className="font-inter font-medium text-[20px] text-[#0A0A0A]">
                    Appointment Details
                </h3>

                {/* Card Content */}
                <div className="flex flex-col items-start gap-4 w-full px-2">
                    {/* Date */}
                    <div className="flex flex-row items-center gap-3">
                        <Calendar className="w-5 h-5 text-[#155DFC]" />
                        <p className="font-inter text-[16px] text-[#101828]">
                            {date
                                ? format(new Date(date), "EEEE, MMMM d, yyyy")
                                : format(new Date(), "EEEE, MMMM d, yyyy")}
                        </p>
                    </div>

                    {/* Time */}
                    <div className="flex flex-row items-center gap-3">
                        <Clock className="w-5 h-5 text-[#155DFC]" />
                        <p className="font-inter text-[16px] text-[#101828]">
                            {typeof slot === "string" ? slot : slot?.time || "No time selected"}
                        </p>
                    </div>

                    {/* Location */}
                    <div className="flex flex-row items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#155DFC]" />
                        <p className="font-inter text-[16px] text-[#101828]">
                            Myllypurontie 1, Helsinki
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-row flex-wrap justify-center gap-4 w-full max-w-[1040px] mt-4">
                {/* View My Appointments */}
                <button className="px-4 py-2 bg-gradient-to-b from-[#159EEC]/50 to-[#159EEC] text-white font-inter font-medium text-[14px] rounded-lg">
                    View My Appointments
                </button>

                {/* Back to Home */}
                <Link
                    to="/"
                    className="px-4 py-2 border border-black/10 bg-white text-[#0A0A0A] font-inter font-medium text-[14px] rounded-lg">
                    Back to Home
                </Link>


                {/* Print Confirmation */}
                <button className="px-4 py-2 border border-black/10 bg-white text-[#0A0A0A] font-inter font-medium text-[14px] rounded-lg">
                    Print Confirmation
                </button>
            </div>
        </section>
    );
}
export default Confirm