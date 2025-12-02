import { ArrowUp, ArrowDown, Edit2 } from "lucide-react";
import ToggleSwitch from "../common/ToggleSwitch";

const ServiceRow = ({
  service,
  onToggleStatus,
  onEdit
}) => {
  return (
    <div
      className="
        flex flex-col md:flex-row md:items-center
        gap-4 px-4 py-4
        rounded-xl border border-[#E5E7EB] bg-white shadow-sm
      "
    >
      {/* Thumbnail */}
      <div className="w-full md:w-28 h-28 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={service.image}
          alt={service.serviceName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-[#111827]">
          {service.serviceName}
        </h3>
        <p className="text-sm text-[#6B7280]">{service.shortDescription}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">

        {/* Toggle */}
        <ToggleSwitch
          checked={service.isActive}
          onChange={() => onToggleStatus(service._id)}
        />

        {/* Edit */}
        <button
          onClick={() => onEdit(service)}
          className="w-9 h-9 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
        >
          <Edit2 className="w-4 h-4 text-[#111827]" />
        </button>
      </div>
    </div>
  );
};

export default ServiceRow;
