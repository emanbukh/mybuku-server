import query from "../../db/index.js";

const deleteUser = async (req, res) => {
  const username = req.params.username;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const dbRes = await query("DELETE FROM users WHERE username = $1", [
    username,
  ]);
  if (token === null) {
    const notFoundRes = {
      message: "No users deleted",
    };
    res.status(404).json(notFoundRes);
  } else {
    const successRes = {
      message: `${username} is deleted`,
    };
    res.status(200).json(successRes);
  }
};

export default deleteUser;