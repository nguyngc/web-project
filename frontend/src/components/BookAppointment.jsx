import { useState } from "react";
import { Clock, CalendarDays, AlertCircle } from "lucide-react";
import { cn } from "../lib/utils";
import Calendar from "./Calendar";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const timeSlots = [
  { id: "1", time: "9:00 AM - 10:00 AM", duration: "60 minutes", available: false },
  { id: "2", time: "10:00 AM - 11:00 AM", duration: "60 minutes", available: false },
  { id: "3", time: "11:00 AM - 12:00 AM", duration: "60 minutes", available: false },
  { id: "4", time: "2:00 PM - 3:00 PM", duration: "60 minutes", available: true },
  { id: "5", time: "3:00 PM - 4:00 PM", duration: "60 minutes", available: false },
  { id: "6", time: "4:00 PM - 5:00 PM", duration: "60 minutes", available: true },
];

function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative h-56 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(31, 43, 108, 0.5) 0%, rgba(31, 43, 108, 0.5) 100%), url('https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1200&q=80')`,
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[200px] w-full text-center">
          <h1 className="text-white text-4xl lg:text-5xl font-bold font-poppins mb-3">
            Book An Appointment
          </h1>
          <p className="text-white text-lg font-inter">
            Select a date and time that works best for you. Our expert eye care professionals are ready to help you maintain your vision health.
          </p>
        </div>
      </section>

      <section className="bg-vision-background py-8 lg:py-[30px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[200px]">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-[rgba(0,0,0,0.1)] bg-white">
              <AlertCircle className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" strokeWidth={1.33} />
              <p className="text-[#717182] text-sm leading-5">
                Appointments are 60 minutes long. Please arrive 10 minutes early to complete any necessary paperwork. If you need to cancel or reschedule, please contact us at least 24 hours in advance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col gap-6 p-6 rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-white">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-vision-secondary" strokeWidth={1.67} />
                  <h2 className="text-vision-primary text-xl font-medium font-inter leading-4">
                    Select a Date
                  </h2>
                </div>

                <div className="flex flex-col gap-6">
                  <Calendar
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />


                  <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-[#EFF6FF]">
                    <div className="flex items-center gap-2">
                      <span className="text-text-vision-text-light text-sm leading-5">Selected Date:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedDate ? (
                        <span className="text-text-vision-header text-base leading-6">
                          {format(selectedDate, "EEEE, MMMM d, yyyy")}
                        </span>
                      ) : (
                        <div className="inline-flex items-center justify-center px-2 py-0.5 rounded-lg bg-[#159EEC] self-start">
                          <span className="text-white text-xs font-medium leading-4">Today</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-8 p-6 rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-white">
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#159EEC]" strokeWidth={1.67} />
                    <h2 className="text-vision-primary text-xl font-medium font-inter leading-4">
                      Available Time Slots
                    </h2>
                  </div>
                  <p className="text-[#4A5565] text-sm leading-5 tracking-[-0.15px]">
                    {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "No date selected"}
                  </p>

                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    {timeSlots.map((slot) => {
                      const isAvailable = !selectedDate || slot.available;
                      
                      return (
                        <div
                          key={slot.id}
                          onClick={() => {
                            if (isAvailable) {
                              navigate("/confirmApp1", { state: { title: "Eye Checkup", doctor: "Dr. Smith",
                                date: selectedDate 
                                ? format(new Date(selectedDate), "EEEE, MMMM d, yyyy")
                                : "No date selected",
                                time:String(slot.time),status: "pending", } });// 
                            }
                          }}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer",
                            isAvailable
                              ? "border-[#E5E7EB] bg-white"
                              : "border-[#F3F4F6] bg-[#F9FAFB] opacity-50 cursor-not-allowed"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#DBEAFE] flex items-center justify-center flex-shrink-0">
                              <Clock className="w-5 h-5 text-[#155DFC]" strokeWidth={1.67} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[#101828] text-base leading-6">{slot.time}</span>
                              <span className="text-[#6A7282] text-sm leading-5">{slot.duration}</span>
                            </div>
                          </div>
                          <div
                            className={cn(
                              "px-2 py-0.5 rounded-lg border flex items-center justify-center",
                              isAvailable ? "border-[#3F9C36] bg-white" : "border-[#99A1AF] bg-white"
                            )}
                          >
                            <span
                              className={cn(
                                "text-xs font-medium leading-4",
                                isAvailable ? "text-[#3F9C36]" : "text-[#99A1AF]"
                              )}
                            >
                              {isAvailable ? "Available" : "Booked"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-6 border-t border-[rgba(0,0,0,0.1)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#3F9C36]" />
                        <span className="text-[#4A5565] text-sm leading-5">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#99A1AF]" />
                        <span className="text-[#4A5565] text-sm leading-5">Booked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 p-6 rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-white">
              <h2 className="text-[#0A0A0A] text-xl font-medium font-inter leading-4">
                What to Expect at Your Appointment
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#1C398E] text-base leading-6 font-inter">
                    Comprehensive Eye Exam
                  </h3>
                  <p className="text-[#4A5565] text-sm leading-5 font-inter">
                    Complete evaluation of your vision and eye health, including retinal imaging and pressure testing.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-[#1C398E] text-base leading-6 font-inter">
                    Expert Consultation
                  </h3>
                  <p className="text-[#4A5565] text-sm leading-5 font-inter">
                    Discuss your vision concerns with our experienced optometrists and receive personalized recommendations.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-[#1C398E] text-base leading-6 font-inter">
                    Prescription & Fitting
                  </h3>
                  <p className="text-[#4A5565] text-sm leading-5 font-inter">
                    If needed, receive updated prescriptions and professional assistance with eyewear selection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default BookAppointment
