import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Standard Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import PrivateRoute from "./components/PrivateRoute";

// PageLoader: Minimalist Typography Alignment
const PageLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-main gap-4 transition-colors duration-500">
    <div className="w-12 h-[1px] bg-border-soft overflow-hidden relative">
      <div className="absolute inset-0 bg-brand-primary animate-loader-slide" />
    </div>
    <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-txt-muted animate-pulse">
      Synchronizing Node
    </span>
  </div>
);

// --- LAZY LOAD REGISTRY ---
// Public Nodes
const Home = lazy(() => import("./pages/Home"));
const Blogs = lazy(() => import("./pages/Blogs"));
const PostDetails = lazy(() => import("./pages/PostDetails"));
const About = lazy(() => import("./pages/About"));
const AuthorProfile = lazy(() => import("./pages/AuthorProfile"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// Admin Nodes
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const PostsList = lazy(() => import("./pages/admin/PostsList"));
const AddPost = lazy(() => import("./pages/admin/AddPost"));
const Categories = lazy(() => import("./pages/admin/Categories"));
const AddCategory = lazy(() => import("./pages/admin/AddCategory"));

// System Nodes
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* --- PUBLIC INTERFACE --- */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="author/me" element={<AuthorProfile />} />
            <Route path="posts/:id" element={<PostDetails />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="search" element={<SearchPage />} />
          </Route>

          {/* --- ADMINISTRATIVE PROTOCOL --- */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            {/* Default Admin Redirect */}
            <Route index element={<Navigate to="/admin/dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />

            {/* Content Management Nodes */}
            <Route path="posts">
              <Route index element={<PostsList />} />
              <Route path="add" element={<AddPost />} />
              {/* <Route path="edit/:id" element={<EditPost />} /> */}
            </Route>

            {/* Taxonomy Management Nodes */}
            <Route path="categories">
              <Route index element={<Categories />} />
              <Route path="add" element={<AddCategory />} />
            </Route>
          </Route>

          {/* --- EXCEPTION HANDLING --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
