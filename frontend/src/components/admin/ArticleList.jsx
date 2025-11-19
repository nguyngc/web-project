import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { articles as articlesData} from "../../data/articles";
import ArticleRow from "./ArticleRow";
import ArticleForm from "./ArticleForm";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";
import ConfirmDialog from "../common/ComfirmDialog";

const ArticleList = () => {
  const [articles, setArticles] = useState([...articlesData]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // message like UserList / ServiceList
  const [message, setMessage] = useState(null);

  // delete confirm dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const itemsPerPage = 5;

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

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

  const handleSave = (data) => {
    if (selectedArticle) {
      // update
      setArticles((prev) =>
        prev.map((a) =>
          a.id === selectedArticle.id ? { ...data, id: selectedArticle.id } : a
        )
      );
      showMessage("Article updated successfully");
    } else {
      // create
      const newArticle = {
        ...data,
        id: `art-${Date.now()}`,
      };
      setArticles((prev) => [newArticle, ...prev]);
      showMessage("Article created successfully");
    }

    setShowForm(false);
    setSelectedArticle(null);
  };

  const handleToggleStatus = (id) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: !a.status } : a
      )
    );
    showMessage("Article status updated");
  };

  const handleRequestDelete = (article) => {
    setArticleToDelete(article);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteArticle = () => {
    if (!articleToDelete) return;
    setArticles((prev) => prev.filter((a) => a.id !== articleToDelete.id));
    showMessage("Article deleted successfully");
    setArticleToDelete(null);
    setDeleteDialogOpen(false);
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

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-b from-[#1C398E] to-[rgba(110,133,195,0.8)] text-white text-sm"
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Cancel" : "Add New Article"}
        </button>
      </div>

      {/* Info message */}
      {message && (
        <InfoMessage
          message={message}
          onClose={() => setMessage(null)}
        />
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

          {/* Rows */}
          {paginated.map((article) => (
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

      {/* Common ConfirmDialog for delete */}
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
