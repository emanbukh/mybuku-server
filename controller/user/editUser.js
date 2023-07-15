import query from "../../db/index.js";

const editUser = async (req, res) => {
  const email = req.body.email;
  const username = req.params.username;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const dbRes = await query(
    "UPDATE users SET email=$1 WHERE username=$2",
    [email, username]
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

export default editUser;

