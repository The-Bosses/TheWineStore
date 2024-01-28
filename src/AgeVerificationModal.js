import React, { useState, useEffect } from "react";

const AgeVerificationModal = ({ onClose, onVerify }) => {
  const [verificationSuccessful, setVerificationSuccessful] = useState(false);

  useEffect(() => {
    if (verificationSuccessful) {
      onClose();
    }
  }, [verificationSuccessful, onClose]);

  const handleVerify = (isVerified) => {
    if (isVerified) {
      onVerify();
      setVerificationSuccessful(true);
    } else {
      alert("You must be at least 21 years old.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white text-black p-8 rounded-md">
        <div className="bg-white max-w-xs overflow-hidden flex items-center justify-center">
          <img
            src="public/Logos/plonk_logo_transparent.png"
            alt="Logo"
            className="w-32 h-32 object-contain"
          />
        </div>
        <div className="bg-white max-w-xs overflow-hidden flex itmes-center justify-center">
          <h2 className="text-2xl font-bold mb-4">
            Sorry, but we have to ask...
          </h2>
        </div>
        <div className="bg-white max-w-xs overflow-hidden flex itmes-center justify-center">
          <p className="mb-4">Are you at least 21 years old?</p>
        </div>

        <div></div>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => handleVerify(true)}
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
          >
            Yes
          </button>
          <button
            onClick={() => handleVerify(false)}
            className="bg-gray-300 text-white py-2 px-4 rounded-md"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
