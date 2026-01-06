const jwt = require("jsonwebtoken");

// ⚠️ Same secret auth routes lo use chesinade undali
const JWT_SECRET = "your_secret_key";

const auth = (req, res, next) => {
  // 1️⃣ Token get cheyyadam
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // 2️⃣ Bearer token handle cheyyadam
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // 3️⃣ Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // 4️⃣ Request ki user attach cheyyadam
    req.user = decoded; // { id, role }

    // 5️⃣ Next route ki velladam
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;

