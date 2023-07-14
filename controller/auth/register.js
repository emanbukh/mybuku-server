import query from "../../db/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const TOKEN_SECRET = "25VNclweOQgzAk0bmzBdTQoYnqshZwll";

const generateAccessToken = (userData) => {
  return jwt.sign(userData, TOKEN_SECRET, { expiresIn: "1800s" });
};

const register = async (req, res) => {
  try {
    const body = req.body;
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    const dbRes = await query(
      "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)",
      [body.email, body.username, hashedPassword]
    );

    
      
  

    const serverRes = {
      message: "A user created",
      
    };
    res.status(200).json(serverRes);
  } catch (error) {
    console.error(error); // Log the error object
    const { name, table, constraint, detail } = error;
    const serverRes = {
      message: detail,
      error: { name, table, constraint },
    };
    res.status(500).json(serverRes);
  }
};

export default register;
