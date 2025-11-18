import { ChevronLeft, ChevronRight } from "lucide-react"; // or your icon library

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  itemLabel
}) => {
  if (totalPages <= 1) return null; // hide if only one page

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex justify-between items-center pt-3">
      {/* Info text */}
      <p className="text-sm text-[#4A5565]">
        Showing {start} to {end} of {totalItems} {itemLabel}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-white 
            ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 transition-colors"}`}
        >
          <ChevronLeft className="w-4 h-4 text-[#0A0A0A]" />
        </button>

        {/* Page info */}
        <div className="px-3 h-8 flex items-center text-sm text-[#0A0A0A]">
          Page {currentPage} of {totalPages}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-white 
            ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 transition-colors"}`}
        >
          <ChevronRight className="w-4 h-4 text-[#0A0A0A]" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;