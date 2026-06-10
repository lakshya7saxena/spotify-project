# 🎵 Spotify Clone Project

A production-ready, full-stack music streaming platform featuring role-based access control (RBAC), secure token-based authentication, a decoupled architectural layout, and third-party media CDN integration. 

The application implements a strict separation of concerns between standard listeners (**Users**) and content creators (**Artists**), optimized for efficient file parsing and cloud storage synchronization.

---

## 🚀 Key Features

- **Role-Based Architecture (RBAC):**
  - **User:** Can access public streams, navigate personalized feeds, browse multi-tier albums, and trigger real-time audio playback. (Restricted from content management handles).
  - **Artist:** Specialized creator dashboard dedicated strictly to ingestion workflows (track creation, metadata provisioning, canvas/thumbnail uploads). Restricted from public stream interfaces to maintain portal segregation.
- **Robust Security & Session Management:** Stateless `JSON Web Tokens (JWT)` paired with automated cookie parsing (`cookie-parser`) for encrypted context handling and protected routing layers.
- **Enterprise Storage Pipeline:** Integrated with **ImageKit CDN** via custom asynchronous service abstractions to offload thick multi-part binary buffers (audios + high-resolution image thumbnails).
- **Relational Object Mapping:** Clean schemas using **Mongoose ODM** deployed on a distributed cloud topology leveraging **MongoDB Atlas** hosted on **AWS Infrastructure**.

---

## 📂 Project Architecture

The system is split into two cleanly decoupled components following modern micro-repository patterns:

### 1. Backend Service Layer (`/backend`)
Adheres strictly to the industry-standard **MVC (Model-View-Controller) / Service** architectural pattern to decouple data schemas, business orchestrations, and HTTP request lifecycles.


backend/
├── .vscode/
├── node_modules/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js      # Session handshakes (Registration, Login, Sign-out)
│   │   └── music.controller.js     # Payload distribution, processing & media ingestion
│   ├── db/
│   │   └── db.js                   # Asynchronous Mongoose/MongoDB connection pool
│   ├── middlewares/
│   │   └── auth.middleware.js      # Bearer extraction, token decoding & RBAC enforcement
│   ├── models/
│   │   ├── album.model.js          # Relational structure for multi-track compilation records
│   │   ├── music.model.js          # Track schema tracking CDN references and asset tokens
│   │   └── user.model.js           # Document structure for Identity credentials & authorization flags
│   ├── routes/
│   │   ├── auth.route.js           # Identity verification route mappings
│   │   └── music.route.js          # Media streaming and submission endpoints
│   ├── services/
│   │   └── storage.service.js      # Core ImageKit cloud connection wrapper
│   └── app.js                      # Express configuration pipeline (CORS, Express JSON, Cookie Parser)
├── .env                            # Decoupled deployment variables configuration
├── .gitignore
├── package-lock.json
├── package.json                    # Backend core Manifest file
└── server.js                       # Primary HTTP listener instantiation script


### 2. Frontend Interface Layer ('/frontend')
Engineered as a single-page application (SPA) with highly atomic, reusable functional components powered by React and styled via utility-first atomic design primitives with Tailwind CSS.



frontend/
└── src/
    ├── assets/                     # Vector icons (SVGs), splash canvases, and static graphics
    ├── components/
    │   ├── Buttons.jsx             # Highly abstract contextual input controls
    │   ├── DisplaySongs.jsx        # Data grid container rendering queryable tracks
    │   ├── Navbar.jsx              # Responsive header tracking account profiles
    │   └── UploadSongs.jsx         # Binary multi-part form wrapper dedicated to the Artist portal
    ├── pages/
    │   ├── Home.jsx                # Dynamic entry viewport reading RBAC criteria for conditional workflows
    │   ├── Login.jsx               # Access portal capturing identity context
    │   └── SignUp.jsx              # Registration engine provisioning new users/artists
    ├── App.css
    ├── App.jsx                     # Top-level client router and security context dispatcher
    ├── index.css                   # Global directives inject layer for Tailwind CSS configuration
    ├── main.jsx                    # Application bootstrapping target DOM anchor file
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json                # Frontend ecosystem dependency manifest
    └── vite.config.js              # Build parameters optimizing production asset delivery chunks