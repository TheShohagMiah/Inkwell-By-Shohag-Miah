import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Blogs from "./pages/Blogs";
import SearchPage from "./pages/SearchPage";
import PrivateRoute from "./components/PrivateRoute";
import AddPost from "./pages/admin/AddPost";

// Loading Component
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-main">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent"></div>
  </div>
);

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home"));
const PostDetails = lazy(() => import("./pages/PostDetails"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const PostsList = lazy(() => import("./pages/admin/PostsList")); // Added for "All Entries"
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="blog/:id" element={<PostDetails />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="search" element={<SearchPage />} />
          </Route>

          {/* --- PROTECTED ADMIN ROUTES --- */}
          {/* Wrap AdminLayout in PrivateRoute to protect all sub-routes at once */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            {/* Matches sidebar: /admin/dashboard */}
            <Route path="dashboard" element={<Dashboard />} />

            {/* Matches sidebar: /admin/posts (Archive_Ledger) */}
            <Route path="posts">
              <Route index element={<PostsList />} /> {/* /admin/posts */}
              <Route path="add" element={<AddPost />} />{" "}
              {/* /admin/posts/add */}
              {/* <Route path="edit/:id" element={<CreatePost />} /> */}
            </Route>

            {/* Placeholder Redirect: hit /admin -> go to /admin/dashboard */}
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
          </Route>

          {/* --- 404 ROUTE --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
