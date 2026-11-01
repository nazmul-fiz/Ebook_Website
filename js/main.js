/**
 * ==========================================================================
 * Serd Ventures - Landing Page Controller (index.html)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Set current copyright year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Set dynamic bKash number on UI
  const displayBkashEl = document.getElementById("displayBkashNumber");
  if (displayBkashEl && typeof CONFIG !== "undefined") {
    displayBkashEl.textContent = CONFIG.bkashNumber;
  }
});

// Modal Elements
const checkoutModal = document.getElementById("checkoutModal");
const modalContainer = document.getElementById("modalContainer");

/**
 * Open Checkout Modal
 */
function openCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  const container = document.getElementById("modalContainer");
  if (!modal || !container) return;

  modal.classList.remove("opacity-0", "pointer-events-none");
  modal.classList.add("opacity-100", "pointer-events-auto");

  container.classList.remove("scale-95");
  container.classList.add("scale-100");

  document.body.classList.add("overflow-hidden");

  setTimeout(() => {
    const nameInput = document.getElementById("userName");
    if (nameInput) nameInput.focus();
  }, 150);
}

/**
 * Close Checkout Modal
 */
function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  const container = document.getElementById("modalContainer");
  if (!modal || !container) return;

  modal.classList.remove("opacity-100", "pointer-events-auto");
  modal.classList.add("opacity-0", "pointer-events-none");

  container.classList.remove("scale-100");
  container.classList.add("scale-95");

  document.body.classList.remove("overflow-hidden");
}

// Global modal event listeners
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("checkoutModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeCheckoutModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.classList.contains("opacity-0")) {
      closeCheckoutModal();
    }
  });
});

/**
 * One-Click Copy for bKash Number
 */
function copyBkashNumber() {
  const num = (typeof CONFIG !== "undefined" ? CONFIG.bkashNumber : "01308689162");
  const numberToCopy = num.replace(/[^0-9]/g, '');

  navigator.clipboard.writeText(numberToCopy).then(() => {
    const copyBtnText = document.getElementById("copyBtnText");
    const alertEl = document.getElementById("copySuccessAlert");
    
    if (copyBtnText) copyBtnText.textContent = "কপি হয়েছে!";
    if (alertEl) alertEl.classList.remove("hidden");

    setTimeout(() => {
      if (copyBtnText) copyBtnText.textContent = "কপি করুন";
      if (alertEl) alertEl.classList.add("hidden");
    }, 2500);
  }).catch(err => {
    console.error("Clipboard copy failed: ", err);
  });
}

/**
 * Handle Checkout Form Submission (bKash to WhatsApp Direct Link)
 */
function handleCheckoutSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById("userName");
  const whatsappInput = document.getElementById("userWhatsApp");
  const digitsInput = document.getElementById("bkashDigits");

  const userName = nameInput ? nameInput.value.trim() : "";
  const userWhatsApp = whatsappInput ? whatsappInput.value.trim() : "";
  const bkashDigits = digitsInput ? digitsInput.value.trim() : "";

  if (!userName || !userWhatsApp || !bkashDigits) {
    alert("অনুগ্রহ করে সব তথ্য সঠিকভাবে পূরণ করুন।");
    return;
  }

  if (bkashDigits.length !== 3) {
    alert("বিকাশ নাম্বারের শেষের ঠিক ৩টি সংখ্যা দিন।");
    if (digitsInput) digitsInput.focus();
    return;
  }

  const ebookTitle = (typeof CONFIG !== "undefined" ? CONFIG.ebookTitle : "DropShipping and WholesaleHub in BD");
  const whatsappNumber = (typeof CONFIG !== "undefined" ? CONFIG.whatsappNumber : "8801560026371");

  // Generate the formatted WhatsApp message
  const messageBody = 
`Hi, I just purchased the Ebook (${ebookTitle}).
Name: ${userName}
My WhatsApp: ${userWhatsApp}
bKash Last 3 Digits: ${bkashDigits}`;

  const encodedMessage = encodeURIComponent(messageBody);
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // Reset form & close modal
  const form = document.getElementById("checkoutForm");
  if (form) form.reset();
  closeCheckoutModal();

  // Open WhatsApp in new tab
  window.open(waUrl, "_blank");
}

/**
 * Modal Tab Switcher (bKash Order vs OTP Download)
 */
