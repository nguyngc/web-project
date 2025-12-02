import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import GradientButton from "../GradientButton";

const ServiceForm = ({ mode = "add", initialData = null, onCancel, onSubmit }) => {
  const [form, setForm] = useState({
    serviceName: "",
    shortDescription: "",
    fullDescription: "",
    imageUrl: "",
    duration: "",
    price: "",
    frequency: "",
    features: "",
    benefits: "",
    status: true
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        features: initialData.features || "",
        benefits: initialData.benefits || "",
        image: initialData.image || ""
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
        {mode === "add" ? "Add New Service" : "Edit Service"}
      </h2>

      <p className="text-gray-500 mb-6">
        {mode === "add" ? "Fill in the service details below" : "Update service information below"}
      </p>

      <Form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* BASIC INFO */}
        <div className="border-b border-gray-200 pb-6">
          <Form.Group>
            <label className={labelClass}>Service Name *</label>
            <Form.Control
              className={inputClass}
              value={form.serviceName}
              onChange={(e) => handleChange("serviceName", e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <label className={labelClass}>Short Description *</label>
            <Form.Control
              className={inputClass}
              value={form.shortDescription}
              onChange={(e) => handleChange("shortDescription", e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <label className={labelClass}>Full Description *</label>
            <Form.Control
              as="textarea"
              rows={3}
              className={textareaClass}
              value={form.fullDescription}
              onChange={(e) => handleChange("fullDescription", e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <label className={labelClass}>Image *</label>
            <Form.Control
              type="file"
              accept="image/*"
              className={inputClass}
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => {
                  setForm((prev) => ({ ...prev, image: reader.result }));
                };
                reader.readAsDataURL(file);
              }}
            />

            {form.image && (
              <img src={form.image} className="h-32 mt-3 rounded-lg border object-cover" />
            )}
          </Form.Group>


          {/* SERVICE DETAILS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Form.Group>
              <label className={labelClass}>Duration *</label>
              <Form.Control
                className={inputClass}
                value={form.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <label className={labelClass}>Price *</label>
              <Form.Control
                className={inputClass}
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <label className={labelClass}>Frequency *</label>
              <Form.Control
                className={inputClass}
                value={form.frequency}
                onChange={(e) => handleChange("frequency", e.target.value)}
              />
            </Form.Group>
          </div>

          <Form.Group>
            <label className={labelClass}>Features (semicolon-separated)</label>
            <Form.Control
              as="textarea"
              rows={2}
              className={textareaClass}
              value={form.features}
              onChange={(e) => handleChange("features", e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <label className={labelClass}>Benefits (semicolon-separated)</label>
            <Form.Control
              as="textarea"
              rows={2}
              className={textareaClass}
              value={form.benefits}
              onChange={(e) => handleChange("benefits", e.target.value)}
            />
          </Form.Group>

          {/* Status */}
          <Form.Group>
            <label className={labelClass}>Status *</label>
            <div className="flex gap-6 pt-2">
              {[true, false].map((value) => (
                <label key={value} className="flex items-center gap-2 text-gray-700 text-sm">
                  <input
                    type="radio"
                    name="isActive"
                    value={value.toString()}
                    checked={form.isActive === value}
                    onChange={() => handleChange("isActive", value)}
                  />
                  <span className="capitalize">{value ? "active" : "inactive"}</span>
                </label>
              ))}
            </div>
          </Form.Group>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg border border-[#155DFC] bg-white text-[#155DFC] hover:bg-[#155DFC]/5"
          >
            Cancel
          </Button>

          <GradientButton type="submit" isFull={false}>
            {mode === "add" ? "Create Service" : "Save Changes"}
          </GradientButton>
        </div>

      </Form>
    </div>
  );
};

export default ServiceForm;
