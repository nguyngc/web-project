import { Edit2, Trash2 } from "lucide-react";
import ToggleSwitch from "../common/ToggleSwitch";

const ArticleRow = ({ article, onToggleStatus, onEdit, onDelete }) => {
  const statusLabel = article.status ? "published" : "draft";
  const statusClass =
    article.status
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-200 text-gray-600";

  return (
    <div
      className="
        flex flex-col md:flex-row md:items-center
        gap-4 px-4 py-4
        rounded-xl border border-[#E5E7EB] bg-white shadow-sm
      "
    >
      {/* Thumbnail */}
      <div className="w-full md:w-32 h-32 md:h-20 rounded-lg overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="font-semibold text-[#111827]">{article.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">
          {article.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500">
          <span>{article.author}</span>
          <span>
            {article.date
              ? new Date(article.date).toLocaleDateString()
              : ""}
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-[#E5EAFE] text-[#3B4EB1]">
            {article.category}
          </span>
        </div>
      </div>

      {/* Status + actions */}
      <div className="flex items-center gap-3">
        {/* Status badge */}
        <span
          className={`px-3 py-1 text-xs rounded-full capitalize ${statusClass}`}
        >
          {statusLabel}
        </span>

        {/* Toggle */}
        <ToggleSwitch
          checked={article.status}
          onChange={() => onToggleStatus(article.id)}
        />

        {/* Edit */}
        <button
          onClick={() => onEdit(article)}
          className="w-9 h-9 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
        >
          <Edit2 className="w-4 h-4" />
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(article)}
          className="w-9 h-9 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default ArticleRow;
