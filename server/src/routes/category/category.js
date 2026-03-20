// routes/category.routes.js
import { Router } from "express";
import {
  getAllCategories,
  createCategory,
  getCategoryBySlug,
  getCategoryById,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  reorderCategories,
  getFeaturedCategories,
} from "../../controllers/category/category.js";
import { authorize, protect } from "../../middlewars/authMiddlewares.js";

const categoryRouter = Router();

const adminOnly = [protect, authorize("reader")];

// ── Public ────────────────────────────────────────────────
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/featured", getFeaturedCategories);
categoryRouter.get("/:slug", getCategoryBySlug);

// ── Admin only ────────────────────────────────────────────
categoryRouter.post("/", ...adminOnly, createCategory);
categoryRouter.put("/reorder", ...adminOnly, reorderCategories);
categoryRouter.get("/id/:id", ...adminOnly, getCategoryById);
categoryRouter.put("/:id", ...adminOnly, updateCategory);
categoryRouter.delete("/:id", ...adminOnly, deleteCategory);
categoryRouter.put("/:id/toggle-status", ...adminOnly, toggleCategoryStatus);

export default categoryRouter;
