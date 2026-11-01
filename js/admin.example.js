/**
 * ==========================================================================
 * Serd Ventures - Admin Control Panel Controller Template
 * Copy this file to js/admin.js and set your own secure credentials.
 * ==========================================================================
 */

// Configure your Admin Credentials locally
const ADMIN_USER = "YOUR_USERNAME_HERE";
const ADMIN_PASS = "YOUR_PASSWORD_HERE";

// State
let lastGeneratedOtp = "";
let lastCustPhone = "";
let lastCustName = "";

document.addEventListener("DOMContentLoaded", () => {
  // Check auth status
  if (sessionStorage.getItem("serd_admin_authenticated") === "true") {
    showDashboard();
  } else {
    showLogin();
  }

  // Load custom PDF link if saved
  const defaultPdf = (typeof CONFIG !== "undefined" && CONFIG.defaultPdfPath) 
    ? CONFIG.defaultPdfPath 
    : "DropShipping-and-WholesaleHub-in-BD.pdf";
  const savedPdf = localStorage.getItem("serd_pdf_download_url") || defaultPdf;
  const pdfInput = document.getElementById("customPdfUrl");
  if (pdfInput) pdfInput.value = savedPdf;

  // Render history
  renderOtpHistory();
});

/**
 * Show Login Screen
 */
function showLogin() {
  const login = document.getElementById("loginScreen");
  const dashboard = document.getElementById("dashboardScreen");
  if (login) login.classList.remove("hidden");
  if (dashboard) dashboard.classList.add("hidden");
}

/**
 * Show Dashboard Screen
 */
function showDashboard() {
  const login = document.getElementById("loginScreen");
  const dashboard = document.getElementById("dashboardScreen");
  if (login) login.classList.add("hidden");
  if (dashboard) dashboard.classList.remove("hidden");
  renderOtpHistory();
}

/**
 * Admin Login Handler
 */
function handleAdminLogin(e) {
  e.preventDefault();
  const userEl = document.getElementById("adminUsername");
  const passEl = document.getElementById("adminPassword");
  const errorMsg = document.getElementById("loginErrorMsg");

  const user = userEl ? userEl.value.trim() : "";
  const pass = passEl ? passEl.value.trim() : "";

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    sessionStorage.setItem("serd_admin_authenticated", "true");
    if (errorMsg) errorMsg.classList.add("hidden");
    showDashboard();
  } else {
    if (errorMsg) errorMsg.classList.remove("hidden");
  }
}

/**
 * Admin Logout
 */
function handleAdminLogout() {
  sessionStorage.removeItem("serd_admin_authenticated");
  showLogin();
}

/**
 * Handle Generate OTP Button Click
 */
function handleGenerateNewOtp() {
  const nameInput = document.getElementById("custName");
  const phoneInput = document.getElementById("custPhone");

  const custName = nameInput ? nameInput.value.trim() : "";
  const custPhone = phoneInput ? phoneInput.value.trim() : "";

  const otp = (typeof generateOtpCode === "function") 
    ? generateOtpCode() 
    : Math.floor(100000 + Math.random() * 900000).toString();

  lastGeneratedOtp = otp;
  lastCustName = custName;
  lastCustPhone = custPhone;

  // Update UI
  const placeholder = document.getElementById("noOtpPlaceholder");
  const otpContainer = document.getElementById("otpDisplayContainer");
  const activeOtpText = document.getElementById("activeGeneratedOtp");

  if (placeholder) placeholder.classList.add("hidden");
  if (otpContainer) otpContainer.classList.remove("hidden");
  if (activeOtpText) activeOtpText.textContent = otp;

  // Save to localStorage history
  const history = getOtpHistory();
  history.unshift({
    otp: otp,
    name: custName || "N/A",
    phone: custPhone || "N/A",
    date: new Date().toLocaleString("en-GB")
  });
  localStorage.setItem("serd_otp_history", JSON.stringify(history));

  renderOtpHistory();
}

