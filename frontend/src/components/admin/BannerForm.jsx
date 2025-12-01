import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import GradientButton from "../GradientButton";

const BannerForm = ({
  mode = "add",
  initialData = null,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState({
    badge: "",
    image: "",
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    order: 1,
    isActive: true,
  });

  // Load initial data in EDIT mode
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const labelClass = "block text-[#364153] text-sm mb-2";
  const inputClass =
    "w-full h-10 px-3 rounded-lg border border-transparent bg-[#F3F3F5] text-sm text-[#717182] focus:outline-none focus:ring-2 focus:ring-vision-blue-accent";

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="font-semibold text-gray-800 mb-2">
        {mode === "add" ? "Add New Banner" : "Edit Banner"}
      </h2>
      <p className="text-gray-500 mb-6">
        {mode === "add"
          ? "Create a new banner slide with the required information below"
          : "Update banner information below"}
      </p>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
        className="flex flex-col gap-4"
      >
        <h3 className="font-semibold text-gray-700">Banner Information</h3>

        <Form.Group>
          <label className={labelClass}>Badge *</label>
          <Form.Control
            className={inputClass}
            value={form.badge}
            onChange={(e) => handleChange("badge", e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <label className={labelClass}>Image URL *</label>
          <Form.Control
            className={inputClass}
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
          />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Group>
            <label className={labelClass}>Button Text *</label>
            <Form.Control
              className={inputClass}
              value={form.buttonText}
              onChange={(e) => handleChange("buttonText", e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <label className={labelClass}>Button Link *</label>
            <Form.Control
              className={inputClass}
              value={form.buttonLink}
              onChange={(e) => handleChange("buttonLink", e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Group>
            <label className={labelClass}>Order *</label>
            <Form.Control
              type="number"
              className={inputClass}
              value={form.order}
              onChange={(e) => handleChange("order", Number(e.target.value))}
            />
          </Form.Group>

          {/* STATUS BOOLEAN RADIO */}
          <Form.Group>
            <label className={labelClass}>Status *</label>
            <div className="flex gap-6 pt-2">
              {[true, false].map((value) => (
                <label
                  key={value ? "active" : "inactive"}
                  className="flex items-center gap-2 text-gray-700 text-sm"
                >
                  <input
                    type="radio"
                    name="isActive"
                    value={value.toString()}
                    checked={form.isActive === value}
                    onChange={() => handleChange("isActive", value)}
                  />
                  <span className="capitalize">
                    {value ? "Active" : "Inactive"}
                  </span>
                </label>
              ))}
            </div>
          </Form.Group>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <Button
            onClick={onCancel}
            className="px-5 py-2.5 border border-[#155DFC] bg-white text-[#155DFC] rounded-lg hover:bg-[#155DFC]/5"
          >
            Cancel
          </Button>

          <GradientButton type="submit" isFull={false}>
            {mode === "add" ? "Create Banner" : "Update Banner"}
          </GradientButton>
        </div>
      </Form>
    </div>
  );
};

export default BannerForm;
