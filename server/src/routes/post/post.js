// routes/post.routes.js
import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostBySlug,
  getMyPosts,
  updatePost,
  deletePost,
  toggleLike,
  toggleBookmark,
  getBookmarkedPosts,
  getTrendingPosts,
  getRelatedPosts,
} from "../../controllers/post/post.js";
import { authorize, protect } from "../../middlewars/authMiddlewares.js";

const postRoutes = Router();

// ─────────────────────────────────────────────────────────
// Public Routes
// ─────────────────────────────────────────────────────────

// GET /api/posts?page=1&limit=10&sort=latest&category=&tag=&search=
postRoutes.get("/", getAllPosts);

// GET /api/posts/trending?limit=5
postRoutes.get("/trending", getTrendingPosts);

// ─────────────────────────────────────────────────────────
// Private — Auth Required
// ─────────────────────────────────────────────────────────

// GET /api/posts/user/my-posts?page=1&status=draft
postRoutes.get("/user/my-posts", protect, getMyPosts);

// GET /api/posts/user/bookmarks?page=1
postRoutes.get("/user/bookmarks", protect, getBookmarkedPosts);

// ─────────────────────────────────────────────────────────
// Private — Author / Admin Only
// ─────────────────────────────────────────────────────────

// POST /api/posts
postRoutes.post("/", protect, authorize("author", "admin"), createPost);

// PUT /api/posts/:id
postRoutes.put("/:id", protect, authorize("author", "admin"), updatePost);

// DELETE /api/posts/:id
postRoutes.delete("/:id", protect, authorize("author", "admin"), deletePost);

// ─────────────────────────────────────────────────────────
// Private — Any logged in user
// ─────────────────────────────────────────────────────────

// PUT /api/posts/:id/like
postRoutes.put("/:id/like", protect, toggleLike);

// PUT /api/posts/:id/bookmark
postRoutes.put("/:id/bookmark", protect, toggleBookmark);

// ─────────────────────────────────────────────────────────
// Public — Dynamic (keep these LAST to avoid conflicts)
// ─────────────────────────────────────────────────────────

// GET /api/posts/:id/related
postRoutes.get("/:id/related", getRelatedPosts);

// GET /api/posts/:slug
// protect is optional here — used only to attach isLiked/isBookmarked flags
postRoutes.get("/:slug", protect, getPostBySlug);

export default postRoutes;
