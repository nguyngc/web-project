import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import GradientButton from "../GradientButton";
import { Eye, EyeOff } from "lucide-react";

const ArticleForm = ({
  mode = "add",
  initialData = null,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState({
    category: "",
    status: true, // true = published, false = draft
    title: "",
    subtitle: "",
    author: "",
    readTime: "",
    authorBio: "",
    date: "",
    imageUrl: "",
    content: "",
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        status: initialData.status ?? true,
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const labelClass = "block text-[#364153] text-sm mb-2 mt-4";
  const inputClass =
    "w-full h-10 px-3 rounded-lg border border-transparent bg-[#F3F3F5] text-sm text-[#717182] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-vision-blue-accent";
  const textareaClass =
    "w-full px-3 py-2 rounded-lg border border-transparent bg-[#F3F3F5] text-sm text-[#717182] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-vision-blue-accent";

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="font-semibold text-gray-800 mb-2">
        {mode === "add" ? "Add Article" : "Edit Article"}
      </h2>
      <p className="text-gray-500 mb-6">
        {mode === "add"
          ? "Fill in the article details below"
          : "Update article information below"}
      </p>

      <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* BASIC INFO */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="font-semibold text-gray-700 mb-4">
            Basic Information
          </h3>

          <Form.Group>
            <label className={labelClass}>Category *</label>
            <Form.Control
              className={inputClass}
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
            />
          </Form.Group>

          {/* Status – boolean radio */}
          <Form.Group>
            <label className={labelClass}>Status *</label>
            <div className="flex gap-6 pt-2">
              {[true, false].map((value) => (
                <label
                  key={value ? "published" : "draft"}
                  className="flex items-center gap-2 text-gray-700 text-sm"
                >
                  <input
                    type="radio"
                    name="status"
                    value={value.toString()}
                    checked={form.status === value}
                    onChange={() => handleChange("status", value)}
                  />
                  <span className="capitalize">
                    {value ? "published" : "draft"}
                  </span>
                </label>
              ))}
            </div>
          </Form.Group>

          <Form.Group>
            <label className={labelClass}>Title *</label>
            <Form.Control
              className={inputClass}
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <label className={labelClass}>Subtitle *</label>
            <Form.Control
              className={inputClass}
              value={form.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
            />
          </Form.Group>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Group>
              <label className={labelClass}>Author *</label>
              <Form.Control
                className={inputClass}
                value={form.author}
                onChange={(e) => handleChange("author", e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <label className={labelClass}>Read Time *</label>
              <Form.Control
                className={inputClass}
                value={form.readTime}
                onChange={(e) => handleChange("readTime", e.target.value)}
              />
            </Form.Group>
          </div>

          <Form.Group>
            <label className={labelClass}>Author Bio *</label>
            <Form.Control
              as="textarea"
              rows={2}
              className={textareaClass}
              value={form.authorBio}
              onChange={(e) => handleChange("authorBio", e.target.value)}
            />
          </Form.Group>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Group>
              <label className={labelClass}>Date *</label>
              <Form.Control
                type="date"
                className={inputClass}
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <label className={labelClass}>Image URL *</label>
              <Form.Control
                className={inputClass}
                value={form.imageUrl}
                onChange={(e) => handleChange("imageUrl", e.target.value)}
              />
            </Form.Group>
          </div>
        </div>

        {/* CONTENT */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="font-semibold text-gray-700 mb-4">Article Content</h3>

          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm text-gray-500">
              Use the toolbar buttons to insert HTML, or write HTML directly.
            </span>

            <button
              type="button"
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
              onClick={() => setShowPreview((prev) => !prev)}
            >
              {showPreview ? (
                <>
                  <EyeOff className="w-4 h-4" /> Editor
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" /> Preview
                </>
              )}
            </button>
          </div>

          {!showPreview ? (
            <Form.Control
              as="textarea"
              rows={10}
              className={textareaClass}
              value={form.content}
              onChange={(e) => handleChange("content", e.target.value)}
            />
          ) : (
            <div
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: form.content }}
            />
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-4">
          <Button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg border border-[#155DFC] bg-white text-[#155DFC] hover:bg-[#155DFC]/5"
          >
            Cancel
          </Button>

          <GradientButton type="submit" isFull={false}>
            {mode === "add" ? "Create Article" : "Update Article"}
          </GradientButton>
        </div>
      </Form>
    </div>
  );
};

export default ArticleForm;
