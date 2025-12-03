import { useState, useEffect } from "react";
import prescription from "../../data/appointments";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";
import ConfirmDialog from "../common/ComfirmDialog";
import PrescriptionCard from "./PrescriptionCard";
import { jsPDF } from "jspdf";
import PrescriptionDetail from "./PrescriptionDetail"

const Prescriptions = () => {
  const [appointments, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState(null);

  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const [showCancel, setShowCancel] = useState(false);

  const itemsPerPage = 3;

  // fetch user
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Fetch prescriptions from backend
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await fetch(`/api/appointments?userId=${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setItems(data);
        } else {
          showMessage(data.message || "Failed to fetch prescriptions", "error");
        }
      } catch (err) {
        showMessage("Network error", "error");
      }
    };

    if (user && token) fetchPrescriptions();
  }, [user, token]);

  // Filter + paginate
  const filtered = appointments.filter((a) => {
    const doctorName = a.doctorId
      ? `${a.doctorId.firstName || ""} ${a.doctorId.lastName || ""}`.toLowerCase()
      : "";

    const serviceName = a.serviceId?.serviceName
      ? a.serviceId.serviceName.toLowerCase()
      : "";

    const code = a._id
      ? String(a._id).toLowerCase()
      : "";
    return (
      doctorName.includes(search.toLowerCase()) ||
      serviceName.includes(search.toLowerCase()) ||
      code.includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleView = (appt) => {
    setSelectedPrescription(appt);
    showMessage(`Viewing prescription ${appt.serviceId?.serviceName || ""}`);
  };

  const handleBack = () => {
    setSelectedPrescription(null);
  };

  const handleDownload = (appt) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Prescription Details", 20, 20);

    doc.setFontSize(12);
    doc.text(`Service: ${appt.serviceId?.serviceName || ""}`, 20, 40);
    doc.text(`Doctor: ${appt.doctorId ? appt.doctorId.firstName + " " + appt.doctorId.lastName : ""}`, 20, 50);
    doc.text(`Code: ${appt._id}`, 20, 60);
    doc.text(`Issued Date: ${appt.date}`, 20, 70);
    doc.text(`Next Visit: ${appt.nextVisit || ""}`, 20, 80);
    doc.text(`Status: ${appt.status}`, 20, 90);

    doc.save(`prescription_${appt._id}.pdf`);
    showMessage(`Downloaded prescription ${appt._id} as PDF`);
  };

  const handleCancelClick = (prescription) => {
    setSelectedPrescription(prescription);
    setShowCancel(true);
  };

  const confirmCancel = () => {
    setItems(
      appointments.map((p) =>
        p._id === selectedPrescription._id
          ? { ...p, status: "expired" }
          : p
      )
    );
    showMessage("Prescription marked as expired");
    setShowCancel(false);
    setSelectedPrescription(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-base font-medium text-[#0A0A0A]">Prescriptions</h1>
      </div>

      {message && (
        <InfoMessage message={message} onClose={() => setMessage(null)} />
      )}

      {/* Rows */}
      {selectedPrescription ? (
        <PrescriptionDetail
          appt={selectedPrescription}
          onBack={handleBack}
        />
      ) : (
        <div className="flex flex-col gap-6">
          {paginated.map((p) => (
            <PrescriptionCard
              key={p._id}
              appt={p}
              onView={handleView}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}


      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filtered.length}
        onPageChange={setPage}
        itemLabel="prescriptions"
      />

      {/* Cancel dialog */}
      <ConfirmDialog
        show={showCancel}
        title="Mark Prescription as Expired?"
        message={
          <>
            Are you sure you want to mark prescription{" "}
            <strong>{selectedPrescription?._id}</strong> as expired?
          </>
        }
        confirmText="Expire Prescription"
        confirmVariant="danger"
        onConfirm={confirmCancel}
        onCancel={() => setShowCancel(false)}
      />
    </div>
  );
};

export default Prescriptions;