/**
 * Copy Active OTP
 */
function copyGeneratedOtp() {
  if (!lastGeneratedOtp) return;
  navigator.clipboard.writeText(lastGeneratedOtp).then(() => {
    const btnText = document.getElementById("copyOtpBtnText");
    if (btnText) btnText.textContent = "কপি হয়েছে!";
    setTimeout(() => {
      if (btnText) btnText.textContent = "ওটিপি কপি করুন";
    }, 2000);
  });
}

/**
 * Share OTP directly to Customer WhatsApp
 */
function sendOtpToWhatsApp() {
  if (!lastGeneratedOtp) return;
  
  let cleanPhone = lastCustPhone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('01')) {
    cleanPhone = '88' + cleanPhone;
  }

  const msg = 
`ধন্যবাদ! আপনার DropShipping and WholesaleHub in BD ই-বুকটি ডাউনলোড করার ওটিপি কোড: ${lastGeneratedOtp}

নিচের লিংকে গিয়ে ওটিপি কোডটি দিয়ে সরাসরি ডাউনলোড করুন:
https://serdventure.web.app/download.html?otp=${lastGeneratedOtp}`;

  const waUrl = cleanPhone 
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`
    : `https://wa.me/?text=${encodeURIComponent(msg)}`;

  window.open(waUrl, "_blank");
}

/**
 * Save Custom PDF Download URL
 */
function saveCustomPdfUrl() {
  const input = document.getElementById("customPdfUrl");
  const val = input ? input.value.trim() : "";
  if (val) {
    localStorage.setItem("serd_pdf_download_url", val);
    const fb = document.getElementById("saveUrlFeedback");
    if (fb) {
      fb.classList.remove("hidden");
      setTimeout(() => fb.classList.add("hidden"), 2500);
    }
  }
}

/**
 * OTP History Retrieval from localStorage
 */
function getOtpHistory() {
  try {
    return JSON.parse(localStorage.getItem("serd_otp_history")) || [];
  } catch (e) {
    return [];
  }
}

/**
 * Render OTP Table in Dashboard
 */
function renderOtpHistory() {
  const history = getOtpHistory();
  const tbody = document.getElementById("otpHistoryTableBody");
  const statTotal = document.getElementById("statTotalOtp");

  if (statTotal) statTotal.textContent = history.length;

  if (!tbody) return;

  if (history.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-400">এখনো কোনো ওটিপি জেনারেট করা হয়নি।</td></tr>`;
    return;
  }

  tbody.innerHTML = history.map((item, index) => `
    <tr class="hover:bg-slate-50 transition border-b border-slate-100">
      <td class="py-3 px-4 font-mono text-[11px] text-slate-500">${item.date}</td>
      <td class="py-3 px-4 font-black text-slate-900 font-number text-sm tracking-wider text-orange-600">${item.otp}</td>
      <td class="py-3 px-4 font-medium text-slate-800">${item.name}</td>
      <td class="py-3 px-4 font-number text-slate-600">${item.phone}</td>
      <td class="py-3 px-4 text-right">
        <button onclick="copySpecificOtp('${item.otp}')" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded text-[11px] font-bold mr-1">
          Copy
        </button>
        <button onclick="deleteOtpEntry(${index})" class="text-red-500 hover:text-red-700 font-bold px-1 text-[11px]">
          ✕
        </button>
      </td>
    </tr>
  `).join("");
}

function copySpecificOtp(otp) {
  navigator.clipboard.writeText(otp).then(() => alert("OTP " + otp + " copied!"));
}

function deleteOtpEntry(index) {
  const history = getOtpHistory();
  history.splice(index, 1);
  localStorage.setItem("serd_otp_history", JSON.stringify(history));
  renderOtpHistory();
}

function clearOtpHistory() {
  if (confirm("আপনি কি সব ওটিপি হিস্টোরি মুছে ফেলতে চান?")) {
    localStorage.removeItem("serd_otp_history");
    renderOtpHistory();
  }
}
