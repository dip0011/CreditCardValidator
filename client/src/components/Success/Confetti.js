import React, { useEffect, useState } from "react";
import Confetti from 'react-confetti';

function ConfettiComponent({startConfetti, setStartConfetti}) {
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
      setIsAnimating(true);

      setTimeout(() => {
          setIsAnimating(false);
      }, 4000);
  };

  useEffect(() => {
      if (startConfetti) {
          startAnimation();
      }
  }, [startConfetti]);
return (
    <>
        {isAnimating && <Confetti width={window.innerWidth-10} height={window.innerHeight-10} />}
    </>
  );
}

export default ConfettiComponent;
