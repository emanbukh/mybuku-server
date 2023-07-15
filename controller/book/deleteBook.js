import query from "../../db/index.js";

const deleteBook = async (req, res) => {
  const id = req.params.id;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const dbRes = await query("DELETE FROM books WHERE id = $1", [
    id,
  ]);
  if (token === null) {
    const notFoundRes = {
      message: "No books deleted",
    };
    res.status(404).json(notFoundRes);
  } else {
    const successRes = {
      message: `Books that come with ID = ${id} are deleted`,
    };
    res.status(200).json(successRes);
  }
};

export default deleteBook;