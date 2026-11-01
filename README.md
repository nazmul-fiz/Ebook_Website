# DropShipping and WholesaleHub in BD - Ebook Sales Portal

A high-converting landing page, automated bKash-to-WhatsApp checkout system, cryptographic OTP verification engine, and admin portal for digital ebook sales in Bangladesh.

---

## 📁 Project Structure

```text
Ebook Website_R/
├── assets/
│   ├── images/
│   │   └── ebook-cover.jpg             # Ebook cover mockup and graphics
│   └── docs/
│       └── DropShipping-and-WholesaleHub-in-BD.pdf  # The official digital PDF
├── css/
│   └── style.css                       # Global styles, fonts, scrollbars & modal effects
├── js/
│   ├── config.js                       # Central project configuration (bKash & WhatsApp numbers)
│   ├── otp.js                          # Cryptographic checksum OTP engine (generator & validator)
│   ├── main.js                         # Landing page controller (modal, copy bKash, WhatsApp link)
│   ├── download.js                     # Download page controller (URL query parameter & instant unlock)
│   └── admin.js                        # Admin panel controller (login, OTP generator & customer records)
├── index.html                          # Main high-conversion sales landing page
├── download.html                       # Customer PDF download page (protected by 6-digit OTP)
├── admin.html                          # Merchant admin dashboard (OTP generator & order logs)
├── firebase.json                       # Google Firebase Hosting configuration
├── .firebaserc                         # Firebase project target mapping
├── deploy-to-firebase.bat              # One-click deployment script to Firebase Hosting
└── README.md                           # Project documentation
```

---

## ⚙️ Configuration (`js/config.js`)

Edit `js/config.js` to change payment details or contact info:
- **bKash Number**: `01308689162`
- **WhatsApp Support Number**: `8801560026371`
- **Ebook Title**: `DropShipping and WholesaleHub in BD`
- **Ebook Price**: `২৪৯ টাকা`

---

## 🔐 Admin Dashboard Access

Access URL: `admin.html`
- Configure your admin login credentials privately in `js/admin.js` on your local environment.
- Do not commit your private credentials to public version control.

From the Admin Dashboard you can:
1. Generate valid 6-digit OTPs for paid customers.
2. Send the OTP and direct download link directly to the customer's WhatsApp with 1 click.
3. Manage customer history and change the PDF destination URL.

---

## 🚀 How It Works

1. **Customer visits `index.html`**:
   - Reads ebook benefits, contents, and reviews.
   - Clicks **"ই-বুকটি কিনুন"** -> Modal opens showing bKash Send Money instructions.
   - User copies bKash number and completes payment.
   - User enters Name, WhatsApp number, and Last 3 digits of bKash number.
   - System automatically generates a formatted WhatsApp message and opens WhatsApp chat with the seller.

2. **Merchant receives WhatsApp order**:
   - Verifies bKash payment in their bKash app.
   - Opens `admin.html`, generates an OTP, and sends it back to the customer's WhatsApp.

3. **Customer Downloads the Ebook**:
   - Opens `download.html?otp=XXXXXX` (or enters the 6-digit OTP manually).
   - OTP is verified instantly by the mathematical checksum engine.
   - Download unlocks and starts automatically!

---

## 🌐 Deployment to Firebase Hosting

To deploy updates to `https://serdventure.web.app`:
1. Double-click `deploy-to-firebase.bat`.
2. Follow on-screen instructions to authenticate and deploy.

