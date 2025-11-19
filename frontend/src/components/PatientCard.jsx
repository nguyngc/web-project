const PatientCard= ({ id,name,email,phone,lastVisit,medicalHistory,leftEye,rightEye}) => {
  return (
    <div className="flex flex-col items-start p-4 gap-2 w-[736px] h-[196px] border border-[#9810FA] border-l-[4px] rounded-[14px]">
      {/* Heading */}
      <div className="flex flex-row items-center gap-2">
        <h3 className="text-[#101828] font-inter font-normal text-[16px] leading-[24px]">
          {name}
        </h3>
      </div>

      {/* Patient Info */}
      <div className="flex flex-row justify-between items-center gap-[30px] w-[704px]">
        <span className="text-[#4A5565] text-[14px] leading-[20px]">
          Email: {email}
        </span>
        <span className="text-[#4A5565] text-[14px] leading-[20px]">
          Phone: {phone}
        </span>
        <span className="text-[#4A5565] text-[14px] leading-[20px]">
          Last Visit: {lastVisit}
        </span>
      </div>

      {/* Medical History */}
      <div className="flex flex-row items-center gap-2 w-[498px]">
        <span className="text-[#4A5565] font-bold text-[14px] leading-[20px]">
          Medical History:
        </span>
        <span className="text-[#4A5565] text-[14px] leading-[20px]">
          {medicalHistory}
        </span>
      </div>

      {/* Latest Prescription */}
      <div className="flex flex-col items-start p-3 gap-2 w-[704px] h-[70px] bg-[#F9FAFB] rounded-[10px]">
        <span className="text-[#0A0A0A] font-bold text-[14px] leading-[20px]">
          Latest Prescription:
        </span>

        <div className="flex flex-row items-center gap-[21px]">
          {/* Right Eye */}
          <div className="flex flex-row items-center gap-2 w-[243px]">
            <span className="text-[#0A0A0A] font-bold text-[12px] leading-[16px]">
              Right Eye:
            </span>
            <span className="text-[#0A0A0A] text-[12px] leading-[16px]">
              {rightEye}
            </span>
          </div>

          {/* Left Eye */}
          <div className="flex flex-row items-center gap-2 w-[233px]">
            <span className="text-[#0A0A0A] font-bold text-[12px] leading-[16px]">
              Left Eye:
            </span>
            <span className="text-[#0A0A0A] text-[12px] leading-[16px]">
              {leftEye}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;



