import query from "../../db/index.js";

const listAllBook = async (req, res) => {
  const dbRes = await query(
    "SELECT id, title, price, description status FROM books"
  );
  const serverRes = {
    message: `${dbRes.rowCount} books are found`,
    data: dbRes.rows,
  };
  res.status(200).json(serverRes);
};

export default listAllBook;