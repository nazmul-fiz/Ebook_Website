/**
 * ==========================================================================
 * Serd Ventures - Ebook Download Portal Logic (download.html)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Resolve custom PDF URL (configured in Admin Dashboard) or fallback to local PDF
  const defaultPdf = (typeof CONFIG !== "undefined" && CONFIG.defaultPdfPath) 
    ? CONFIG.defaultPdfPath 
    : "DropShipping-and-WholesaleHub-in-BD.pdf";
    
  const savedPdf = localStorage.getItem("serd_pdf_download_url") || defaultPdf;
  const directBtn = document.getElementById("directPdfDownloadBtn");
  if (directBtn) {
    directBtn.href = savedPdf;
  }

  // 2. Check for OTP passed via URL query parameter (e.g., download.html?otp=123456)
  const urlParams = new URLSearchParams(window.location.search);
  const queryOtp = urlParams.get("otp");
  if (queryOtp) {
    const otpInput = document.getElementById("downloadOtpInput");
    if (otpInput) {
      otpInput.value = queryOtp;
    }
    verifyAndUnlock(queryOtp);
  }
});

/**
 * Handle Download OTP Form Submit
 * @param {Event} e 
 */
function handleDownloadOtpSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("downloadOtpInput");
  const otp = input ? input.value.trim() : "";
  verifyAndUnlock(otp);
}

/**
 * Verify OTP & Unlock Download Section
 * @param {string} otp 
 */
function verifyAndUnlock(otp) {
  const errorEl = document.getElementById("otpErrorMessage");

  if (typeof verifyOtpCode === "function" && verifyOtpCode(otp)) {
    if (errorEl) errorEl.classList.add("hidden");

    // Show Success Section, Hide Input Section
    const inputSection = document.getElementById("otpInputSection");
    const successSection = document.getElementById("downloadSuccessSection");
    if (inputSection) inputSection.classList.add("hidden");
    if (successSection) successSection.classList.remove("hidden");

    // Trigger Auto Download after 500ms
    setTimeout(() => {
      const directBtn = document.getElementById("directPdfDownloadBtn");
      if (directBtn) directBtn.click();
    }, 500);

  } else {
    if (errorEl) errorEl.classList.remove("hidden");
  }
}

