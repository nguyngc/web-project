import { useState, useEffect } from "react";
import SelectStep from "./appointment/SelectStep";
import AuthStep from "./appointment/AuthStep";
import ConfirmStep from "./appointment/ConfirmStep";
import SuccessStep from "./appointment/SuccessStep";

function BookAppointment() {
  const [step, setStep] = useState(1);    // step 1=select, 2=auth, 3=confirm, 4=success
  const [appointment, setAppointment] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const handleLogin = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
      setStep(3);
    };

    window.addEventListener("userLogin", handleLogin);
    return () => window.removeEventListener("userLogin", handleLogin);
  }, []);

  const handleSlotSelect = (data) => {
    setAppointment(data);
    if (user) setStep(3);
    else setStep(2);
  };


  return (
    <section>
      {step === 1 && <SelectStep onSelectSlot={handleSlotSelect} />}
      {step === 2 && <AuthStep appointment={appointment} />}
      {step === 3 && <ConfirmStep user={user} appointment={appointment} setStep={setStep} />}
      {step === 4 && <SuccessStep appointment={appointment} />}
    </section>
  );
}

export default BookAppointment;