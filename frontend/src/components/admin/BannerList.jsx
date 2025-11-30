import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import BannerRow from "./BannerRow";
import BannerForm from "./BannerForm";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";
import ConfirmDialog from "../common/ComfirmDialog";

import {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleBanner,
  reorderBanners,
} from "../../services/bannerService";

const BannerList = () => {
  const [banners, setBanners] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  const itemsPerPage = 5;

  // Load all banners from backend
  const loadBanners = async () => {
    try {
      setLoading(true);
      const list = await getAllBanners(); // service call
      setBanners(list);
    } catch (err) {
      showMessage(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  // SEARCH + PAGINATION
  const filtered = banners.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // --------------------------------------------------
  // CRUD HANDLERS
  // --------------------------------------------------

  const handleAdd = () => {
    setSelectedBanner(null);
    setShowForm(true);
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    try {
      if (selectedBanner) {
        const updated = await updateBanner(selectedBanner._id, formData);
        setBanners((prev) =>
          prev.map((b) => (b._id === updated._id ? updated : b))
        );
        showMessage("Banner updated successfully");
      } else {
        console.log(formData);
        const created = await createBanner(formData);
        setBanners((prev) => [created, ...prev]);
        showMessage("Banner created successfully");
      }

      setShowForm(false);
      setSelectedBanner(null);
    } catch (err) {
      showMessage(err.message, "error");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const updated = await toggleBanner(id);
      setBanners((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );
      showMessage("Banner status updated");
    } catch (err) {
      showMessage(err.message, "error");
    }
  };

  const handleRequestDelete = (banner) => {
    setBannerToDelete(banner);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteBanner = async () => {
    try {
      await deleteBanner(bannerToDelete._id);
      setBanners((prev) =>
        prev.filter((b) => b._id !== bannerToDelete._id)
      );
      showMessage("Banner deleted successfully");
    } catch (err) {
      showMessage(err.message, "error");
    }

    setDeleteDialogOpen(false);
    setBannerToDelete(null);
  };

  // --------------------------------------------------
  // ORDERING (MOVE UP / DOWN)
  // --------------------------------------------------

  const saveOrder = async (newList) => {
    try {
      const updated = await reorderBanners(newList);
      setBanners(updated);
    } catch (err) {
      showMessage(err.message, "error");
    }
  };

  const handleMoveUp = async (id) => {
    const index = banners.findIndex((b) => b._id === id);
    if (index <= 0) return;

    const arr = [...banners];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];

    const ordered = arr.map((b, i) => ({ ...b, order: i + 1 }));

    setBanners(ordered);
    await saveOrder(ordered);
    showMessage("Banner order updated");
  };

  const handleMoveDown = async (id) => {
    const index = banners.findIndex((b) => b._id === id);
    if (index === banners.length - 1) return;

    const arr = [...banners];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];

    const ordered = arr.map((b, i) => ({ ...b, order: i + 1 }));

    setBanners(ordered);
    await saveOrder(ordered);
    showMessage("Banner order updated");
  };

  // --------------------------------------------------

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
          <div className="flex items-center gap-2 px-4 py-2 bg-[#F3F3F5] rounded-lg">
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

          {loading && <p>Loading banners...</p>}

          {!loading &&
            paginated.map((banner, index) => (
              <BannerRow
                key={banner._id}
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
