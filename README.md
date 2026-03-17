# Setup both at once

mkdir blog-cms && cd blog-cms

# Backend

mkdir server && cd server
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken
npm install cors helmet morgan multer cloudinary
npm install --save-dev nodemon

# Frontend

cd ..
npm create vite@latest client -- --template react
cd client
npm install axios react-router-dom zustand
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit

```

---

### 🔵 Phase 2 — Database & Models First

Before any routes or UI, define your **MongoDB schemas**:
```

✅ User Model
✅ Post Model
✅ Category Model
✅ Comment Model

```

This forces you to **think about your data structure** before writing any logic — like an architect drawing blueprints before building.

---

### 🔵 Phase 3 — Backend API (Week 1–2)

Build all your API endpoints first:
```

Auth Routes
├── POST /api/auth/register
├── POST /api/auth/login
└── GET /api/auth/me

Post Routes
├── GET /api/posts ← all posts
├── GET /api/posts/:slug ← single post
├── POST /api/posts ← create post
├── PUT /api/posts/:id ← update post
└── DELETE /api/posts/:id ← delete post

Category Routes
├── GET /api/categories
├── POST /api/categories
└── DELETE /api/categories/:id

Comment Routes
├── GET /api/comments/:postId
├── POST /api/comments
└── DELETE /api/comments/:id

Upload Routes
└── POST /api/upload ← image to Cloudinary

```

---

### 🔵 Phase 4 — Test API with Postman / Thunder Client

**Before touching frontend**, test every single endpoint:
```

✅ Register user → get token
✅ Login → get token
✅ Create post with token
✅ Get all posts
✅ Get post by slug
✅ Update post
✅ Delete post
✅ Upload image
✅ Add comment

```

> 💡 This is what professional developers do — **never assume the API works**, always verify first.

---

### 🔵 Phase 5 — Frontend (Week 2–3)

Now build UI with **real API data** from day one:
```

Pages to build in order:

1. Auth Pages
   ├── /register
   └── /login

2. Public Pages
   ├── / ← Home (post feed)
   ├── /blog/:slug ← Single post page
   └── /category/:name ← Category filter

3. Protected Pages
   ├── /dashboard ← Author dashboard
   ├── /posts/create ← Create post (TipTap)
   └── /posts/edit/:id ← Edit post

4. Admin Pages
   ├── /admin ← Admin overview
   ├── /admin/posts ← Manage all posts
   ├── /admin/users ← Manage users
   └── /admin/comments ← Moderate comments

```

---

### 🔵 Phase 6 — Connect & Polish (Week 3–4)
```

✅ Connect all API calls with Axios
✅ Add loading states & error handling
✅ Add protected routes (JWT check)
✅ Add toast notifications
✅ Make it fully responsive
✅ Add SEO meta tags

```

---

## 📊 Full Timeline
```

Week 1
├── Day 1 → Project setup + folder structure
├── Day 2 → MongoDB models (User, Post, Category, Comment)
├── Day 3 → Auth API (register, login, JWT)
├── Day 4 → Post API (CRUD)
└── Day 5 → Upload + Category + Comment API

Week 2
├── Day 1 → Test all APIs with Postman
├── Day 2 → React setup + routing + Axios config
├── Day 3 → Auth pages (login, register)
├── Day 4 → Home page + Post feed
└── Day 5 → Single post page + TipTap renderer

Week 3
├── Day 1 → Create/Edit post page + TipTap editor
├── Day 2 → Dashboard page
├── Day 3 → Admin panel
├── Day 4 → Comments section
└── Day 5 → Responsive design + Polish

Week 4
├── Day 1-2 → Bug fixes + error handling
├── Day 3 → Environment variables + security
└── Day 4-5 → Deploy (Vercel + Render + MongoDB Atlas)

```

---

## 🧰 Tools to Use Per Phase

| Phase | Tool |
|---|---|
| API Testing | **Postman** or **Thunder Client** (VS Code) |
| DB Management | **MongoDB Compass** |
| Version Control | **Git + GitHub** (commit after each feature) |
| Environment Vars | **.env files** (never push to GitHub) |
| API Docs | **Swagger** or simple **README** |

---

## 💡 Golden Rules

> **1.** Always build **Models → Routes → Controllers → Frontend** in that order

> **2.** Never hardcode data — if the API isn't ready, build the API first

> **3.** Commit to GitHub **after every completed feature** — not at the end

> **4.** Test every API endpoint in **Postman before** writing frontend code

> **5.** Use **.env** from day one — never hardcode secrets or URLs

---

## 🎯 Summary
```

❌ Don't do this:
Frontend → stuck with fake data → rewrite later

✅ Do this:
Setup → Models → Backend API → Test → Frontend → Deploy
# Inkwell-By-Shohag-Miah
