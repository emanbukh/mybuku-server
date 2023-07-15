import query from "../../db/index.js";

const editBook = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const dbRes = await query(
    "UPDATE books SET title=$1, price=$2, description=$3 WHERE id=$4",
    [title, price, description, id]
  );

  if (token === null) {
    const notFoundRes = {
      message: "No books are update",
    };
    res.status(404).json(notFoundRes);
  } else {
    const successRes = {
      message: `Changes is made for book with id: ${id}`,
    };
    res.status(200).json(successRes);
  }
};

export default editBook ;
    

