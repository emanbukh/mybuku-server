import jwt from "jsonwebtoken";

const TOKEN_SECRET = "25VNclweOQgzAk0bmzBdTQoYnqshZwll";

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.status(401).json({ message: "Unauthorised" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorised" });
    req.user = user;
    next();
  });
};

export default isAuthenticated;