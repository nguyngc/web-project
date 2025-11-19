import {prescriptions} from "../../data/patients";
import PrescriptionCard from "./PrescriptionCard";

function Prescriptions() {
  return (
    <div className="w-full px-4 lg:px-[100px] py-8 flex flex-col gap-6">
      
      {prescriptions.map((prescription) => (
        <PrescriptionCard key={prescription.id} {...prescription} />
      ))}
    </div>
  );
}

export default Prescriptions;
