function DoctorDbCard() {
  return (
    <div className="w-full flex flex-col gap-6">

      {/* ===== TOP CARDS ROW ===== */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full">

        {/* CARD 1 */}
        <div className="
          flex-1 
          bg-white 
          border border-black/10 
          rounded-[14px] 
          flex flex-row justify-between sm:justify-center items-center
          gap-6 sm:gap-10 
          px-4 py-6
        ">
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-[#4A5565] text-sm font-inter">
              Today's Appointments
            </p>
            <span className="text-[#1C398E] text-base font-inter">0</span>
          </div>

          {/* ICON */}
          <div className="w-[50px] h-[50px] border border-[#155DFC] rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="#155DFC" fill="none">
              <line x1="8" y1="4" x2="8" y2="20" strokeWidth="2" />
              <line x1="16" y1="4" x2="16" y2="20" strokeWidth="2" />
              <line x1="4" y1="8" x2="20" y2="8" strokeWidth="2" />
              <line x1="4" y1="16" x2="20" y2="16" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="
          flex-1 
          bg-white 
          border border-black/10 
          rounded-[14px] 
          flex flex-row justify-between sm:justify-center items-center
          gap-6 sm:gap-10 
          px-4 py-6
        ">
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-[#4A5565] text-sm font-inter">Upcoming</p>
            <span className="text-[#1C398E] text-base font-inter">1</span>
          </div>

          <div className="w-[50px] h-[50px] border border-[#00A63E] rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="#00A63E" fill="none">
              <circle cx="12" cy="12" r="8" strokeWidth="2" />
              <line x1="12" y1="6" x2="12" y2="12" strokeWidth="2" />
              <line x1="12" y1="12" x2="16" y2="14" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* ===== TODAY'S SCHEDULE ===== */}
      <div className="
        w-full 
        bg-white 
        border border-black/10 
        rounded-[14px] 
        flex flex-col 
        items-start 
        p-6 
        gap-6
      ">
        <div className="flex flex-col items-start gap-2 w-full">
          <h2 className="font-inter font-medium text-[16px] text-[#0A0A0A]">
            Today's Schedule
          </h2>
          <p className="font-inter text-[16px] text-[#717182]">
            Your appointments for today
          </p>
        </div>

        <div className="w-full flex justify-center items-center">
          <p className="font-inter text-[16px] text-[#6A7282] text-center">
            No appointments scheduled for today
          </p>
        </div>
      </div>

      {/* ===== UPCOMING APPOINTMENTS ===== */}
      <div className="
        w-full 
        bg-white 
        border border-black/10 
        rounded-[14px] 
        flex flex-col 
        items-start 
        p-6 
        gap-6
      ">
        <div className="flex flex-col items-start gap-2 w-full">
          <h2 className="font-inter font-medium text-[16px] text-[#0A0A0A]">
            Upcoming Appointments
          </h2>
          <p className="font-inter text-[16px] text-[#717182]">
            Next scheduled appointments
          </p>
        </div>

        {/* Card inside */}
        <div className="
          w-full 
          border border-black/10 
          rounded-[10px] 
          flex flex-col sm:flex-row 
          justify-between 
          items-start sm:items-center 
          p-4 
          gap-4
        ">
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="text-[#101828] text-[16px] font-inter">
                Michael Brown
              </span>
              <div className="
                bg-[#159EEC] 
                text-white 
                text-xs 
                font-medium 
                px-2.5 py-0.5 
                rounded-[10px]
                w-fit
              ">
                scheduled
              </div>
            </div>
            <p className="text-[#4A5565] text-sm">Follow-up Visit</p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <p className="text-[#101828] text-[16px] font-inter">
              11/1/2025
            </p>
            <p className="text-[#6A7282] text-sm">02:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDbCard;
