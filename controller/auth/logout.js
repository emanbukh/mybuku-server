import jwt from "jsonwebtoken";
const logout = (req, res) => {
  const TOKEN_SECRET = "25VNclweOQgzAk0bmzBdTQoYnqshZwll";
  const authHeader = req.headers["authorization"];
  jwt.sign(req.user, TOKEN_SECRET, { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.status(200).json({ message: "You have been Logged Out" });
    } else {
      res.status(500).json({ message: "Error" });
    }
  });
};

export default logout;