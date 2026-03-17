# ✍️ Inkwell — Full Stack Blog & Content Management System

> A modern, feature-rich Blog CMS built with the MERN Stack (MongoDB, Express.js, React, Node.js). Supports rich text editing with TipTap, role-based access control, real-time comments, image uploads via Cloudinary, dark/light mode, and a full admin dashboard.

[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧭 Overview

**BlogCMS** is a production-ready, full-stack content management system designed for writers, developers, and teams who need a powerful yet elegant blogging platform. Built entirely with JavaScript — from the database to the UI — it provides a seamless authoring experience with a Notion-like rich text editor, SEO metadata management, category and tag organization, nested comments, and a dedicated admin panel.

Whether you are building a personal blog, a developer community platform, or a multi-author publication — BlogCMS gives you full control over your content and readers.

---

## 🌐 Live Demo

| Interface | URL |
|---|---|
| **Client (Blog)** | [https://blogcms.vercel.app](https://blogcms.vercel.app) |
| **Admin Dashboard** | [https://blogcms.vercel.app/admin](https://blogcms.vercel.app/admin) |
| **API Health** | [https://blogcms-api.onrender.com/api/health](https://blogcms-api.onrender.com/api/health) |

> **Demo Credentials**
>
> Author — `author@demo.com` / `Demo@1234`
>
> Admin — `admin@demo.com` / `Admin@1234`

---

## ✨ Features

### 👤 Authentication & Authorization
- JWT-based authentication with secure `httpOnly` cookies
- Role-based access control — `reader`, `author`, `admin`
- Password hashing with bcrypt (salt rounds: 12)
- Protected routes on both frontend and backend
- Auto-generated username from display name

### 📝 Rich Text Editor
- **TipTap** editor with a floating bubble menu and slash commands
- Support for Headings (H1–H3), Bold, Italic, Underline, Strikethrough
- Ordered & unordered lists, Task lists with checkboxes
- Blockquotes, Code blocks with syntax highlighting (Lowlight)
- Image upload with Cloudinary integration
- YouTube video embeds
- Table support
- Character & word count
- Content saved as both HTML and JSON in MongoDB

### 📰 Blog Public Interface
- Responsive post feed with pagination
- Post filtering by category, tag, and author
- Full-text search across titles, content, and tags
- Single post page with Table of Contents (TOC), reading progress bar
- Estimated read time per post
- Like and bookmark posts
- Nested comments (2 levels deep) with like support
- Related posts section
- Author profile pages

### 🖥 Admin Dashboard
- Overview with key stats — total posts, users, comments, views
- Manage all posts — publish, archive, feature, delete
- Manage all users — assign roles, activate/deactivate
- Moderate comments — approve, reject, mark as spam
- Category management with color and icon support
- Analytics charts — views over time, top posts, traffic sources
- Dark and light mode toggle

### 🗂 Content Management
- Draft, Published, Archived, and Scheduled post statuses
- SEO fields — meta title, meta description, meta keywords
- Cover image upload with Cloudinary
- Auto-generated SEO-friendly slugs
- Tag and category assignment per post
- Featured posts and Editor's Picks
- Post scheduling with a scheduled publish date

### 🎨 UI / UX
- Fully responsive — mobile, tablet, desktop
- Dark mode and light mode with persistent preference (Zustand + localStorage)
- Custom design system with CSS variables
- Reusable UI components — Button, Input, Textarea, Badge, Modal, Spinner
- Toast notifications (react-hot-toast)
- Skeleton loading states
- Smooth page transitions

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JSON Web Token (JWT)** | Authentication |
| **bcryptjs** | Password hashing |
| **Cloudinary** | Image storage & CDN |
| **Multer** | File upload handling |
| **Slugify** | Auto slug generation |
| **Morgan** | HTTP request logger |
| **Helmet** | HTTP security headers |
| **CORS** | Cross-Origin Resource Sharing |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **React Router DOM v7** | Client-side routing |
| **Zustand** | Lightweight state management |
| **Axios** | HTTP client with interceptors |
| **TipTap** | Rich text editor |
| **React Hot Toast** | Toast notifications |
| **React Icons** | Icon library |
| **Recharts** | Analytics charts |

### DevOps & Deployment
| Service | Purpose |
|---|---|
| **MongoDB Atlas** | Cloud database |
| **Cloudinary** | Media storage |
| **Render** | Backend hosting |
| **Vercel** | Frontend hosting |
| **GitHub Actions** | CI/CD pipeline |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

## ⭐ Show Your Support

If you found this project helpful, please give it a **star** ⭐ on GitHub — it means a lot and helps others discover this project!

---

## 🔍 Keywords

`mern-stack` `blog-cms` `content-management-system` `react` `nodejs` `express` `mongodb` `tiptap-editor` `tailwindcss` `jwt-authentication` `role-based-access-control` `cloudinary` `admin-dashboard` `dark-mode` `full-stack-javascript` `rest-api` `zustand` `vite` `mongoose` `blog-platform`
