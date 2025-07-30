# bure-card

A digital health platform for Ethiopia: securely storing patient history, enabling cross-hospital authentication, and empowering patients with control over their medical data.

---

## 🚩 Overview

**bure-card** is a web and mobile application designed to provide seamless, secure access to patient records across participating Ethiopian hospitals. It leverages QR code-based identification, biometric authentication, and a robust consent flow to ensure privacy and interoperability for healthcare providers and patients.

---

## ✨ Features

- **QR Code-Based Patient Identification**: Patients use QR codes for fast, secure check-in and verification at clinics and hospitals.
- **Biometric Authentication**: Optional biometric verification for sensitive operations, supporting advanced privacy.
- **Consent Flow**: Patients review, approve, or deny requests to access their medical data, including SMS and biometric steps.
- **Centralized Data Management**: Securely stores medical records, prescriptions, lab results, and more.
- **Cross-Hospital Interoperability**: Facilities can access shared patient data (with consent), improving care continuity.
- **Privacy Controls**: Granular patient control over what data is shared and for what purpose.
- **Admin Dashboard**: System stats, pending reviews, and hospital registration insights.
- **Future-Ready**: Foundation for AI-based medical insights and recommendations.

---

## 🧰 Tech Stack

- **Frontend**: React (TypeScript, Vite)
- **Backend**: Node.js (Express.js)
- **Other Tools**:
  - Docker/Docker Compose for deployment
  - QR code libraries (generation and scanning)
  - Secure database systems
  - Figma for UI/UX design

---

## 💡 Planned Solution

We are building a **web and mobile application** enabling:

- QR code-based patient identification.
- Secure, centralized patient data management.
- A shared platform for hospital interoperability.
- A single, universal app for patients to manage all medical needs.

---

## 🎯 Expected Outcomes

- Seamless cross-hospital access to patient records.
- Improved insurance and patient verification processes.
- Reliable, centralized public health data for policy-making.
- Strong foundation for future AI models in healthcare.

---

## 🧩 Fayda’s Role

**Fayda** is critical to the project’s success:

- Provides a unique national identifier for each patient.
- Enables a consistent data hierarchy and schema.
- Feeds into Ethiopia’s national statistics systems (births, deaths, diseases).

---

## 🚀 Future Features

- Offline mode with data sync
- Enhanced biometric authentication
- AI-based medical insights and recommendations

---

## 🗂️ Project Structure

```
frontend/             # React frontend codebase
  src/components/     # UI and feature components (consent flow, dashboard, etc.)
  src/index.css       # Custom styles and variables
backend/              # Express.js backend (APIs, data management)
docker-compose.yml    # Multi-service orchestration
README.md             # Project documentation
```

---

## ⚡ Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Docker (optional, for containerized deployment)

### Local Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/fluffyWeird/bure-card.git
   cd bure-card
   ```
2. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
3. **Set environment variables:**  
   Copy `.env.example` to `.env` in frontend and backend, then fill in required values.

4. **Start development servers:**
   ```bash
   # In separate terminals
   cd frontend && npm run dev
   cd backend && npm run dev
   ```

### Docker Setup

1. **Build and run containers:**
   ```bash
   docker-compose up --build
   ```

---

## 🔑 Configuration

- **Environment variables** are required for API endpoints, authentication secrets, and database credentials.
- Do **not** commit sensitive information.  
- See `.env.example` for required keys.

---

## 🧪 Testing

- Unit and integration tests are located in the `tests/` directory within `frontend` and `backend`.
- Run tests with:
  ```bash
  npm test
  ```
  _(in respective directories)_

---

## 🖼️ Demo & Screenshots

> _Add images or GIFs here to showcase QR login, consent flow, dashboard, etc._
<img width="1864" height="893" alt="image" src="https://github.com/user-attachments/assets/eec12ea9-794e-4c99-98bb-cee92d6724a8" />
<img width="1674" height="978" alt="image" src="https://github.com/user-attachments/assets/16702926-c163-465e-9e06-3ee28f554d9f" />
<img width="1866" height="871" alt="image" src="https://github.com/user-attachments/assets/20fe0c85-857b-4869-8992-671adab64c6f" />
<img width="1819" height="860" alt="image" src="https://github.com/user-attachments/assets/e1cb4838-cc92-455c-af06-2559f3243515" />


---

## 🤝 Contributors

- Eyuel Kebede - Eyuduc@gmail.com
- Andualem Getachew
- Eureka T/Mariam 
- **Design & Research:** [Figma link](#) _(replace with actual link)_

## Note on Commit Authorship

Some commits are attributed to "gelila amsalu" due to a misconfigured git identity. Gelila amsalu did not contribute to this project. All work was done by the listed collaborators.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.

---

## 🛠️ Troubleshooting & FAQ

- **Why is gelila amsalu listed as a contributor?**  
  This was a git configuration mistake; see above note.
- **Problems with Docker networking?**  
  Ensure Docker is up-to-date and ports are not in use.
- **Authentication errors?**  
  Double-check `.env` credentials and make sure Fayda OIDC and SMS services are reachable.

---

## 📬 Contact

For questions or support, please open an issue or contact the project lead via GitHub.
