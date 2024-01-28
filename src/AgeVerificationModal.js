import React, { useState, useEffect } from "react";

const AgeVerificationModal = ({ onClose, onVerify }) => {
  const [enteredAge, setEnteredAge] = useState("");
  const [verificationSuccessful, setVerificationSuccessful] = useState(false);

  useEffect(() => {
    if (verificationSuccessful) {
      onClose();
    }
  }, [verificationSuccessful, onClose]);

  const handleVerify = () => {
    // Validate the entered age
    if (enteredAge >= 21) {
      onVerify();
      setVerificationSuccessful(true);
      onClose();
    } else {
      alert("You must be at least 21 years old.");
    }
  };

  return (
    <div className="bg-gray-400 modal flex-auto">
      <h2>Age Verification</h2>
      <p>Please enter your age:</p>
      <input
        type="number"
        value={enteredAge}
        onChange={(e) => setEnteredAge(e.target.value)}
        className="bg-gray-200"
      />
      <button className="" onClick={handleVerify}>Verify</button>
      <button className="" onClick={onClose} disabled={!verificationSuccessful}>
        Close
      </button>
    </div>
  );
};

export default AgeVerificationModal;
