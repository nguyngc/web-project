import Alert from "react-bootstrap/Alert";
import { CheckCircle, XCircle, Activity } from "lucide-react";

const InfoMessage = ({ message, onClose }) => {
  if (!message) return null;

  const isSuccess = message.type === "success";

  return (
    <Alert
      variant={isSuccess ? "success" : "info"}
      className={`
        mb-3 border 
        ${isSuccess ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}
        flex items-center justify-between py-3 px-4 rounded-lg
      `}
    >
      {/* Left side (icon + text) */}
      <div className="flex items-center gap-3">
        {isSuccess ? (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ) : (
          <Activity className="h-5 w-5 text-red-600" />
        )}

        <span
          className={`
            text-sm
            ${isSuccess ? "text-green-800" : "text-red-800"}
          `}
        >
          {message.text}
        </span>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 transition"
      >
        <XCircle className="h-5 w-5" />
      </button>
    </Alert>
  );
}

export default InfoMessage;