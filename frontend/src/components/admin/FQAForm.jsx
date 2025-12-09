import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import GradientButton from "../GradientButton";

const FQAForm = ({
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

  const [imagePreview, setImagePreview] = useState("");

  // Load initial data in EDIT mode
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setImagePreview(initialData.image || "");
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Convert uploaded file → Base64
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

  const labelClass = "block text-[#364153] text-sm mb-2";
  const inputClass =
    "w-full h-10 px-3 rounded-lg border border-transparent bg-[#F3F3F5] text-sm text-[#717182] focus:outline-none focus:ring-2 focus:ring-vision-blue-accent";

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="font-semibold text-gray-800 mb-2">
        {mode === "add" ? "Add New Fqa" : "Edit Fqa"}
      </h2>
      <p className="text-gray-500 mb-6">
        {mode === "add"
          ? "Create a new fqa slide with the required information below"
          : "Update fqa information below"}
      </p>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
        className="flex flex-col gap-4"
      >
        <h3 className="font-semibold text-gray-700">Fqa Information</h3>

        

        

        {/* Question */}
        <Form.Group>
          <label className={labelClass}>Question *</label>
          <Form.Control
            className={inputClass}
            value={form.question}
            onChange={(e) => handleChange("question", e.target.value)}
          />
        </Form.Group>

        {/* Answer */}
        <Form.Group>
          <label className={labelClass}>Answer *</label>
          <Form.Control
            className={inputClass}
            value={form.answer}
            onChange={(e) => handleChange("answer", e.target.value)}
          />
        </Form.Group>

        

        

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <Button
            onClick={onCancel}
            className="px-5 py-2.5 border border-[#155DFC] bg-white text-[#155DFC] rounded-lg hover:bg-[#155DFC]/5"
          >
            Cancel
          </Button>

          <GradientButton type="submit" isFull={false}>
            {mode === "add" ? "Create Fqa" : "Update Fqa"}
          </GradientButton>
        </div>
      </Form>
    </div>
  );
};

export default FQAForm;
