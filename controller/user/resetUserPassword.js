import query from "../../db/index.js";
import bcrypt from "bcryptjs";

const resetUserPassword = async (req, res) => {
  const username = req.params.username;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const dbRes = await query(
    "UPDATE users SET password=$1 WHERE username=$2",
    [hashedPassword, username]
  );

  if (token === null) {
    const notFoundRes = {
      message: "No users are update",
    };
    res.status(404).json(notFoundRes);
  } else {
    const successRes = {
      message: `Users modified with username: ${username}`,
    };
    res.status(200).json(successRes);
  }
};

export default resetUserPassword;

