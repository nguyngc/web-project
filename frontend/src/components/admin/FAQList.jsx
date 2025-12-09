import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import FqaRow from "./FQARow";
import FQAForm from "./FQAForm";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";
import ConfirmDialog from "../common/ComfirmDialog";

import {
  getAllFqas,
  createFqa,
  updateFqa,
  deleteFqa,
  
} from "../../services/fqaService";

const FqaList = () => {
  const [fqas, setFqas] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedFqa, setSelectedFqa] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fqaToDelete, setFqaToDelete] = useState(null);

  const itemsPerPage = 5;

  // Load all fqas from backend
  const loadFqas = async () => {
    try {
      setLoading(true);
      const list = await getAllFqas(); // service call
      setFqas(list);
    } catch (err) {
      showMessage(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFqas();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  // SEARCH + PAGINATION
  const filtered = fqas.filter((b) =>
    b.question.toLowerCase().includes(search.toLowerCase())
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
    setSelectedFqa(null);
    setShowForm(true);
  };

  const handleEdit = (fqa) => {
    setSelectedFqa(fqa);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    try {
      if (selectedFqa) {
        const updated = await updateFqa(selectedFqa._id, formData);
        setFqas((prev) =>
          prev.map((b) => (b._id === updated._id ? updated : b))
        );
        showMessage("FAQ updated successfully");
      } else {
        console.log(formData);
        const created = await createFqa(formData);
        setFqas((prev) => [created, ...prev]);
        showMessage("FAQ created successfully");
      }

      setShowForm(false);
      setSelectedFqa(null);
    } catch (err) {
      showMessage(err.message, "error");
    }
  };

  const handleRequestDelete = (fqa) => {
    setFqaToDelete(fqa);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteFqa = async () => {
    try {
      await deleteFqa(fqaToDelete._id);
      setFqas((prev) =>
        prev.filter((b) => b._id !== fqaToDelete._id)
      );
      showMessage("FAQ deleted successfully");
    } catch (err) {
      showMessage(err.message, "error");
    }

    setDeleteDialogOpen(false);
    setFqaToDelete(null);
  };

  // --------------------------------------------------

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <h1 className="text-base font-semibold text-[#111827]">
            FAQ Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage and organize homepage FAQs
          </p>
        </div>

        {!showForm && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-lg
          bg-gradient-to-b from-[#1C398E] to-[rgba(110,133,195,0.8)]
          text-white text-sm"
          >
            <Plus className="w-4 h-4" />
            Add New FAQ
          </button>
        )}
      </div>

      {/* Message */}
      {message && (
        <InfoMessage message={message} onClose={() => setMessage(null)} />
      )}

      {/* FORM */}
      {showForm && (
        <FQAForm
          mode={selectedFqa ? "edit" : "add"}
          initialData={selectedFqa}
          onSubmit={handleSave}
          onCancel={() => {
            setShowForm(false);
            setSelectedFqa(null);
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
              placeholder="Search FAQs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {loading && <p>Loading FAQs...</p>}

          {!loading &&
            paginated.map((fqa, index) => (
              <FqaRow
                key={fqa._id}
                fqa={fqa}
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
            itemLabel="FAQs"
          />
        </div>
      )}

      {/* DELETE CONFIRM DIALOG */}
      <ConfirmDialog
        show={deleteDialogOpen}
        question="Delete FAQ"
        message={
          <>
            Are you sure you want to delete FAQ {" "}
            <strong>{fqaToDelete?.question}</strong>? This action cannot be
            undone.
          </>
        }
        confirmText="Delete FAQ"
        confirmVariant="danger"
        onConfirm={confirmDeleteFqa}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  );
};

export default FqaList;
