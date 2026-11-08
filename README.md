# Young Wombs Trauma Centre Website & Yo! Payments Gateway

Official website codebase for **Young Wombs Trauma Centre** (Wakiso, Uganda & Kericho, Kenya), featuring a Donorbox-inspired interactive donation portal with live **Yo! Payments Mobile Money API** integration.

---

## ☁️ cPanel Deployment Instructions (Native PHP Gateway)

Standard cPanel hosting runs Apache & PHP natively out of the box. An `api/yo-payment.php` gateway is included so your Mobile Money transactions work immediately upon uploading!

### 3-Step cPanel Upload Guide:

1. **Upload Files via cPanel File Manager**:
   - Log into your cPanel dashboard.
   - Open **File Manager** and navigate to `public_html` (or your domain folder).
   - Upload all project HTML files, `assets/`, and the `api/` folder.

2. **Configure Your Credentials in `api/config.php`**:
   - Open `api/config.php` in the cPanel code editor.
   - Enter your Yo! Payments merchant account credentials:
     ```php
     <?php
     return [
         'YO_API_USERNAME' => 'your_yo_api_username_here', // e.g., 90000000000
         'YO_API_PASSWORD' => 'your_yo_api_password_here',
         'YO_MODE'         => 'production', // 'production' or 'sandbox'
         'USD_TO_UGX_RATE' => 3700
     ];
     ```
   - Save changes.

3. **Test Live Mobile Money Donations**:
   - Visit `https://yourdomain.com/donate.html` on your phone or computer.
   - Select **Mobile Money (Yo!)**, enter your phone number, and submit.
   - Yo! Payments will send a live USSD PIN prompt directly to your phone!

---

## 🚀 Local Server Preview (Node.js)

To run locally on your computer with Node.js:

```bash
# Start the local server (runs on http://localhost:3000)
npm start
```

Open `http://localhost:3000` in your web browser. Local Node server settings can be configured in `.env`.

---

## 📂 Project File Structure

```
├── index.html                 # Main Homepage
├── about.html                 # About Us Page
├── programmes.html            # Programmes Overview Page
├── mezaduara-initiative.html  # MezaDuara Violence Prevention (VAWG) Page
├── javi-hub.html              # JAVI Skills & Innovation Hub Page
├── periods-with-dignity.html  # Periods With Dignity Campaign Page
├── donate.html                # Interactive Donation Page (Yo! Payments & DPO)
├── stories.html               # Field Stories & News Updates
├── get-involved.html          # Partnerships & Volunteering Page
├── contact.html               # Contact Page & Enquiry Form
├── 404.html                   # Custom 404 Error Page
├── api/
│   ├── config.php             # cPanel PHP Yo! Payments Credentials Config
│   └── yo-payment.php         # cPanel PHP Yo! Payments API Gateway
├── server.js                  # Local Node.js Server & Yo! Payments API Gateway
├── .env                       # Yo! Payments API Keys for Node.js
├── .env.example               # Template for Environment Variables
├── package.json               # Node.js project file
├── assets/
│   ├── css/
│   │   └── style.css          # Responsive CSS & Cleenhearts design tokens
│   ├── js/
│   │   └── main.js            # Interactive UI scripts & Yo! Payments client logic
│   └── images/                # Authentic team, hero, and program photographs
└── sitemap.xml & robots.txt   # Search engine optimization files
```