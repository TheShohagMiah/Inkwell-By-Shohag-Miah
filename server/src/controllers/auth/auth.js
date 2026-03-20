// controllers/auth.controller.js
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

// ── Cookie Options ────────────────────────────────────────
const cookieOptions = () => ({
  httpOnly: true, // JS cannot access — prevents XSS
  secure: process.env.NODE_ENV === "production", // HTTPS only in prod
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: (parseInt(process.env.COOKIE_EXPIRE) || 7) * 24 * 60 * 60 * 1000,
});

// ── Generate Token ────────────────────────────────────────
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// ── Send Token as Cookie ──────────────────────────────────
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  res.status(statusCode).cookie("inkwell_token", token, cookieOptions()).json({
    success: true,
    user: user.toPublicProfile(),
  });
};

// ─────────────────────────────────────────────────────────
// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
// ─────────────────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    // ── Check email uniqueness ──
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // ── Check username uniqueness ──
    if (username) {
      const existingUsername = await User.findOne({
        username: username.toLowerCase(),
      });
      if (existingUsername) {
        return res.status(409).json({
          success: false,
          message: "This username is already taken",
        });
      }
    }

    // ── Create user ──
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      username: username?.toLowerCase().trim(),
    });

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        success: false,
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      });
    }

    console.error("Register error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during registration" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// ─────────────────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // ── Find user + select password ──
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ── Check account is active ──
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated. Please contact support.",
      });
    }

    // ── Verify password ──
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during login" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Logout user — clear cookie
// @route   POST /api/auth/logout
// @access  Private
// ─────────────────────────────────────────────────────────
export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("inkwell_token", "", {
      httpOnly: true,
      expires: new Date(0), // immediately expire
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

// ─────────────────────────────────────────────────────────
// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
// ─────────────────────────────────────────────────────────
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: user.toPublicProfile(),
    });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Update profile
// @route   PUT /api/auth/me
// @access  Private
// ─────────────────────────────────────────────────────────
export const updateProfile = async (req, res) => {
  try {
    const { name, username, bio, avatar, socialLinks } = req.body;

    if (username) {
      const existing = await User.findOne({
        username: username.toLowerCase(),
        _id: { $ne: req.user.id },
      });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: "This username is already taken",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        ...(name && { name }),
        ...(username && { username: username.toLowerCase() }),
        ...(bio !== undefined && { bio }),
        ...(avatar && { avatar }),
        ...(socialLinks && { socialLinks }),
      },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      user: updatedUser.toPublicProfile(),
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    console.error("UpdateProfile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
// ─────────────────────────────────────────────────────────
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("ChangePassword error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
