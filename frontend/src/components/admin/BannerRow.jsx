import { ArrowUp, ArrowDown, Edit2, Trash2 } from "lucide-react";
import ToggleSwitch from "../common/ToggleSwitch";
import StatusBox from "../common/StatusBox";

const BannerRow = ({
  banner,
  isFirst,
  isLast,
  onToggleStatus,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className="
        flex flex-col md:flex-row md:items-center
        gap-4 px-4 py-4
        rounded-xl border border-[#E5E7EB] bg-white shadow-sm
      "
    >
      {/* Image */}
      <div className="w-full md:w-32 h-28 md:h-20 rounded-lg overflow-hidden">
        <img
          src={banner.imageUrl}
          alt={banner.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="font-semibold text-[#111827]">{banner.title}</h3>

        <p className="text-sm text-gray-500">{banner.subtitle}</p>
        <p className="text-xs text-gray-400 mt-1">Order: {banner.order}</p>
      </div>

      {/* Status + Actions */}
      <div className="flex items-center gap-3">
        <StatusBox variant={banner.status ? "active" : "inactive"}>
          {banner.status ? "Active" : "Inactive"}
        </StatusBox>

        <ToggleSwitch
          checked={banner.status}
          onChange={() => onToggleStatus(banner.id)}
        />

        {/* Move Up */}
        <button
          disabled={isFirst}
          onClick={() => !isFirst && onMoveUp(banner.id)}
          className={`w-9 h-9 border rounded-lg flex items-center justify-center ${
            isFirst
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-50 cursor-pointer"
          }`}
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        {/* Move Down */}
        <button
          disabled={isLast}
          onClick={() => !isLast && onMoveDown(banner.id)}
          className={`w-9 h-9 border rounded-lg flex items-center justify-center ${
            isLast
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-50 cursor-pointer"
          }`}
        >
          <ArrowDown className="w-4 h-4" />
        </button>

        {/* Edit */}
        <button
          onClick={() => onEdit(banner)}
          className="w-9 h-9 border rounded-lg flex items-center justify-center hover:bg-gray-50"
        >
          <Edit2 className="w-4 h-4" />
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(banner)}
          className="w-9 h-9 border rounded-lg flex items-center justify-center hover:bg-gray-50"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default BannerRow;
