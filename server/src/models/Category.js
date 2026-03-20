import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    // ── Core ──────────────────────────────────────────────
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      maxlength: [300, "Description cannot exceed 300 characters"],
      default: "",
    },

    // ── Appearance ────────────────────────────────────────
    color: {
      type: String,
      default: "#7F77DD",
      match: [/^#([A-Fa-f0-9]{6})$/, "Please provide a valid hex color"],
    },

    icon: {
      type: String,
      default: "",
    },

    coverImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },

    // ── Meta ──────────────────────────────────────────────
    seo: {
      metaTitle: { type: String, default: "", maxlength: 60 },
      metaDescription: { type: String, default: "", maxlength: 160 },
    },

    // ── Stats ─────────────────────────────────────────────
    postCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ── Relations ─────────────────────────────────────────
    // parent category for nested categories (e.g Tech > JavaScript)
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // ── Flags ─────────────────────────────────────────────
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },

    // ── Ordering ──────────────────────────────────────────
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ── Indexes ───────────────────────────────────────────────
CategorySchema.index({ slug: 1 });
CategorySchema.index({ isActive: 1 });
CategorySchema.index({ parent: 1 });
CategorySchema.index({ sortOrder: 1 });

// auto generated slug
CategorySchema.pre("validate", async function () {
  if (this.isModified("name")) {
    let baseSlug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    // Ensure uniqueness
    let slug = baseSlug;
    let count = 1;

    while (
      await mongoose.model("Category").findOne({
        slug,
        _id: { $ne: this._id },
      })
    ) {
      slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
  }
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
