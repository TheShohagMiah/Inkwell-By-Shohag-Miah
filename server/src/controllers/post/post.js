// ─────────────────────────────────────────────────────────
// @desc    Create new post
// @route   POST /api/posts
// @access  Private (author, admin)

import Category from "../../models/Category.js";
import Post from "../../models/post.js";
import User from "../../models/User.js";

// ─────────────────────────────────────────────────────────
export const createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      contentHtml,
      contentText,
      excerpt,
      coverImage,
      category,
      tags,
      status,
      visibility,
      scheduledAt,
      seo,
      tableOfContents,
      series,
      canonicalSource,
    } = req.body;

    // ── Validate category exists ──
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // ── Create post ──
    const post = await Post.create({
      title,
      content,
      contentHtml,
      contentText,
      excerpt,
      coverImage,
      category,
      tags,
      status: status || "draft",
      visibility: visibility || "public",
      scheduledAt: scheduledAt || null,
      seo,
      tableOfContents,
      series,
      canonicalSource,
      author: req.user._id,
    });

    // ── Increment author post count ──
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { postCount: 1 },
    });

    // ── Increment category post count ──
    await Category.findByIdAndUpdate(category, {
      $inc: { postCount: 1 },
    });

    // ── Populate and return ──
    const populated = await Post.findById(post._id)
      .populate("author", "name username avatar")
      .populate("category", "name slug color");

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: populated,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    console.error("createPost error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Get all published posts (public feed)
// @route   GET /api/posts
// @access  Public
// ─────────────────────────────────────────────────────────
export const getAllPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      author,
      search,
      sort = "latest",
      featured,
    } = req.query;

    // ── Build query ──
    const query = {
      status: "published",
      isDeleted: false,
    };

    if (category) query.category = category;
    if (author) query.author = author;
    if (tag) query.tags = { $in: [tag.toLowerCase()] };
    if (featured) query.isFeatured = true;

    // ── Full-text search ──
    if (search) {
      query.$text = { $search: search };
    }

    // ── Sort options ──
    const sortOptions = {
      latest: { publishedAt: -1 },
      oldest: { publishedAt: 1 },
      popular: { views: -1 },
      trending: { likes: -1 },
      engagement: { engagementScore: -1 },
    };
    const sortBy = sortOptions[sort] || sortOptions.latest;

    // ── Pagination ──
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    // ── Execute query ──
    const [posts, total] = await Promise.all([
      Post.find(query)
        .sort(sortBy)
        .skip(skip)
        .limit(limitNum)
        .populate("author", "name username avatar")
        .populate("category", "name slug color")
        .select(
          "-contentText -contentHtml -embeddedImages -revisions -likedBy -bookmarkedBy",
        ),
      Post.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      page: pageNum,
      posts,
    });
  } catch (error) {
    console.error("getAllPosts error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
// ─────────────────────────────────────────────────────────
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug,
      isDeleted: false,
    })
      .populate("author", "name username avatar bio socialLinks")
      .populate("category", "name slug color")
      .populate(
        "relatedPosts",
        "title slug coverImage readTime publishedAt author",
      )
      .select("-contentText -embeddedImages -revisions");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // ── Block non-published posts from public ──
    if (
      post.status !== "published" &&
      (!req.user ||
        (req.user._id.toString() !== post.author._id.toString() &&
          req.user.role !== "admin"))
    ) {
      return res.status(403).json({
        success: false,
        message: "This post is not published yet",
      });
    }

    // ── Increment view count (fire and forget) ──
    Post.increment(post._id, "views").catch(console.error);

    // ── Add isLiked / isBookmarked flags if user is logged in ──
    const postObj = post.toObject();
    if (req.user) {
      postObj.isLiked = post.likedBy.some(
        (id) => id.toString() === req.user._id.toString(),
      );
      postObj.isBookmarked = post.bookmarkedBy.some(
        (id) => id.toString() === req.user._id.toString(),
      );
    }

    // ── Remove heavy arrays from response ──
    delete postObj.likedBy;
    delete postObj.bookmarkedBy;

    res.status(200).json({
      success: true,
      post: postObj,
    });
  } catch (error) {
    console.error("getPostBySlug error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Get all posts by logged in author
// @route   GET /api/posts/my-posts
// @access  Private (author, admin)
// ─────────────────────────────────────────────────────────
export const getMyPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    const query = {
      author: req.user._id,
      isDeleted: false,
    };

    if (status) query.status = status;

    if (search) {
      query.$text = { $search: search };
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, parseInt(limit));
    const skip = (pageNum - 1) * limitNum;

    const [posts, total] = await Promise.all([
      Post.find(query)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate("category", "name slug color")
        .select(
          "-contentText -contentHtml -embeddedImages -revisions -likedBy -bookmarkedBy",
        ),
      Post.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      page: pageNum,
      posts,
    });
  } catch (error) {
    console.error("getMyPosts error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private (owner or admin)
// ─────────────────────────────────────────────────────────
export const updatePost = async (req, res) => {
  try {
    let post = await Post.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // ── Check ownership ──
    const isOwner = post.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this post",
      });
    }

    // ── Save revision before update ──
    await post.saveRevision(req.user._id, "Manual update");

    // ── Handle category change — update counts ──
    if (req.body.category && req.body.category !== post.category.toString()) {
      await Promise.all([
        Category.findByIdAndUpdate(post.category, { $inc: { postCount: -1 } }),
        Category.findByIdAndUpdate(req.body.category, {
          $inc: { postCount: 1 },
        }),
      ]);
    }

    // ── Apply updates ──
    const allowedFields = [
      "title",
      "content",
      "contentHtml",
      "contentText",
      "excerpt",
      "coverImage",
      "category",
      "tags",
      "status",
      "visibility",
      "scheduledAt",
      "seo",
      "tableOfContents",
      "series",
      "canonicalSource",
      "relatedPosts",
      "isFeatured",
      "isEditorsPick",
      "isPinned",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        post[field] = req.body[field];
      }
    });

    await post.save();

    const updated = await Post.findById(post._id)
      .populate("author", "name username avatar")
      .populate("category", "name slug color")
      .select("-contentText -embeddedImages -likedBy -bookmarkedBy");

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updated,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    console.error("updatePost error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Delete post (soft delete)
// @route   DELETE /api/posts/:id
// @access  Private (owner or admin)
// ─────────────────────────────────────────────────────────
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // ── Check ownership ──
    const isOwner = post.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this post",
      });
    }

    // ── Soft delete using instance method ──
    await post.softDelete(req.user._id);

    // ── Decrement counts ──
    await Promise.all([
      User.findByIdAndUpdate(post.author, {
        $inc: { postCount: -1 },
      }),
      Category.findByIdAndUpdate(post.category, {
        $inc: { postCount: -1 },
      }),
    ]);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("deletePost error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Toggle like on post
// @route   PUT /api/posts/:id/like
// @access  Private
// ─────────────────────────────────────────────────────────
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      status: "published",
      isDeleted: false,
    });

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const liked = await post.toggleLike(req.user._id);

    res.status(200).json({
      success: true,
      liked,
      likes: post.likes,
      message: liked ? "Post liked" : "Post unliked",
    });
  } catch (error) {
    console.error("toggleLike error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Toggle bookmark on post
// @route   PUT /api/posts/:id/bookmark
// @access  Private
// ─────────────────────────────────────────────────────────
export const toggleBookmark = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      status: "published",
      isDeleted: false,
    });

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const bookmarked = await post.toggleBookmark(req.user._id);

    res.status(200).json({
      success: true,
      bookmarked,
      bookmarks: post.bookmarks,
      message: bookmarked ? "Post bookmarked" : "Post removed from bookmarks",
    });
  } catch (error) {
    console.error("toggleBookmark error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Get bookmarked posts for logged in user
// @route   GET /api/posts/bookmarks
// @access  Private
// ─────────────────────────────────────────────────────────
export const getBookmarkedPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, parseInt(limit));
    const skip = (pageNum - 1) * limitNum;

    const [posts, total] = await Promise.all([
      Post.find({
        bookmarkedBy: req.user._id,
        status: "published",
        isDeleted: false,
      })
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate("author", "name username avatar")
        .populate("category", "name slug color")
        .select(
          "-contentText -contentHtml -embeddedImages -revisions -likedBy -bookmarkedBy",
        ),
      Post.countDocuments({
        bookmarkedBy: req.user._id,
        status: "published",
        isDeleted: false,
      }),
    ]);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      page: pageNum,
      posts,
    });
  } catch (error) {
    console.error("getBookmarkedPosts error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Get trending posts
// @route   GET /api/posts/trending
// @access  Public
// ─────────────────────────────────────────────────────────
export const getTrendingPosts = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    // Trending = most views + likes in last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const posts = await Post.find({
      status: "published",
      isDeleted: false,
      publishedAt: { $gte: sevenDaysAgo },
    })
      .sort({ views: -1, likes: -1 })
      .limit(parseInt(limit))
      .populate("author", "name username avatar")
      .populate("category", "name slug color")
      .select(
        "title slug excerpt coverImage readTime views likes publishedAt author category",
      );

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("getTrendingPosts error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Get related posts by category and tags
// @route   GET /api/posts/:id/related
// @access  Public
// ─────────────────────────────────────────────────────────
export const getRelatedPosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).select("category tags");

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const related = await Post.find({
      _id: { $ne: post._id }, // exclude current
      status: "published",
      isDeleted: false,
      $or: [{ category: post.category }, { tags: { $in: post.tags } }],
    })
      .sort({ publishedAt: -1 })
      .limit(4)
      .populate("author", "name username avatar")
      .populate("category", "name slug color")
      .select(
        "title slug excerpt coverImage readTime publishedAt views likes author category",
      );

    res.status(200).json({
      success: true,
      count: related.length,
      posts: related,
    });
  } catch (error) {
    console.error("getRelatedPosts error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
