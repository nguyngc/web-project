const formatEye = (eye) => {
  if (!eye) return "No data";
  const { sphere, cylinder, axis } = eye;
  return `SPH: ${sphere ?? "-"}, CYL: ${cylinder ?? "-"}, AXIS: ${axis ?? "-"}`;
};

const PatientCard = ({ id, name, email, phone, lastVisit, medicalHistory, prescription, }) => {
  return (
    <div className="flex flex-col items-start p-4 gap-2 w-full border border-[#9810FA] border-l-[4px] rounded-[14px]">
      {/* Heading */}
      <div className="flex flex-row items-center gap-2">
        <h3 className="text-[#101828] font-inter font-normal text-[16px] leading-[24px]">
          {name || "—"}
        </h3>
      </div>

      {/* Patient Info */}
      <div className="flex flex-row justify-between items-center gap-[30px] w-full flex-wrap">
        <span className="text-[#4A5565] text-[14px] leading-[20px]">
          Email: {email || "—"}
        </span>
        <span className="text-[#4A5565] text-[14px] leading-[20px]">
          Phone: {phone || "—"}
        </span>
        <span className="text-[#4A5565] text-[14px] leading-[20px]">
          Last Visit: {lastVisit || "—"}
        </span>
      </div>

      {/* Medical History */}
      <div className="flex flex-row items-center gap-2 w-full">
        <span className="text-[#4A5565] font-bold text-[14px] leading-[20px]">
          Medical History:
        </span>
        <span className="text-[#4A5565] text-[14px] leading-[20px]">
          {medicalHistory || "No medical history on file."}
        </span>
      </div>

      {/* Latest Prescription */}
      <div className="flex flex-col items-start p-3 gap-2 w-full bg-[#F9FAFB] rounded-[10px]">
        <span className="text-[#0A0A0A] font-bold text-[14px] leading-[20px]">
          Latest Prescription:
        </span>

        {prescription ? (
          <div className="flex flex-row items-center gap-[21px] flex-wrap">
            {/* Right Eye */}
            <div className="flex flex-row items-center gap-2">
              <span className="text-[#0A0A0A] font-bold text-[12px] leading-[16px]">
                Right Eye:
              </span>
              <span className="text-[#0A0A0A] text-[12px] leading-[16px]">
                {formatEye(prescription.rightEye)}
              </span>
            </div>

            {/* Left Eye */}
            <div className="flex flex-row items-center gap-2">
              <span className="text-[#0A0A0A] font-bold text-[12px] leading-[16px]">
                Left Eye:
              </span>
              <span className="text-[#0A0A0A] text-[12px] leading-[16px]">
                {formatEye(prescription.leftEye)}
              </span>
            </div>

            {prescription.notes && (
              <div className="flex flex-row items-center gap-2 w-full">
                <span className="text-[#0A0A0A] font-bold text-[12px] leading-[16px]">
                  Notes:
                </span>
                <span className="text-[#0A0A0A] text-[12px] leading-[16px]">
                  {prescription.notes}
                </span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-gray-500">
            No prescription data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
