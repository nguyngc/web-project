const ConfirmDialog = ({
  show,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmVariant = "primary", // primary | danger
}) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center
                 bg-black/40 backdrop-blur-sm transition"
    >
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-8 animate-fadeIn">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-8">
          {message}
        </p>

        {/* Footer */}
        <div className="flex justify-end gap-3">

          {/* Cancel */}
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-gray-300 bg-white
                       text-gray-700 hover:bg-gray-100 transition"
          >
            {cancelText}
          </button>

          {/* Confirm */}
          <button
            onClick={onConfirm}
            className={`
              px-4 py-2 rounded-lg font-medium text-white
              ${
                confirmVariant === "danger"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >
            {confirmText}
          </button>

        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;