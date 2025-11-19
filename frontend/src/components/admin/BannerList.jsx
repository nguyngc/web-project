import { useState } from "react";
import { Plus, Search } from "lucide-react";
import bannersData from "../../data/banners";
import BannerRow from "./BannerRow";
import BannerForm from "./BannerForm";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";
import ConfirmDialog from "../common/ComfirmDialog";

const BannerList = () => {
  const [banners, setBanners] = useState([...bannersData]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  const itemsPerPage = 5;

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const filtered = banners.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleAdd = () => {
    setSelectedBanner(null);
    setShowForm(true);
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setShowForm(true);
  };

  const handleSave = (data) => {
    if (selectedBanner) {
      setBanners((prev) =>
        prev.map((b) =>
          b.id === selectedBanner.id ? { ...data, id: selectedBanner.id } : b
        )
      );
      showMessage("Banner updated successfully");
    } else {
      const newBanner = {
        ...data,
        id: `bnr-${Date.now()}`,
      };
      setBanners((prev) => [newBanner, ...prev]);
      showMessage("Banner created successfully");
    }
    setShowForm(false);
    setSelectedBanner(null);
  };

  const handleToggleStatus = (id) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: !b.status } : b))
    );
    showMessage("Banner status updated");
  };

  const handleRequestDelete = (banner) => {
    setBannerToDelete(banner);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteBanner = () => {
    setBanners((prev) => prev.filter((b) => b.id !== bannerToDelete.id));
    showMessage("Banner deleted successfully");
    setDeleteDialogOpen(false);
    setBannerToDelete(null);
  };

  const handleMoveUp = (id) => {
    setBanners((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      if (index <= 0) return prev; // already top
      const arr = [...prev];
      const tmp = arr[index - 1];
      arr[index - 1] = arr[index];
      arr[index] = tmp;
      return arr.map((b, i) => ({ ...b, order: i + 1 }));
    });
    showMessage("Banner order updated");
  };

  const handleMoveDown = (id) => {
    setBanners((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      if (index === prev.length - 1) return prev; // already bottom
      const arr = [...prev];
      const tmp = arr[index + 1];
      arr[index + 1] = arr[index];
      arr[index] = tmp;
      return arr.map((b, i) => ({ ...b, order: i + 1 }));
    });
    showMessage("Banner order updated");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <h1 className="text-base font-semibold text-[#111827]">
            Banner Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage and organize homepage banners
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg
          bg-gradient-to-b from-[#1C398E] to-[rgba(110,133,195,0.8)]
          text-white text-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Banner
        </button>
      </div>

      {/* Message */}
      {message && (
        <InfoMessage message={message} onClose={() => setMessage(null)} />
      )}

      {/* FORM */}
      {showForm && (
        <BannerForm
          mode={selectedBanner ? "edit" : "add"}
          initialData={selectedBanner}
          onSubmit={handleSave}
          onCancel={() => {
            setShowForm(false);
            setSelectedBanner(null);
          }}
        />
      )}

      {/* LIST */}
      {!showForm && (
        <div className="flex flex-col gap-4">
          {/* SEARCH */}
          <div className="flex items-center gap-2 px-4 py-2
            bg-[#F3F3F5] rounded-lg">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder="Search banners..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {paginated.map((banner, index) => (
            <BannerRow
              key={banner.id}
              banner={banner}
              isFirst={index === 0 && page === 1}
              isLast={index === paginated.length - 1 && page === totalPages}
              onToggleStatus={handleToggleStatus}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onEdit={handleEdit}
              onDelete={handleRequestDelete}
            />
          ))}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filtered.length}
            onPageChange={setPage}
            itemLabel="banners"
          />
        </div>
      )}

      {/* DELETE CONFIRM DIALOG */}
      <ConfirmDialog
        show={deleteDialogOpen}
        title="Delete Banner"
        message={
          <>
            Are you sure you want to delete banner{" "}
            <strong>{bannerToDelete?.title}</strong>? This action cannot be
            undone.
          </>
        }
        confirmText="Delete Banner"
        confirmVariant="danger"
        onConfirm={confirmDeleteBanner}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  );
};

export default BannerList;
