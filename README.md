# Certificate Generator & Verification System

An enterprise-grade, full-stack certificate generation and public verification system built with **Next.js 16 (App Router)**, **MongoDB**, and **Cloudinary**.

---

## 🌟 Key Features

- **🎓 Elegant, Dynamic Certificate Template:**
  - Classic A4 landscape aspect ratio (1.414:1) with royal navy and gold ornamentation.
  - Dynamically populated recipient name, course name, completion date, and certificate ID.
  - Optional Cloudinary asset overrides for academy logo, instructor signature, and official seal.

- **👁️ Dedicated Preview Page (`/admin/certificates/preview`):**
  - Instant redirect upon form submission.
  - Visually centered layout preserving exact aspect ratio across desktop, tablet, and mobile.
  - Interactive scale/zoom controls (60%, 80%, 100%).
  - One-click **Edit Details** workflow to return to the form with all fields prefilled.

- **📄 High-Resolution PDF & Print:**
  - Client-side 2x DPI PDF export via `html2canvas` and `jsPDF`.
  - Margin-free, clean printout optimized for physical A4 landscape printing via `@media print`.

- **🔍 Public Verification Registry (`/verify/[certificateId]`):**
  - Instant cryptographic authenticity verification.
  - Clear **✓ Certificate Verified** or **Certificate Not Found** status with direct links to the original document.

- **📊 Admin Dashboard (`/admin/certificates`):**
  - Manage, preview, edit, and verify all issued credentials.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Google Fonts (`Cinzel`, `Playfair Display`, `Great Vibes`, `Plus Jakarta Sans`) |
| **Database** | [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) |
| **Media Assets** | [Cloudinary](https://cloudinary.com/) |
| **PDF Generation** | `html2canvas` + `jsPDF` |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 📁 Project Structure

```text
certificate-generator/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── certificates/
│   │   │       ├── page.js              # Admin Dashboard: list all issued certificates
│   │   │       ├── create/
│   │   │       │   └── page.js          # Certificate creation form
│   │   │       ├── preview/
│   │   │       │   └── page.js          # Dedicated Certificate Preview stage
│   │   │       └── [id]/
│   │   │           └── page.js          # Redirects /admin/certificates/:id to preview
│   │   ├── api/
│   │   │   └── certificates/
│   │   │       ├── route.js             # POST (create) & GET (list)
│   │   │       └── [certificateId]/
│   │   │           └── route.js         # GET (lookup) & PUT (update)
│   │   ├── certificate/
│   │   │   └── [certificateId]/
│   │   │       └── page.js              # Public certificate view (Print, PDF, Share)
│   │   ├── verify/
│   │   │   ├── page.js                  # Search / lookup certificate by ID
│   │   │   └── [certificateId]/
│   │   │       └── page.js              # Public verification record
│   │   ├── globals.css                  # Global styles, fonts, and @media print rules
│   │   ├── layout.js                    # Root layout with navbar and footer
│   │   └── page.js                      # Homepage with interactive certificate showcase
│   ├── components/
│   │   ├── CertificateTemplate.jsx      # Reusable visual certificate component
│   │   ├── CertificateActions.jsx       # Print, PDF export, and share button bar
│   │   ├── CertificateForm.jsx          # Admin form with validation & prefill support
│   │   └── CertificatePreview.jsx       # Scaled preview wrapper
│   ├── constants/
│   │   ├── api-constant.js              # Centralized API endpoint paths
│   │   ├── routes-constant.js           # Centralized application page routes
│   │   └── certificate-constant.js      # Academy, signatory, and template copy
│   ├── lib/
│   │   ├── mongodb.js                   # Mongoose connection pooling singleton
│   │   └── cloudinary.js                # Cloudinary SDK client
│   └── models/
│       └── Certificate.js               # Mongoose schema
├── .env.local.example                   # Environment variables template
├── next.config.mjs                      # Next.js config with Cloudinary remotePatterns
└── package.json
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory (see [.env.local.example](file:///.env.local.example)):

```env
# MongoDB Connection String (Local instance or MongoDB Atlas)
MONGODB_URI=mongodb://localhost:27017/certificate-generator

# Cloudinary Credentials (Optional: used for custom logos, signatures, and seals)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Application Base URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Application Routes

| Route | Description |
|---|---|
| `/` | Landing page with live demo certificate and feature highlights |
| `/admin/certificates` | Admin dashboard listing all issued certificates |
| `/admin/certificates/create` | Certificate creation form (supports `?id=...` for editing) |
| `/admin/certificates/preview` | Dedicated preview page with Download PDF, Print, and Edit Details |
| `/certificate/[certificateId]` | Public shareable certificate page |
| `/verify` | Credential authenticator search page |
| `/verify/[certificateId]` | Public verification status page (✓ Verified or Not Found) |

---

## 📡 API Endpoints

All API paths are centralized in `src/constants/api-constant.js`:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/certificates` | Creates a new certificate, generates `UC-<uuid>`, and saves to MongoDB |
| `GET` | `/api/certificates` | Lists issued certificates (supports `?search=` and `?limit=`) |
| `GET` | `/api/certificates/[certificateId]` | Retrieves certificate by unique ID |
| `PUT` | `/api/certificates/[certificateId]` | Updates an existing certificate's details |

---

## 📄 License

MIT
