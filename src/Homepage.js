import React, { useState } from "react";
import AgeVerificationModal from "./AgeVerificationModal";

const Homepage = ({ isAgeVerificationCompleted, onCloseAgeVerificationModal, onVerifyAge }) => {
  if (!isAgeVerificationCompleted) {
    return (
      <AgeVerificationModal
        onClose={onCloseAgeVerificationModal}
        onVerify={onVerifyAge}
      />
    );
  }

  return (
    <div>
      {/* Your regular homepage content goes here */}
      <h1>Welcome to the Homepage!</h1>
      {/* Other content */}
    </div>
  );
};

export default Homepage;
