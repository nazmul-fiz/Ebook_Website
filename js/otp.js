/**
 * ==========================================================================
 * Serd Ventures - OTP Verification & Generation Engine
 * Uses a mathematical hashing algorithm so OTPs can be verified anywhere
 * without needing an external database server!
 * ==========================================================================
 */

const SERD_OTP_SECRET = (typeof CONFIG !== "undefined" && CONFIG.otpSecret) 
  ? CONFIG.otpSecret 
  : "SERD_VENTURES_SECRET_KEY_2026";

/**
 * Calculates a 2-digit checksum from a 4-digit numeric payload
 * @param {number|string} payload 
 * @returns {number} 2-digit checksum (11 to 99)
 */
function calculateOtpChecksum(payload) {
  let hash = 5381;
  const str = String(payload) + "_" + SERD_OTP_SECRET;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 89) + 11;
}

/**
 * Generates a valid 6-digit OTP code (4-digit payload + 2-digit checksum)
 * @returns {string} 6-digit OTP
 */
function generateOtpCode() {
  const payload = Math.floor(1000 + Math.random() * 9000);
  const checksum = calculateOtpChecksum(payload);
  return String(payload) + String(checksum);
}

/**
 * Verifies if a given 6-digit OTP code is mathematically authentic
 * @param {string|number} otp 
 * @returns {boolean}
 */
function verifyOtpCode(otp) {
  if (!otp) return false;
  const cleaned = String(otp).trim().replace(/[^0-9]/g, '');
  if (cleaned.length !== 6) return false;

  const payload = parseInt(cleaned.substring(0, 4), 10);
  const providedCheck = parseInt(cleaned.substring(4, 6), 10);

  if (isNaN(payload) || isNaN(providedCheck)) return false;
  return providedCheck === calculateOtpChecksum(payload);
}

// Alias for backwards compatibility with inline functions
const calculateChecksum = calculateOtpChecksum;
const verifyModalOtp = verifyOtpCode;

if (typeof module !== "undefined" && module.exports) {
  module.exports = { calculateOtpChecksum, generateOtpCode, verifyOtpCode };
}

