const jwt = require("jsonwebtoken");

// authenticate user with tokens
exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, message: "Forbidden: Invalid token" });
      }

      req.user = decoded;

      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// check user is admin or not
exports.isAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role Not Provided",
      });
    }
    if (role === "admin") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Protected - Access Denied",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
exports.isFaculty = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role Not Provided",
      });
    }
    if (role === "faculty") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Protected - Access Denied",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
exports.isStudent = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role Not Provided",
      });
    }
    if (role === "student") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Protected - Access Denied",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
