import React, { useState,useEffect } from "react";
import SuccessModal from "./SuccessModal";
import Confetti from "./Confetti";

function ValidationSuccess({setShowSuccessCard}) {
  const [startConfetti, setStartConfetti] = useState(false);

  useEffect(() => {
    setStartConfetti(true);
  },[startConfetti]);

  return (
    <div>
      <SuccessModal
        setShowSuccessCard={setShowSuccessCard}
        startConfetti={startConfetti}
      />
      <Confetti startConfetti={startConfetti} setStartConfetti={setStartConfetti} />
    </div>
  );
}

export default ValidationSuccess;