import { useEffect, useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import GradientButton from "../GradientButton";
import JoditEditor from "jodit-react";

const ArticleForm = ({
  mode = "add",
  initialData = null,
  onSubmit,
  onCancel,
}) => {
  const editor = useRef(null);

  const [form, setForm] = useState({
    category: "",
    isPublished: true,
    title: "",
    subtitle: "",
    author: "",
    readTime: "",
    authorBio: "",
    image: "",
    content: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  // ---------- Load initial data ----------
  useEffect(() => {
    if (initialData) {
      const mapped = {
        category: initialData.category || "",
        isPublished: initialData.isPublished || true,
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        author: initialData.author || "",
        readTime: initialData.readTime || "",
        authorBio: initialData.authorBio || "",
        image: initialData.image || initialData.imageUrl || "",
        content: initialData.content || "",
      };

      setForm(mapped);
      setImagePreview(mapped.image);
    }
  }, [initialData]);

  // ---------- Image upload ----------
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setForm((prev) => ({ ...prev, image: base64 }));
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const labelClass = "block text-[#364153] text-sm mb-1 mt-4";
  const inputClass =
    "w-full h-10 px-3 rounded-lg bg-[#F3F3F5] text-sm placeholder:text-[#717182] outline-none focus:ring-2 ring-vision-blue-accent";
  const textareaClass =
    "w-full px-3 py-2 rounded-lg bg-[#F3F3F5] text-sm placeholder:text-[#717182] outline-none focus:ring-2 ring-vision-blue-accent";

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

          {/* Category */}
          <Form.Group>
            <label className={labelClass}>Category *</label>
            <Form.Control
              className={inputClass}
              value={form.category}
              onChange={(e) =>
                setForm((p) => ({ ...p, category: e.target.value }))
              }
            />
          </Form.Group>

          {/* Status */}
          <Form.Group>
            <label className={labelClass}>Status *</label>
            <div className="flex gap-6 pt-2">
              {[true, false].map((v) => (
                <label key={v.toString()} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="isPublished"
                    checked={form.isPublished === v}
                    onChange={() => setForm((p) => ({ ...p, isPublished: v }))}
                  />
                  <span>{v ? "Published" : "Draft"}</span>
                </label>
              ))}
            </div>
          </Form.Group>

          {/* Title */}
          <Form.Group>
            <label className={labelClass}>Title *</label>
            <Form.Control
              className={inputClass}
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
            />
          </Form.Group>

          {/* Subtitle */}
          <Form.Group>
            <label className={labelClass}>Subtitle *</label>
            <Form.Control
              className={inputClass}
              value={form.subtitle}
              onChange={(e) =>
                setForm((p) => ({ ...p, subtitle: e.target.value }))
              }
            />
          </Form.Group>

          {/* Author + read time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Group>
              <label className={labelClass}>Author *</label>
              <Form.Control
                className={inputClass}
                value={form.author}
                onChange={(e) =>
                  setForm((p) => ({ ...p, author: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group>
              <label className={labelClass}>Read Time *</label>
              <Form.Control
                className={inputClass}
                value={form.readTime}
                onChange={(e) =>
                  setForm((p) => ({ ...p, readTime: e.target.value }))
                }
              />
            </Form.Group>
          </div>

          {/* Author Bio */}
          <Form.Group>
            <label className={labelClass}>Author Bio *</label>
            <Form.Control
              as="textarea"
              rows={2}
              className={textareaClass}
              value={form.authorBio}
              onChange={(e) =>
                setForm((p) => ({ ...p, authorBio: e.target.value }))
              }
            />
          </Form.Group>

          {/* Feature Image */}
          <Form.Group>
            <label className={labelClass}>Image *</label>
            <Form.Control
              type="file"
              accept="image/*"
              className={inputClass}
              onChange={handleImageUpload}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="h-32 mt-3 rounded-lg border object-cover"
              />
            )}
          </Form.Group>
        </div>

        {/* ARTICLE CONTENT */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-4">
            Article Content
          </h3>

          <JoditEditor
            ref={editor}
            value={form.content}
            config={{
              readonly: false,
              height: 400,
              uploader: { insertImageAsBase64URI: true },
              toolbarButtonSize: "medium",
            }}
            onBlur={(newContent) =>
              setForm((prev) => ({ ...prev, content: newContent }))
            }
          />
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