function switchModalTab(tab) {
  const panelOrder = document.getElementById("modalPanelOrder");
  const panelOtp = document.getElementById("modalPanelOtp");
  const btnOrder = document.getElementById("tabBtnOrder");
  const btnOtp = document.getElementById("tabBtnOtp");

  if (tab === 'otp') {
    if (panelOrder) panelOrder.classList.add("hidden");
    if (panelOtp) panelOtp.classList.remove("hidden");

    if (btnOrder) {
      btnOrder.className = "flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900";
    }
    if (btnOtp) {
      btnOtp.className = "flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-1.5 bg-white text-slate-900 shadow-sm border border-slate-200";
    }

    setTimeout(() => {
      const otpInput = document.getElementById("modalTabOtpInput");
      if (otpInput) otpInput.focus();
    }, 100);
  } else {
    if (panelOrder) panelOrder.classList.remove("hidden");
    if (panelOtp) panelOtp.classList.add("hidden");

    if (btnOrder) {
      btnOrder.className = "flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-1.5 bg-white text-slate-900 shadow-sm border border-slate-200";
    }
    if (btnOtp) {
      btnOtp.className = "flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900";
    }
  }
}

/**
 * Open Modal directly to OTP Tab
 */
function openOtpTab() {
  openCheckoutModal();
  switchModalTab('otp');
}

/**
 * Verify OTP from Modal Tab & Open Download Page
 */
function handleVerifyAndOpenDownloadPage() {
  const input = document.getElementById("modalTabOtpInput");
  const errorEl = document.getElementById("modalTabOtpError");
  const otp = input ? input.value.trim() : "";

  if (typeof verifyOtpCode === "function" && verifyOtpCode(otp)) {
    if (errorEl) errorEl.classList.add("hidden");
    window.location.href = "download.html?otp=" + encodeURIComponent(otp);
  } else {
    if (errorEl) {
      errorEl.classList.remove("hidden");
      errorEl.textContent = "✕ ভুল ওটিপি কোড! অনুগ্রহ করে হোয়াটসঅ্যাপে পাওয়া ৬-ডিজিটের সঠিক ওটিপি লিখুন।";
    }
  }
}

/**
 * Verify OTP from Homepage Quick Section & Open Download Page
 */
function handleHomepageOtpSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("homepageOtpInput");
  const errorEl = document.getElementById("homepageOtpError");
  const otp = input ? input.value.trim() : "";

  if (typeof verifyOtpCode === "function" && verifyOtpCode(otp)) {
    if (errorEl) errorEl.classList.add("hidden");
    window.location.href = "download.html?otp=" + encodeURIComponent(otp);
  } else {
    if (errorEl) {
      errorEl.classList.remove("hidden");
      errorEl.textContent = "✕ ভুল ওটিপি কোড! অনুগ্রহ করে হোয়াটসঅ্যাপে পাওয়া ৬-ডিজিটের সঠিক ওটিপি দিন।";
    }
  }
}

/**
 * Handle Customer OTP Download Inside Modal Bottom Card
 */
function handleModalOtpDownload() {
  const input = document.getElementById("modalOtpInput");
  const alertEl = document.getElementById("modalOtpAlert");
  const unlockedEl = document.getElementById("modalDownloadUnlocked");
  const downloadBtn = document.getElementById("modalDownloadBtn");

  const otp = input ? input.value.trim() : "";

  if (typeof verifyOtpCode === "function" && verifyOtpCode(otp)) {
    if (alertEl) {
      alertEl.className = "text-xs font-bold p-2.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 block";
      alertEl.textContent = "✓ ওটিপি সফলভাবে ভেরিফাই হয়েছে! ডাউনলোড শুরু হচ্ছে...";
    }
    if (unlockedEl) unlockedEl.classList.remove("hidden");

    const customUrl = localStorage.getItem("serd_pdf_download_url") || "DropShipping-and-WholesaleHub-in-BD.pdf";
    if (downloadBtn) {
      downloadBtn.href = customUrl;
      setTimeout(() => downloadBtn.click(), 500);
    }
  } else {
    if (alertEl) {
      alertEl.className = "text-xs font-bold p-2.5 rounded-xl bg-red-100 text-red-700 border border-red-300 block";
      alertEl.textContent = "✕ ভুল ওটিপি কোড! অনুগ্রহ করে হোয়াটসঅ্যাপে পাওয়া ৬-ডিজিটের ওটিপি লিখুন।";
    }
    if (unlockedEl) unlockedEl.classList.add("hidden");
  }
}

