import { useState } from "react";
import prescription from "../../data/appointments";
import Pagination from "../common/Pagination";
import InfoMessage from "../common/InfoMessage";
import ConfirmDialog from "../common/ComfirmDialog";
import PrescriptionCard from "./PrescriptionCard";
import { jsPDF } from "jspdf";
import PrescriptionDetail from "./PrescriptionDetail"

const Prescriptions = () => {
  const [appointments, setItems] = useState([...prescription]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState(null);

  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const [showCancel, setShowCancel] = useState(false);

  const itemsPerPage = 5;

  // filter
  const filtered = appointments.filter(
    (p) =>
      p.service.toLowerCase().includes(search.toLowerCase()) ||
      p.doctor.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleView = (appt) => {
    setSelectedPrescription(appt);
    showMessage(`Viewing prescription ${prescription.service}`);
  };

  const handleBack = () => {
    setSelectedPrescription(null);
  };

  const handleDownload = (prescription) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Prescription Details", 20, 20);

    doc.setFontSize(12);
    doc.text(`Service: ${prescription.service}`, 20, 40);
    doc.text(`Doctor: ${prescription.doctor}`, 20, 50);
    doc.text(`Code: ${prescription.code}`, 20, 60);
    doc.text(`Issued Date: ${prescription.issuedDate}`, 20, 70);
    doc.text(`Next Visit: ${prescription.nextVisit}`, 20, 80);
    doc.text(`Status: ${prescription.status}`, 20, 90);

    // savePDF
    doc.save(`prescription_${prescription.code}.pdf`);

    showMessage(`Downloaded prescription ${prescription.code} as PDF`);
  };

  const handleCancelClick = (prescription) => {
    setSelectedPrescription(prescription);
    setShowCancel(true);
  };

  const confirmCancel = () => {
    setItems(
      appointments.map((p) =>
        p.id === selectedPrescription.id
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
        <div className="flex flex-col pt-3">
          {paginated.map((p) => (
            <PrescriptionCard
              key={p.id}
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
            <strong>{selectedPrescription?.code}</strong> as expired?
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
