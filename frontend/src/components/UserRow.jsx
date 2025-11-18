import { Edit2, RotateCcw, EyeOff, Trash2 } from "lucide-react";
import StatusBox from "./StatusBox";

const UserRow = ({
  user,
  onEdit,
  onResetPassword,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <div
      key={user.id}
      className="flex items-center gap-2.5 px-1.5 py-2 border-b border-black/10"
    >
      {/* Name */}
      <div className="flex-1 text-sm text-[#0A0A0A]">
        {user.firstName} {user.lastName}
      </div>

      {/* Email */}
      <div className="w-[220px] text-sm text-[#0A0A0A]">{user.email}</div>

      {/* Role */}
      <div className="w-[75px]">
        <StatusBox variant={user.role}>{user.role}</StatusBox>
      </div>

      {/* Status */}
      <div className="w-[65px]">
        <StatusBox variant={user.status ? "active" : "inactive"}>
          {user.status ? "active" : "inactive"}
        </StatusBox>
      </div>

      {/* Actions */}
      <div className="w-[152px] flex items-center gap-2">
        <button
          onClick={() => onEdit(user)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-white hover:bg-gray-50 transition-colors"
        >
          <Edit2 className="w-4 h-4 text-[#0A0A0A]" />
        </button>

        <button
          onClick={() => onResetPassword(user)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-white hover:bg-gray-50 transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-[#0A0A0A]" />
        </button>

        <button
          onClick={() => onToggleStatus(user.id)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-white hover:bg-gray-50 transition-colors"
        >
          <EyeOff className="w-4 h-4 text-[#0A0A0A]" />
        </button>

        <button
          onClick={() => onDelete(user)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-white hover:bg-gray-50 transition-colors"
        >
          <Trash2 className="w-4 h-4 text-[#0A0A0A]" />
        </button>
      </div>
    </div>
  );
}

export default UserRow;