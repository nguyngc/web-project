import {patients} from "../data/patients";
import PatientCard from "./PatientCard";
import { Search } from "lucide-react";

function PatientList() {
  return (
    <div className="w-full px-4 lg:px-[100px] py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col justify-center items-start gap-2 w-[736px]">
          <h2 className="text-[#0A0A0A] font-inter font-medium text-[16px] leading-[16px]">
            Patient Records
          </h2>
          <p className="text-[#717182] font-inter text-[16px] leading-[24px]">
            View patient details, history, and manage prescriptions
          </p>
          <div className="flex flex-row items-center gap-2 px-3 py-2 w-[736px] h-[37px] bg-[#F3F3F5] rounded-lg">
            <Search className="w-4 h-4 text-[#99A1AF]" />
            <input
              type="text"
              placeholder="Search patients by name..."
              className="bg-transparent outline-none text-[#717182] text-sm font-inter"
            />
          </div>
        </div>

        {/* Patient List */}
        <div className="flex flex-col justify-center items-start gap-2 w-[736px]">
          {patients.map((patient) => (
            <PatientCard key={patient.id} {...patient} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientList;

