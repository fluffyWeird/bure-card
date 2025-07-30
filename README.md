# 🏥 Bure-Card [Initial Statement]

## 👥 Contributors

- **Eyuel Zegeye**
- **Andualem Getachew**
- **Eureka T/Mariam**

#### NB- GELILA AMSALU ISN'T A COLLABORATOR ALTHOUGH SHE IS PRESENT ON THE COLABORATOR SECTION. [didn't signout of vscode that's how it happend]

---

## 📘 Project Synopsis

**Bure-Card** is a health-tech solution focused on **secure patient history storage**, **cross-hospital authentication**, and **data unification** across Ethiopia's healthcare system.

## Learn More

It enables patients to use a **QR code-based ID system** for fast and secure identity verification at any participating hospital, ensuring **medical continuity**, **data privacy**, and **national interoperability**. Building the app we assume MOH is FAYDA's crendential partner where it gets the starting data so our system doesn't register new patients but rather focuses on giving them access to their own data.

Bure-Card Uses VeryFayda Auth system for patients to get their medical data including, previous hospital visits, lab reports, medcine prescription and so much more.

---

## Setup

Follow these steps to get Bure‑Card up and running on your local machine:

### 1. Clone the repository:

```bash
git clone https://github.com/fluffyWeird/bure-card.git
cd bure-card
```

### 2. Install dependencies (frontend & backend):

```bash
npm install
```

### 3. Set up environment variables:

Create a `.env` file in the root directory with the following variables (adjust as needed):

```
to make things easier for you the tester we have pushed the .env file along
```

### 4. Start frontend:

```bash
npm run dev
```

### 5. Open your browser and navigate to:

```
http://localhost:3000
```

---

# 🏥 Bure-Card Docker Setup

This project uses Docker and Docker Compose to run both the frontend (Vite + React) and backend (Node.js + Express) services.

---

## 📁 Project Structure

```
/
├── backend/
│   ├── Dockerfile
│   └── (Node.js Express app)
├── frontend/
│   ├── Dockerfile
│   └── (Vite React app)
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Install Docker & Docker Compose

- [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose comes with Docker Desktop

---

## 📦 Build & Run

### Run both services:

```bash
docker-compose up --build
```

### Run in background (detached mode):

```bash
docker-compose up --build -d
```

---

## 🌐 Access the App

- Frontend: [http://localhost](http://localhost)
- Backend API: [http://localhost:8000](http://localhost:8000)

---

## 📄 docker-compose.yml

```yaml
version: "3.8"

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    restart: unless-stopped
    depends_on:
      - backend
```

---

---

## ❗ Problem Statement

We are addressing two critical issues in the Ethiopian healthcare system:

1. 🔒 **Patient Data Privacy & Distribution**

   - Patient histories are not securely or consistently stored.
   - There's no standardized way for hospitals to access shared data.

2. 📊 **Lack of Centralized Health Data for Epidemiology**
   - Health data is fragmented across institutions.
   - National-level analysis and forecasting are difficult.

---

## 💡 Planned Solution

We are building a **web and mobile application** that allows:

- QR code-based **patient identification**.
- Secure, centralized **patient data management**.
- A shared platform for **hospital interoperability**.
- A **single, universal app** for patients to manage all their medical needs.

---

## 🎯 Expected Outcome

- 🏥 Seamless **cross-hospital access** to patient records.
- 📁 Improved **insurance and patient verification** processes.
- 📈 Reliable, centralized **public health data** for policy-making.
- 🤖 Strong data foundation for **future AI models** in healthcare.

---

## 🧩 Fayda’s Role (Recommended)

**Fayda** is critical to the project’s long-term success. It helps by:

- 📇 Providing a **unique, national identifier** for each patient.
- 🧱 Enabling a **consistent data hierarchy and schema**.
- 📊 Feeding into Ethiopia’s **national statistical system** (births, deaths, diseases, etc.).

Fayda ensures data accuracy and supports future health-tech infrastructure.

---

## 🧰 Tech Stack

- **Frontend**: React
- **Backend**: Express.js
- **Languages**: JavaScript
- **Other Tools**:
  - Node.js packages (as needed)
  - QR code libraries (generation + scanning)
  - Secure database systems

---

## 🚀 Future Features (Planned)

- 🌐 Offline mode with data sync
- 🔐 Biometric authentication
- 🧠 AI-based medical insight and recommendations

---
