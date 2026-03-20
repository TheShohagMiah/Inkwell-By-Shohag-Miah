// models/Post.js
import mongoose from "mongoose";

// ── Sub-schemas ───────────────────────────────────────────

const CoverImageSchema = new mongoose.Schema(
  {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
    alt: { type: String, default: "" },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
  },
  { _id: false },
);

const SeoSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      default: "",
      maxlength: [60, "Meta title cannot exceed 60 characters"],
    },
    metaDescription: {
      type: String,
      default: "",
      maxlength: [160, "Meta description cannot exceed 160 characters"],
    },
    metaKeywords: { type: [String], default: [] },
    canonicalUrl: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    noIndex: { type: Boolean, default: false },
  },
  { _id: false },
);

const TableOfContentsSchema = new mongoose.Schema(
  {
    id: { type: String },
    text: { type: String },
    level: { type: Number },
  },
  { _id: false },
);

// ── Main Post Schema ──────────────────────────────────────

const PostSchema = new mongoose.Schema(
  {
    // ── Core fields ───────────────────────────────────────
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [150, "Title cannot exceed 150 characters"],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // ── Content ───────────────────────────────────────────
    // TipTap saves as JSON — store both JSON and HTML
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Post content is required"],
    },

    contentHtml: {
      type: String,
      default: "",
      select: false, // exclude by default — only fetch when rendering
    },

    // Plain text for full-text search & read time
    contentText: {
      type: String,
      default: "",
      select: false,
    },

    excerpt: {
      type: String,
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
      default: "",
    },

    // ── Media ─────────────────────────────────────────────
    coverImage: {
      type: CoverImageSchema,
      default: () => ({}),
    },

    // images embedded inside the post content
    embeddedImages: [
      {
        url: String,
        publicId: String, // for Cloudinary deletion
      },
    ],

    // ── Relations ─────────────────────────────────────────
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Post must have an author"],
      index: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Post must have a category"],
      index: true,
    },

    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (tags) => tags.length <= 10,
        message: "Post cannot have more than 10 tags",
      },
      set: (tags) => tags.map((t) => t.toLowerCase().trim()),
    },

    // ── Status & Visibility ───────────────────────────────
    status: {
      type: String,
      enum: ["draft", "published", "archived", "scheduled"],
      default: "draft",
      index: true,
    },

    visibility: {
      type: String,
      enum: ["public", "members", "paid"],
      default: "public",
    },

    publishedAt: {
      type: Date,
      default: null,
      index: true,
    },

    scheduledAt: {
      type: Date,
      default: null,
    },

    // ── SEO ───────────────────────────────────────────────
    seo: {
      type: SeoSchema,
      default: () => ({}),
    },

    // ── Table of Contents ─────────────────────────────────
    tableOfContents: {
      type: [TableOfContentsSchema],
      default: [],
    },

    // ── Reading ───────────────────────────────────────────
    readTime: {
      type: Number,
      default: 1,
      min: 1,
    },

    language: {
      type: String,
      default: "en",
    },

    // ── Stats — denormalized for performance ──────────────
    views: { type: Number, default: 0, min: 0 },
    uniqueViews: { type: Number, default: 0, min: 0 },
    likes: { type: Number, default: 0, min: 0 },
    bookmarks: { type: Number, default: 0, min: 0 },
    shares: { type: Number, default: 0, min: 0 },
    commentCount: { type: Number, default: 0, min: 0 },

    // ── User interaction tracking ─────────────────────────
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    bookmarkedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ── Editorial flags ───────────────────────────────────
    isFeatured: { type: Boolean, default: false },
    isEditorsPick: { type: Boolean, default: false },
    isPinned: { type: Boolean, default: false },
    isSponsored: { type: Boolean, default: false },

    // ── Series (multi-part posts) ─────────────────────────
    series: {
      name: { type: String, default: "" },
      order: { type: Number, default: 0 },
    },

    // ── Revision history ──────────────────────────────────
    revisions: [
      {
        content: mongoose.Schema.Types.Mixed,
        editedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        editedAt: { type: Date, default: Date.now },
        note: { type: String, default: "" },
      },
    ],

    // ── Related posts (manually curated or auto) ─────────
    relatedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    // ── Canonical / republished source ────────────────────
    canonicalSource: {
      title: { type: String, default: "" },
      url: { type: String, default: "" },
    },

    // ── Soft delete ───────────────────────────────────────
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ── Indexes for performance ───────────────────────────────
PostSchema.index({ slug: 1 });
PostSchema.index({ author: 1, status: 1 });
PostSchema.index({ category: 1, status: 1 });
PostSchema.index({ tags: 1, status: 1 });
PostSchema.index({ status: 1, publishedAt: -1 });
PostSchema.index({ status: 1, views: -1 });
PostSchema.index({ status: 1, likes: -1 });
PostSchema.index({ isFeatured: 1, status: 1 });
PostSchema.index({ isDeleted: 1, status: 1 });
PostSchema.index({ createdAt: -1 });

