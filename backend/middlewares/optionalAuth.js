import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../utils/config.js";

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

export default (req, res, next) => {
  const { authorization } = req.headers;

  // Public reservation: no authentication required.
  if (!authorization) {
    return next();
  }

  // Reject malformed authorization headers.
  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Invalid authorization header.",
    });
  }

  const token = extractBearerToken(authorization);

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = payload;

    return next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};
