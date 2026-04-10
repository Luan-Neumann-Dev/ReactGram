Readme reactgram · MD
Copiar

# ReactGram
 
> A full-stack Instagram-inspired social platform — built with React, Node.js, Express, and MongoDB — featuring JWT authentication, image uploads, likes, comments, and real-time profile management.
 
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)

![Project View](https://github.com/user-attachments/assets/6cb97b3a-e3f4-4186-a10f-c536dbde69e2)
![Project View](https://github.com/user-attachments/assets/2a5bb3b9-fd60-4974-84b5-79071bef87d4)
![Project View](https://github.com/user-attachments/assets/ef4be3b3-acdf-43ed-bc6c-c0c6f044d375)

**[🐛 Report Bug](https://github.com/Luan-Neumann-Dev/reactgram/issues)**

---
## 📋 Table of Contents
 
- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [API Documentation](#-api-documentation)
- [Challenges & Solutions](#-challenges--solutions)
- [What I Learned](#-what-i-learned)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Contact](#-contact)
 
## 🎯 About The Project

ReactGram is a full-stack social photo-sharing platform inspired by Instagram. Users can register, log in, upload photos with titles, like and comment on posts from other users, edit their profile — and do all of this through a secure, token-based authentication system backed by a real REST API.
 
The project was built to practice building a complete full-stack application from scratch: designing a REST API with Node and Express, persisting data in MongoDB with Mongoose, handling file uploads on the server, and managing complex async state on the frontend with Redux Toolkit.

### Why I Built This
 
The goal was to go beyond frontend-only projects and understand how authentication, file handling, and data flow work across an actual client-server architecture — from the JWT in the request header to the protected Redux state on the browser.

## ✨ Features
 
### Core Functionality
- 🔐 **JWT Authentication** — Register and login with password hashing (bcrypt) and token-based sessions persisted in localStorage
- 📸 **Photo Upload** — Upload images with title; files stored server-side via Multer with type and format validation (PNG/JPG only)
- ❤️ **Like System** — Like photos with duplicate-prevention logic enforced on the backend
- 💬 **Comments** — Add comments to any photo; each comment stores the author name, avatar and user ID
- 👤 **Profile Management** — Edit name, bio, password, and profile photo
- 🔍 **Search** — Search photos by title using a case-insensitive regex query on the API
- 🛡️ **Protected Routes** — All authenticated pages redirect unauthenticated users to login via a custom `useAuth` hook
 
### Technical Features
- Ownership validation on delete/edit — only the photo author can modify their own posts
- Token verification middleware (`authGuard`) applied to all protected API routes
- Dynamic image serving from `/uploads` as a static Express directory
- Global async state handled with `createAsyncThunk` and `extraReducers` per slice
 
## 🛠️ Tech Stack
 
**Frontend:**
- React 18 — Component architecture with hooks
- Redux Toolkit — Global state management with `createSlice` and `createAsyncThunk`
- React Router DOM v6 — Client-side routing with protected route logic
- React Icons — UI icon library
- Vite — Build tool and dev server
 
**Backend:**
- Node.js + Express — REST API with modular routes and controllers
- MongoDB + Mongoose — NoSQL database with schema models for User and Photo
- JWT (jsonwebtoken) — Stateless authentication via Bearer token
- bcryptjs — Password hashing with salt generation
- Multer — Multipart file upload handling with dynamic folder routing
- express-validator — Server-side input validation middleware
- dotenv — Environment variable management
 
## 🚀 Getting Started

### Prerequisites
 
- Node.js >= 18
- MongoDB instance (local or Atlas)
- npm
 
### Installation
 
1. **Clone the repository**
```bash
git clone https://github.com/Luan-Neumann-Dev/reactgram.git
cd reactgram
```
 
2. **Set up the backend**
```bash
cd backend
npm install
```
 
3. **Configure environment variables in `backend/.env`**
```env
PORT=5000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
JWT_SECRET=your_jwt_secret
```
 
4. **Start the backend server**
```bash
npm run server
```
 
5. **Set up the frontend** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```
 
6. **Access the application**
```
http://localhost:5173
```
 
## 📁 Project Structure
 
```
ReactGram/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── UserController.js      # register, login, update, getById
│   │   └── PhotoController.js     # insert, delete, like, comment, search
│   ├── middlewares/
│   │   ├── authGuard.js           # JWT verification middleware
│   │   ├── imageUpload.js         # Multer config with folder routing
│   │   ├── handleValidation.js    # express-validator error handler
│   │   ├── userValidations.js
│   │   └── photoValidation.js
│   ├── models/
│   │   ├── User.js                # name, email, password, profileImage, bio
│   │   └── Photo.js               # image, title, likes[], comments[], userId
│   ├── routes/
│   │   ├── UserRoutes.js
│   │   ├── PhotoRoutes.js
│   │   └── Router.js
│   └── App.js
│
└── frontend/
    └── src/
        ├── components/            # Navbar, Footer, PhotoItem, LikeContainer, Message
        ├── hooks/
        │   ├── useAuth.jsx        # Reads Redux auth state → returns {auth, loading}
        │   └── useResetComponentMessage.jsx
        ├── pages/
        │   ├── Auth/              # Login, Register
        │   ├── Home/              # Global photo feed
        │   ├── Profile/           # User profile with their photos
        │   ├── EditProfile/       # Update user data
        │   ├── Photo/             # Single photo with likes and comments
        │   └── Search/            # Search results
        ├── services/              # API call functions (authService, photoService, userService)
        ├── slices/                # Redux slices: auth, user, photo
        └── store.jsx
```
 
## 🏗️ Architecture
 
### Data Flow
 
```
User Action → React Component → Redux Thunk (createAsyncThunk)
    → Service Layer (fetch) → Express Route → Middleware (authGuard + validation)
    → Controller → Mongoose Model → MongoDB
    → Response → Redux slice (extraReducers) → Component re-render
```
 
### Authentication Flow
 
```
Register/Login → bcrypt hash → JWT generated → stored in localStorage
→ Redux auth state hydrated on app load → useAuth hook → protected route access
```
 
## 📚 API Documentation
 
### Authentication
 
```http
POST /api/users/register   — Register new user
POST /api/users/login      — Login and receive JWT
```
 
### Users
 
```http
GET    /api/users/profile        — Get current authenticated user
PATCH  /api/users/               — Update profile (name, bio, image, password)
GET    /api/users/:id            — Get user by ID
```
 
### Photos
 
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/photos` | Upload new photo | ✅ |
| GET | `/api/photos` | Get all photos (feed) | ✅ |
| GET | `/api/photos/user/:id` | Get photos by user | ✅ |
| GET | `/api/photos/:id` | Get photo by ID | ✅ |
| PATCH | `/api/photos/:id` | Update photo title | ✅ |
| DELETE | `/api/photos/:id` | Delete photo | ✅ |
| PUT | `/api/photos/like/:id` | Toggle like | ✅ |
| PUT | `/api/photos/comment/:id` | Add comment | ✅ |
| GET | `/api/photos/search?q=` | Search by title | ✅ |
 
## 💡 Challenges & Solutions
 
### Challenge 1: Protecting Routes on the Frontend
**Problem:** Needed to redirect unauthenticated users from any protected page without repeating auth-check logic in every component.
 
**Solution:** Created a custom `useAuth` hook that reads from the Redux auth state and returns a simple `{auth, loading}` tuple — used in `App.jsx` to wrap every protected `<Route>` with a `<Navigate>` redirect.
 
```jsx
export const useAuth = () => {
    const { user } = useSelector((state) => state.auth);
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        setAuth(!!user);
        setLoading(false);
    }, [user]);
 
    return { auth, loading };
}
```
 
### Challenge 2: Dynamic Upload Folder Routing with Multer
**Problem:** User profile images and post photos needed to go to separate folders (`uploads/users/` and `uploads/photos/`), but Multer runs before the controller knows which type of upload is happening.
 
**Solution:** Inspected `req.baseUrl` inside the Multer `diskStorage` destination callback to route each upload to the correct folder dynamically — no additional middleware needed.
 
```javascript
destination: (req, file, cb) => {
    const folder = req.baseUrl.includes("users") ? "users" : "photos";
    cb(null, `uploads/${folder}/`);
}
```
 
### Challenge 3: Preventing Duplicate Likes
**Problem:** Users should only be able to like a photo once, with the constraint enforced on the server — not just the UI.
 
**Solution:** The `likePhoto` controller checks `photo.likes.includes(reqUser._id)` before pushing the new like, returning a 422 if the user has already liked the post.
 
**Result:** Like integrity is guaranteed at the data layer regardless of client behavior.
 
## 📚 What I Learned
 
**Technical Skills:**
- Designing and implementing a REST API with Express — routing, controller separation, middleware chaining
- JWT authentication end-to-end: generating tokens, protecting routes via middleware, persisting sessions in localStorage
- Handling file uploads with Multer including MIME type validation and organized folder structure
- Managing complex async UI states (loading, error, success) with Redux Toolkit's `createAsyncThunk` and `extraReducers`
 
**Best Practices:**
- Separating API call logic into a service layer keeps Redux slices clean and testable
- Server-side validation with `express-validator` as a middleware before the controller runs
- Storing only the token and user ID in localStorage — never passwords or sensitive data
 
## 🗺️ Roadmap
 
- [ ] Follow / unfollow system between users
- [ ] Notification feed for likes and comments
- [ ] Paginated photo feed
- [ ] Deploy backend to Railway and frontend to Vercel
- [ ] Input debounce on the search feature
 
## 📝 Notes
 
- Requires a running MongoDB instance (local or Atlas) configured in `.env`
- Not affiliated with Instagram or Meta
 
## 📄 License
 
MIT License - see [LICENSE](LICENSE) for details.
 
## 👤 Author
 
**Luan Neumann**
 
- 💼 LinkedIn: [luan-neumann-dev](https://www.linkedin.com/in/luan-neumann-dev/)
- 🐱 GitHub: [@Luan-Neumann-Dev](https://github.com/Luan-Neumann-Dev)
 
---
 
<div align="center">
 
**⭐ Star this repository if you found it helpful!**
 
Made with ❤️ by [Luan Neumann](https://github.com/Luan-Neumann-Dev)
 
</div>
 