// ── Full-text search index ────────────────────────────────
PostSchema.index(
  {
    title: "text",
    contentText: "text",
    excerpt: "text",
    tags: "text",
  },
  {
    weights: {
      title: 10, // title matches ranked highest
      tags: 5,
      excerpt: 3,
      contentText: 1,
    },
    name: "post_text_search",
  },
);

// ── Virtuals ──────────────────────────────────────────────

// total engagement score
PostSchema.virtual("engagementScore").get(function () {
  return this.likes * 3 + this.bookmarks * 2 + this.comments + this.views;
});

// is currently published
PostSchema.virtual("isPublished").get(function () {
  return this.status === "published" && !this.isDeleted;
});

// ── Pre-save hooks ────────────────────────────────────────

// Auto-generate unique slug from title
PostSchema.pre("save", async function () {
  if (!this.isModified("title")) return;

  let baseSlug = this.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80); // max slug length

  // Ensure uniqueness
  let slug = baseSlug;
  let count = 1;

  while (
    await mongoose.model("Post").findOne({
      slug,
      _id: { $ne: this._id },
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }

  this.slug = slug;
});

// Auto-calculate read time from plain text
PostSchema.pre("save", async function () {
  if (!this.isModified("contentText")) return;
  const WORDS_PER_MINUTE = 200;
  const wordCount = this.contentText.trim().split(/\s+/).length;
  this.readTime = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
});

// Auto-generate excerpt from contentText
PostSchema.pre("save", async function () {
  if (this.excerpt || !this.contentText) return;
  this.excerpt =
    this.contentText
      .slice(0, 300)
      .trim()
      .replace(/\s+\S*$/, "") + // don't cut mid-word
    "...";
});

// Set publishedAt timestamp when first published
PostSchema.pre("save", async function () {
  if (
    this.isModified("status") &&
    this.status === "published" &&
    !this.publishedAt
  ) {
    this.publishedAt = new Date();
  }
});

// Auto-fill SEO fields from title & excerpt if empty
PostSchema.pre("save", async function () {
  if (!this.seo.metaTitle && this.title) {
    this.seo.metaTitle = this.title.slice(0, 60);
  }
  if (!this.seo.metaDescription && this.excerpt) {
    this.seo.metaDescription = this.excerpt.slice(0, 160);
  }
});

// ── Static methods ────────────────────────────────────────

// Get all published posts with pagination
PostSchema.statics.getPublished = function (query = {}, options = {}) {
  const { page = 1, limit = 10, sort = { publishedAt: -1 } } = options;

  return this.find({ ...query, status: "published", isDeleted: false })
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("author", "name username avatar")
    .populate("category", "name slug color")
    .select("-contentText -contentHtml -embeddedImages -revisions");
};

// Increment a numeric field safely
PostSchema.statics.increment = function (id, field, amount = 1) {
  return this.findByIdAndUpdate(
    id,
    { $inc: { [field]: amount } },
    { new: true },
  );
};

// ── Instance methods ──────────────────────────────────────

// Save revision before update
PostSchema.methods.saveRevision = async function (editorId, note = "") {
  this.revisions.push({
    content: this.content,
    editedBy: editorId,
    editedAt: new Date(),
    note,
  });

  // keep only last 10 revisions
  if (this.revisions.length > 10) {
    this.revisions = this.revisions.slice(-10);
  }
};

// Soft delete
PostSchema.methods.softDelete = async function (deletedBy) {
  this.isDeleted = true;
  this.deletedAt = new Date();
  this.deletedBy = deletedBy;
  this.status = "archived";
  await this.save();
};

// Toggle like
PostSchema.methods.toggleLike = async function (userId) {
  const index = this.likedBy.indexOf(userId);

  if (index === -1) {
    this.likedBy.push(userId);
    this.likes += 1;
  } else {
    this.likedBy.splice(index, 1);
    this.likes = Math.max(0, this.likes - 1);
  }

  await this.save();
  return index === -1; // true = liked, false = unliked
};

// Toggle bookmark
PostSchema.methods.toggleBookmark = async function (userId) {
  const index = this.bookmarkedBy.indexOf(userId);

  if (index === -1) {
    this.bookmarkedBy.push(userId);
    this.bookmarks += 1;
  } else {
    this.bookmarkedBy.splice(index, 1);
    this.bookmarks = Math.max(0, this.bookmarks - 1);
  }

  await this.save();
  return index === -1;
};

const Post = mongoose.model("Post", PostSchema);
export default Post;
