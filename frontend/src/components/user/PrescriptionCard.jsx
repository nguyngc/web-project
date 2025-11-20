import { Calendar, FileText, Download } from "lucide-react";

const PrescriptionCard = ({ service, doctor, code, issuedDate, nextVisit }) => {
  return (
    <div className="
      w-full 
      bg-white 
      border border-[#159EEC] border-l-[4px] 
      rounded-[14px] 
      p-4 
      flex flex-col gap-4
      shadow-sm
    ">
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3">

        {/* Service + Doctor */}
        <div className="flex flex-col gap-1">
          <h4 className="text-[#101828] text-[16px] leading-[24px]">{service}</h4>
          <p className="text-[#4A5565] text-[14px] leading-[20px]">{doctor}</p>
        </div>

        {/* Badge */}
        <div className="bg-[#3F9C36] rounded-lg px-3 py-1 flex items-center gap-2 w-fit">
          <FileText className="w-3 h-3 text-white" />
          <span className="text-white text-[12px] font-medium">{code}</span>
        </div>
      </div>

      {/* Dates */}
      <div className="
        flex flex-col sm:flex-row justify-between w-full 
        text-[#4A5565] text-[14px] gap-2
      ">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#4A5565]" />
          <span>Issued: {issuedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#4A5565]" />
          <span>Next Visit: {nextVisit}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button className="
          flex items-center justify-center gap-2 
          px-3 py-1.5 
          rounded-lg 
          bg-gradient-to-b from-[#159EEC]/50 to-[#159EEC] 
          text-white text-sm font-medium
        ">
          <FileText className="w-4 h-4 text-white" />
          View Details
        </button>

        <button className="
          flex items-center justify-center gap-2 
          px-3 py-1.5 
          rounded-lg border border-[#159EEC] 
          text-[#159EEC] text-sm font-medium bg-white
        ">
          <Download className="w-4 h-4 text-[#159EEC]" />
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PrescriptionCard;
