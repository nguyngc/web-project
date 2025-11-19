import {prescriptions} from "../data/patients";
import PrescriptionCard from "./PrescriptionCard";

function Prescriptions() {
  return (
    <div className="w-full px-4 lg:px-[100px] py-8 flex flex-col gap-6">
      
      {prescriptions.map((p) => (
        <PrescriptionCard key={p.id} prescription={p} />
      ))}
    </div>
  );
}

export default Prescriptions;
