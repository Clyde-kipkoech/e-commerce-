# 🛒 Full-Stack E-Commerce Platform

This project is a **full-stack e-commerce application** built with:

- **Backend**: Django Rest Framework (DRF) for API
- **Frontend**: React.js for user interface

It allows users to register/login, browse products, and admins to manage products and users.

---

## 🚀 Features
- 🔑 User authentication & token-based login
- 👤 Role-based access (Admin vs. User)
- 🛍️ Product management (CRUD)
- 🔎 Search, filter & paginate products
- 👨‍💻 Admin-only user management
- ⚡ Error handling & validation
- ☁️ Deployment-ready (Heroku, Netlify, Vercel)

---

## 📂 Project Structure

ecommerce-project/
│
├── ecommerce_api/ # Django backend
│ ├── ecommerce_api/ # Project settings & config
│ ├── products/ # Product app (CRUD, search)
│ ├── users/ # (Recommended) Users app for auth
│ ├── manage.py
│ └── db.sqlite3
│
├── ecommerce_frontend/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── Components/
│ │ ├── Pages/
│ │ │ ├── AddProduct.js
│ │ │ ├── Home.js
│ │ │ ├── Login.js
│ │ │ ├── Product.js
│ │ │ └── Signup.js
│ │ ├── routes/
│ │ │ └── api.js
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
├── docs/ # Documentation
│ ├── api_endpoints.md
│ ├── setup_backend.md
│ ├── setup_frontend.md
│ └── architecture.md
│
├── requirements.txt # Backend dependencies
├── package.json # Frontend dependencies
├── .gitignore
└── README.md

yaml
Copy code

---

## ⚙️ Backend Setup (Django + DRF)

1. Navigate to backend:
```bash
cd ecommerce_api
Create virtual environment & install dependencies:

  ## bash
Copy code
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
Run migrations:

bash
Copy code
python manage.py makemigrations
python manage.py migrate
Create superuser:

bash
Copy code
python manage.py createsuperuser
Start backend server:

bash
Copy code
python manage.py runserver
Backend will run at: http://127.0.0.1:8000/

### Frontend Setup (React)
Navigate to frontend:

bash
Copy code
cd ecommerce_frontend
Install dependencies:

bash
Copy code
npm install
Start development server:

bash
Copy code
npm start
Frontend will run at: http://localhost:3000/

  ##API Endpoints
Auth
POST /api/auth/register/ → Register user

POST /api/auth/login/ → Login & get token

Users
GET /api/users/ → List all users (admin only)

PUT /api/users/{id}/ → Update user (self/admin)

DELETE /api/users/{id}/ → Delete user (admin)

Products
GET /api/products/ → List all products

GET /api/products/{id}/ → Get product details

POST /api/products/ → Create product (admin)

PUT /api/products/{id}/ → Update product (admin)

DELETE /api/products/{id}/ → Delete product (admin)

GET /api/products/search/?name=...&category=... → Search products

# Running Tests
Backend:

bash
Copy code
python manage.py test
Frontend:

bash
Copy code
npm test
📦 Deployment
Backend → Heroku / PythonAnywhere

Frontend → Netlify / Vercel
