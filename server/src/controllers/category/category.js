// controllers/category.controller.js

import Category from "../../models/Category.js";
import Post from "../../models/post.js";

// ─────────────────────────────────────────────────────────
// @desc    Create category
// @route   POST /api/categories
// @access  Private (admin)
// ─────────────────────────────────────────────────────────
export const createCategory = async (req, res) => {
  try {
    const {
      name,
      description,
      color,
      icon,
      coverImage,
      parent,
      seo,
      isFeatured,
      sortOrder,
    } = req.body;

    // ── Check name uniqueness ──
    const existing = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "A category with this name already exists",
      });
    }

    // ── Validate parent exists ──
    if (parent) {
      const parentExists = await Category.findById(parent);
      if (!parentExists) {
        return res.status(404).json({
          success: false,
          message: "Parent category not found",
        });
      }
    }

    const category = await Category.create({
      name,
      description,
      color,
      icon,
      coverImage,
      parent: parent || null,
      seo,
      isFeatured: isFeatured || false,
      sortOrder: sortOrder || 0,
      createdBy: req.user._id,
    });

    await category.populate("parent", "name slug");

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Category name or slug already exists",
      });
    }
    console.error("createCategory error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
// ─────────────────────────────────────────────────────────
export const getAllCategories = async (req, res) => {
  try {
    const {
      includeInactive,
      featured,
      parent,
      withPostCount = true,
    } = req.query;

    // ── Build query ──
    const query = {};

    // only admin can see inactive
    if (!includeInactive || req.user?.role !== "admin") {
      query.isActive = true;
    }

    if (featured) query.isFeatured = true;
    if (parent === "null")
      query.parent = null; // top-level only
    else if (parent) query.parent = parent; // children of parent

    const categories = await Category.find(query)
      .sort({ sortOrder: 1, name: 1 })
      .populate("parent", "name slug")
      .select(withPostCount === "false" ? "-postCount" : "");

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("getAllCategories error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Get single category by slug with its posts
// @route   GET /api/categories/:slug
// @access  Public
// ─────────────────────────────────────────────────────────
export const getCategoryBySlug = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "latest" } = req.query;

    const category = await Category.findOne({
      slug: req.params.slug,
      isActive: true,
    })
      .populate("parent", "name slug")
      .populate("subcategories", "name slug color icon postCount");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // ── Fetch category posts ──
    const sortOptions = {
      latest: { publishedAt: -1 },
      popular: { views: -1 },
      trending: { likes: -1 },
    };

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, parseInt(limit));
    const skip = (pageNum - 1) * limitNum;

    const [posts, total] = await Promise.all([
      Post.find({
        category: category._id,
        status: "published",
        isDeleted: false,
      })
        .sort(sortOptions[sort] || sortOptions.latest)
        .skip(skip)
        .limit(limitNum)
        .populate("author", "name username avatar")
        .select(
          "title slug excerpt coverImage readTime views likes publishedAt author",
        ),

      Post.countDocuments({
        category: category._id,
        status: "published",
        isDeleted: false,
      }),
    ]);

    res.status(200).json({
      success: true,
      category,
      posts,
      total,
      totalPages: Math.ceil(total / limitNum),
      page: pageNum,
    });
  } catch (error) {
    console.error("getCategoryBySlug error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Get category by ID
// @route   GET /api/categories/id/:id
// @access  Private (admin)
// ─────────────────────────────────────────────────────────
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate("parent", "name slug")
      .populate("subcategories", "name slug postCount isActive")
      .populate("createdBy", "name email");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({ success: true, category });
  } catch (error) {
    console.error("getCategoryById error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (admin)
// ─────────────────────────────────────────────────────────
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // ── Prevent category from being its own parent ──
    if (req.body.parent && req.body.parent === req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Category cannot be its own parent",
      });
    }

    // ── Check name uniqueness if changing ──
    if (req.body.name && req.body.name !== category.name) {
      const existing = await Category.findOne({
        name: { $regex: new RegExp(`^${req.body.name}$`, "i") },
        _id: { $ne: req.params.id },
      });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: "A category with this name already exists",
        });
      }
    }

    const allowedFields = [
      "name",
      "description",
      "color",
      "icon",
      "coverImage",
      "parent",
      "seo",
      "isActive",
      "isFeatured",
      "sortOrder",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        category[field] = req.body[field];
      }
    });

    await category.save();

    await category.populate("parent", "name slug");

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    console.error("updateCategory error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (admin)
// ─────────────────────────────────────────────────────────
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // ── Block deletion if posts exist ──
    if (category.postCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete — ${category.postCount} post(s) are using this category. Reassign them first.`,
      });
    }

    // ── Block deletion if subcategories exist ──
    const subcategoryCount = await Category.countDocuments({
      parent: category._id,
    });
    if (subcategoryCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete — this category has ${subcategoryCount} subcategory(ies). Delete them first.`,
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("deleteCategory error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Toggle category active status
// @route   PUT /api/categories/:id/toggle-status
// @access  Private (admin)
// ─────────────────────────────────────────────────────────
export const toggleCategoryStatus = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    category.isActive = !category.isActive;
    await category.save();

    res.status(200).json({
      success: true,
      message: `Category ${category.isActive ? "activated" : "deactivated"} successfully`,
      isActive: category.isActive,
    });
  } catch (error) {
    console.error("toggleCategoryStatus error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Reorder categories
// @route   PUT /api/categories/reorder
// @access  Private (admin)
// ─────────────────────────────────────────────────────────
export const reorderCategories = async (req, res) => {
  try {
    const { orders } = req.body;
    // orders = [{ id: '...', sortOrder: 0 }, { id: '...', sortOrder: 1 }]

    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of { id, sortOrder }",
      });
    }

    // ── Bulk update sortOrders ──
    await Promise.all(
      orders.map(({ id, sortOrder }) =>
        Category.findByIdAndUpdate(id, { sortOrder }),
      ),
    );

    res.status(200).json({
      success: true,
      message: "Categories reordered successfully",
    });
  } catch (error) {
    console.error("reorderCategories error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Get featured categories
// @route   GET /api/categories/featured
// @access  Public
// ─────────────────────────────────────────────────────────
export const getFeaturedCategories = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const categories = await Category.find({
      isActive: true,
      isFeatured: true,
    })
      .sort({ sortOrder: 1 })
      .limit(parseInt(limit))
      .select("name slug color icon postCount coverImage");

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("getFeaturedCategories error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
