import { Edit2, RotateCcw, EyeOff, Trash2 } from "lucide-react";
import StatusBox from "./StatusBox";

const UserRow = ({ user, onEdit, onResetPassword, onToggleStatus, onDelete }) => {
  return (
    <div
      className="
        flex flex-col md:flex-row 
        md:items-center 
        gap-3 px-1.5 py-3 
        border-b border-black/10
      "
    >
      {/* Name */}
      <div className="flex-1 text-sm font-medium text-[#0A0A0A]">
        {user.firstName} {user.lastName}
      </div>

      {/* Email */}
      <div className="md:w-[220px] text-sm text-[#0A0A0A] break-words">
        {user.email}
      </div>

      {/* Role */}
      <div className="md:w-[75px]">
        <StatusBox variant={user.role}>{user.role}</StatusBox>
      </div>

      {/* Status */}
      <div className="md:w-[65px]">
        <StatusBox variant={user.status ? "active" : "inactive"}>
          {user.status ? "active" : "inactive"}
        </StatusBox>
      </div>

      {/* Actions */}
      <div
        className="
          flex gap-2 
          md:w-[152px] 
          mt-1 md:mt-0
        "
      >
        <button
          onClick={() => onEdit(user)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-white hover:bg-gray-50"
        >
          <Edit2 className="w-4 h-4 text-[#0A0A0A]" />
        </button>

        <button
          onClick={() => onResetPassword(user)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-white hover:bg-gray-50"
        >
          <RotateCcw className="w-4 h-4 text-[#0A0A0A]" />
        </button>

        <button
          onClick={() => onToggleStatus(user.id)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-white hover:bg-gray-50"
        >
          <EyeOff className="w-4 h-4 text-[#0A0A0A]" />
        </button>

        <button
          onClick={() => onDelete(user)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-white hover:bg-gray-50"
        >
          <Trash2 className="w-4 h-4 text-[#0A0A0A]" />
        </button>
      </div>
    </div>
  );
};

export default UserRow;
