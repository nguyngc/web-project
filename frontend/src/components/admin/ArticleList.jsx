import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import ArticleRow from "./ArticleRow";
import ArticleForm from "./ArticleForm";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";
import ConfirmDialog from "../common/ComfirmDialog";

import {
  getAdminArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  toggleArticleStatus,
} from "../../services/articleService";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const itemsPerPage = 5;

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const loadArticles = async () => {
    try {
      setLoading(true);
      const list = await getAdminArticles(search);
      setArticles(list);
    } catch (err) {
      showMessage(err.message || "Failed to load articles", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const filteredArticles = articles; // backend already filtered by q
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  const paginated = filteredArticles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleAdd = () => {
    setSelectedArticle(null);
    setShowForm(true);
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    try {
      if (selectedArticle) {
        const updated = await updateArticle(selectedArticle.id, formData);
        setArticles((prev) =>
          prev.map((a) => (a.id === updated.id ? updated : a))
        );
        showMessage("Article updated successfully");
      } else {
        const created = await createArticle(formData);
        setArticles((prev) => [created, ...prev]);
        showMessage("Article created successfully");
      }

      setShowForm(false);
      setSelectedArticle(null);
    } catch (err) {
      showMessage(err.message || "Save failed", "error");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const current = articles.find((a) => a.id === id);
      if (!current) return;

      const updated = await toggleArticleStatus(id, current.isPublished);

      setArticles((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );
      showMessage("Article status updated");
    } catch (err) {
      showMessage(err.message || "Failed to update status", "error");
    }
  };

  const handleRequestDelete = (article) => {
    setArticleToDelete(article);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteArticle = async () => {
    if (!articleToDelete) return;
    try {
      await deleteArticle(articleToDelete.id);
      setArticles((prev) => prev.filter((a) => a.id !== articleToDelete.id));
      showMessage("Article deleted successfully");
    } catch (err) {
      showMessage(err.message || "Failed to delete article", "error");
    } finally {
      setArticleToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-base font-semibold text-[#111827]">
            Content Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage news articles and blog posts
          </p>
        </div>

        {!showForm && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-b from-[#1C398E] to-[rgba(110,133,195,0.8)] text-white text-sm"
          >
            <Plus className="w-4 h-4" />
            Add New Article
          </button>
        )}
      </div>

      {/* Info message */}
      {message && (
        <InfoMessage message={message} onClose={() => setMessage(null)} />
      )}

      {/* Form */}
      {showForm && (
        <ArticleForm
          mode={selectedArticle ? "edit" : "add"}
          initialData={selectedArticle}
          onSubmit={handleSave}
          onCancel={() => {
            setShowForm(false);
            setSelectedArticle(null);
          }}
        />
      )}

      {/* List */}
      {!showForm && (
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#F3F3F5] rounded-lg">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {loading && <p className="text-sm text-gray-500">Loading...</p>}

          {/* Rows */}
          {!loading &&
            paginated.map((article) => (
              <ArticleRow
                key={article.id}
                article={article}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEdit}
                onDelete={handleRequestDelete}
              />
            ))}

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredArticles.length}
            onPageChange={setPage}
            itemLabel="articles"
          />
        </div>
      )}

      {/* Delete confirm dialog */}
      <ConfirmDialog
        show={deleteDialogOpen}
        title="Delete Article"
        message={
          <>
            Are you sure you want to delete the article{" "}
            <strong>{articleToDelete?.title}</strong>? This action cannot be
            undone.
          </>
        }
        confirmText="Delete Article"
        confirmVariant="danger"
        onConfirm={confirmDeleteArticle}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  );
};

export default ArticleList;
