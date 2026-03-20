import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["reader", "author", "admin"],
      default: "reader",
    },
    avatar: { type: String, default: "" },
    bio: {
      type: String,
      maxlength: [300, "Bio cannot exceed 300 characters"],
      default: "",
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    socialLinks: {
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verificationToken: String,
    lastLogin: { type: Date, default: null },
    postCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Auto-generate username ────────────────────────────────
// ✅ async — no next
UserSchema.pre("validate", async function () {
  if (!this.username && this.name) {
    this.username =
      this.name
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "") +
      "_" +
      Math.floor(Math.random() * 9999);
  }
});

// ── Hash password ─────────────────────────────────────────
// ✅ async — no next
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// ── Match password ────────────────────────────────────────
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ── Public profile ────────────────────────────────────────
UserSchema.methods.toPublicProfile = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    username: this.username,
    avatar: this.avatar,
    bio: this.bio,
    role: this.role,
    socialLinks: this.socialLinks,
    postCount: this.postCount,
    createdAt: this.createdAt,
  };
};

const User = mongoose.model("User", UserSchema);
export default User;
