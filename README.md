# STYLEVERSE - E-Commerce Web Application

**STYLEVERSE** is a feature-rich, full-stack e-commerce web application for a clothing shop. It provides a seamless shopping experience for users and powerful business insights for admins. The platform integrates data analytics features to help the admin make informed decisions.

---

## 🛍️ Features at a Glance

### 👤 **User Roles**
- **Admin**
  - Manage products (add/update/delete)
  - Manage orders (view/update status)
  - View powerful **data-driven analytics** on sales, products, and customers
- **User**
  - Sign up, log in, and log out
  - Browse and purchase products
  - Add products to cart
  - Track their orders

---

## 🌐 Tech Stack

| Layer        | Technology Used                            |
| ------------ | ----------------------------------------- |
| **Frontend** | React.js, CSS3, Figma (for UI/UX design)  |
| **Backend**  | Node.js, Express.js                       |
| **Analytics**| FastAPI (Python), Pandas, Matplotlib      |
| **Database** | MongoDB (NoSQL)                           |
| **DevOps**   | Docker, Docker Compose                    |

---

## 🎨 UI/UX Design
- Designed with **Figma** ensuring vibrant colors and modern layouts
- Best practices followed for accessibility and responsiveness

---

## 📊 Data Analytics
- Built using **FastAPI** with:
  - **Pandas** for data manipulation
  - **MongoDB Aggregation Queries** for data insights
  - **Matplotlib** for generating **visual analytics** like sales charts, top products, order trends, etc.
- Data-driven APIs provide visualizations and insights for admins in real time

---

## ⚙️ Project Setup Instructions

### 🖥️ Requirements
- Node.js (>= 16.x recommended)
- Python (>= 3.9)
- MongoDB
- Docker (recommended)

---

### 📁 Local Development Setup

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ShubhamSinghRawat007/E-Commerce.git
cd E-Commerce
```

#### 2️⃣ Environment Variables
- Create a `.env` file in the backend directory with:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_SECRET = your secret here
JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = "admin@gmail.com"
ADMIN_PASS = admin password
CLOUDINARY_API_KEY= your key
CLOUDINARY_SECRET_KEY = your key
CLOUDINARY_NAME=your name
```

- Create a `.env` file for FastAPI with MongoDB connection details as needed.

#### 3️⃣ Install Dependencies
- Backend:
```bash
cd backend
npm install
```

- Frontend:
```bash
cd frontend
npm install
```

- FastAPI (Analytics API):
```bash
cd visualization
pip install -r requirements.txt
```

---

### ▶️ Run Locally Without Docker

- Start MongoDB (if not using Docker)
- Start Backend:
```bash
cd backend
npm run dev
```
- Start Frontend:
```bash
cd frontend
npm start
```
- Start Analytics Server:
```bash
cd visualization
uvicorn main:app --reload --port 8000
```

---

## 📦 Docker Setup (Recommended)

### 🐳 Using Docker Compose (Recommended)
```bash
docker-compose up --build
```
### 🚀 Docker Commands

- **Build containers:**
```bash
docker-compose build
```
- **Start containers:**
```bash
docker-compose up
```
- **Stop containers:**
```bash
docker-compose down
```

---

## 🚀 Docker Helper Scripts (Requires Docker Installed)

For convenience, you can use the provided shell scripts (for Linux/macOS) and PowerShell scripts (for Windows) to manage your Docker containers. Ensure you are in the root directory of the project (E-Commerce) when running these scripts.

| Script Name     |	Operating System |	Description                                 |
|-----------------|------------------|----------------------------------------------|
| build_start.sh  |	Linux/macOS      |	Builds Docker images and starts containers. |
| build_start.ps1 |	Windows          |	Builds Docker images and starts containers. |
| start.sh        |	Linux/macOS      |	Starts pre-built Docker containers.         |
| start.ps1       |	Windows          |	Starts pre-built Docker containers.         |
| stop.sh         |	Linux/macOS      |	Stops and removes Docker containers.        |
| stop.ps1        |	Windows          |	Stops and removes Docker containers.        |

### Usage Examples:
```bash
# On Linux/macOS
./build_start.sh

# On Windows (in PowerShell)
.\build_start.ps1
```

## 🗂️ Directory Structure Overview
```
/styleverse
├── backend           # Node.js Express backend
├── frontend          # React frontend
├── visualization     # FastAPI data analytics API
├── docker-compose.yml
├── build_start.sh    # Docker helper script for Linux/macOS
├── build_start.ps1   # Docker helper script for Windows
├── start.sh          # Docker helper script for Linux/macOS
├── start.ps1         # Docker helper script for Windows
├── stop.sh           # Docker helper script for Linux/macOS
├── stop.ps1          # Docker helper script for Windows
|── README.md
|__ LICENSE.md
```

---

## 🔑 Major Functionalities

| Feature              | Admin  | User  |
| -------------------- | ------ | ----- |
| Add/Manage Products  | ✅     | ❌    |
| View Analytics       | ✅     | ❌    |
| Manage Orders        | ✅     | ❌    |
| Create Account       | ❌     | ✅    |
| Place Orders         | ❌     | ✅    |
| Track Orders         | ❌     | ✅    |

---

## 🚀 Future Enhancements
- Integration with payment gateways like **Razorpay/Stripe**
- Real-time analytics dashboard using WebSockets
- Recommendation engine for personalized shopping

---

## 🤝 Contribution
Want to contribute? Feel free to open **Issues** or **Pull Requests**!

---

## 📜 License
[MIT License](LICENSE)

---
