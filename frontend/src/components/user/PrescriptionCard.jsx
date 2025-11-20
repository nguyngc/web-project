import { Calendar, FileText, Download } from "lucide-react";

const PrescriptionCard = ({ appt, onView, onDownload }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col items-start p-4 gap-4 bg-white border border-[#159EEC] border-l-[4px] rounded-[14px]">
        {/* Service + Doctor */}
        <div className="flex flex-row justify-between items-start w-full">
          <div className="flex flex-col gap-2">
            <h4 className="text-[#101828] text-[16px] leading-[24px]">
              {appt.service}
            </h4>
            <p className="text-[#4A5565] text-[14px] leading-[20px]">
              {appt.doctor}
            </p>
          </div>

          {/* Badge (Code) */}
          <div className="bg-[#3F9C36] rounded-lg px-3 py-1 flex items-center gap-2">
            <FileText className="w-3 h-3 text-white" />
            <span className="text-white text-[12px] font-medium">
              {appt.id}
            </span>
          </div>
        </div>

        {/* Dates */}
        <div className="flex flex-row justify-between w-full text-[#4A5565] text-[14px]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#4A5565]" />
            <span>Issued: {appt.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#4A5565]" />
            <span>Next Visit: {appt.nextAppointment}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-row gap-3">
          <button
            onClick={() => onView(appt)}
            className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-b from-[#159EEC]/50 to-[#159EEC] text-white text-sm font-medium"
          >
            <FileText className="w-4 h-4 text-white" />
            View Details
          </button>
          <button
            onClick={() => onDownload(appt)}
            className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-[#159EEC] text-[#159EEC] text-sm font-medium bg-white"
          >
            <Download className="w-4 h-4 text-[#159EEC]" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionCard;
