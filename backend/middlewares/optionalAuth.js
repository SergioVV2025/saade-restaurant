import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../utils/config.js";

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next();
  }

  const token = extractBearerToken(authorization);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch {
    return res.status(403).send({ message: "Error de autorización!" });
  }

  next();
};
