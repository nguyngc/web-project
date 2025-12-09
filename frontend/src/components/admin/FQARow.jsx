import { ArrowUp, ArrowDown, Edit2, Trash2 } from "lucide-react";
import ToggleSwitch from "../common/ToggleSwitch";
import StatusBox from "../common/StatusBox";

const FqaRow = ({
  fqa,
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

      {/* Text */}
      <div className="flex-1">
        <h3 className="font-semibold text-[#111827]">{fqa.question}</h3>
        <p className="text-sm text-gray-500">{fqa.answer}</p>
      </div>

      {/* Edit */}
      <button
        onClick={() => onEdit(fqa)}
        className="w-9 h-9 border rounded-lg flex items-center justify-center hover:bg-gray-50"
      >
        <Edit2 className="w-4 h-4" />
      </button>

      {/* Delete */}
      <button
        onClick={() => onDelete(fqa)}
        className="w-9 h-9 border rounded-lg flex items-center justify-center hover:bg-gray-50"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </button>
    </div>
    
  );
};

export default FqaRow;
