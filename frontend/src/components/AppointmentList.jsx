import { useState, useEffect } from "react";
import { Calendar, Clock, Eye, User, FileText, CheckCircle, XCircle, ChevronDown } from "lucide-react";

function AppointmentList() {//{ doctorId }
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const doctorId = "64f123abc456def789012345";

    useEffect(() => {
        async function fetchAppointments() {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:4000/appointments?doctorId=${doctorId}`);
                if (!res.ok) throw new Error("Failed to fetch appointments");
                const data = await res.json();
                setAppointments(data);
            } catch (err) {
                console.error("Error fetching appointments:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchAppointments();
    }, [doctorId]);


    return (

        <div className="w-full px-4 lg:px-[200px] py-8">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                    <div className="bg-white rounded-2xl border border-black/10 p-6 flex flex-col gap-10">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex flex-col gap-2.5">
                                <h1 className="text-[#0A0A0A] text-base font-medium">Appointment Schedule</h1>
                                <p className="text-[#717182] text-base">View and manage all your appointments</p>
                            </div>

                            <div className="bg-[#F3F3F5] rounded-lg px-3 py-2 flex items-center justify-between gap-2 min-w-[192px]">
                                <span className="text-[#0A0A0A] text-sm">All Appointments</span>
                                <ChevronDown className="w-4 h-4 text-[#717182] opacity-50" />
                            </div>
                        </div>

                        {/* Appointment Cards */}
                        <div className="flex flex-col gap-4">
                            {loading ? (
                                <p>Loading appointments...</p>
                            ) : appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <div
                                        key={appointment._id} // dùng _id từ MongoDB
                                        className="border-l-4 border rounded-2xl p-4 flex flex-col lg:flex-row justify-between items-start gap-4"
                                        style={{ borderColor: appointment.statusColor || "#159EEC" }}
                                    >
                                        {/* Left Side */}
                                        <div className="flex-1 flex flex-col gap-4">
                                            <div className="flex flex-wrap items-center gap-5">
                                                <h3 className="text-[#101828] text-base">{appointment.patientName}</h3>
                                                <div
                                                    className="px-2.5 py-0.5 rounded-lg"
                                                    style={{ backgroundColor: appointment.statusColor || "#159EEC" }}
                                                >
                                                    <span className="text-white text-xs font-medium">{appointment.status}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-[#4A5565]" />
                                                    <span className="text-[#4A5565] text-sm">{appointment.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4 text-[#4A5565]" />
                                                    <span className="text-[#4A5565] text-sm">{appointment.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Eye className="w-4 h-4 text-[#4A5565]" />
                                                    <span className="text-[#4A5565] text-sm">{appointment.type}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-[#4A5565]" />
                                                    <span className="text-[#4A5565] text-sm">{appointment.time}</span>
                                                </div>
                                            </div>

                                            {appointment.notes && (
                                                <div className="bg-[#F9FAFB] rounded-lg p-3 flex items-start gap-2">
                                                    <span className="text-[#364153] text-sm font-bold">Notes:</span>
                                                    <span className="text-[#364153] text-sm">{appointment.notes}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Side */}
                                        {appointment.status === "confirmed" && (
                                            <div className="flex flex-col gap-2 w-full lg:w-[120px]">
                                                <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-black/10 bg-white hover:bg-gray-50 transition-colors">
                                                    <FileText className="w-4 h-4 text-[#0A0A0A]" />
                                                    <span className="text-[#0A0A0A] text-sm font-medium">Add Notes</span>
                                                </button>
                                                <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#3F9C36] hover:bg-[#368230] transition-colors">
                                                    <CheckCircle className="w-4 h-4 text-white" />
                                                    <span className="text-white text-sm font-medium">Complete</span>
                                                </button>
                                                <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#B43F3F] hover:bg-[#9C3636] transition-colors">
                                                    <XCircle className="w-4 h-4 text-white" />
                                                    <span className="text-white text-sm font-medium">Cancel</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No appointments found</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>


    );
}
export default AppointmentList
