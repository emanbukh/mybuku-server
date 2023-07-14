import query from "../../db/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const TOKEN_SECRET = "25VNclweOQgzAk0bmzBdTQoYnqshZwll";

const generateAccessToken = (userData) => {
  return jwt.sign(userData, TOKEN_SECRET, { expiresIn: "1800s" });
};

const login = async (req, res) => {
  const body = req.body;

  
  try {
    const user = await query(
      "SELECT * FROM users WHERE username=$1 OR email=$1",
      [body.identifier]
    ).then((res) => {
      if (res.rowCount > 0) {
        return res.rows[0];
      } else {
        throw res;
      }
    });

    // decrypt the hash from db and compare
    bcrypt.compare(body.password, user.password, (error, bcryptRes) => {
      if (bcryptRes) {
        const token = generateAccessToken({
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.is_admin,
        });

        const serverRes = {
          message: "Login successfull",
          data: user,
          jwt: token,
        };
        res.status(200).json(serverRes);
      } else {
        const serverRes = {
          message: "Login unsuccessfull",
          error: "Invalid credential",
          data: error,
        };
        res.status(401).json(serverRes);
      }
    });
  } catch (error) {
    const serverRes = {
      message: "Invalid request",
      error: "Invalid indentifier",
    };
    res.status(403).json(serverRes);
  }
};

export default login;