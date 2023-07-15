import query from "../../db/index.js";

const addBook = async (req, res) => {
  try {
    const body = req.body;

    const dbRes = await query(
      "INSERT INTO projects (title, price, description) VALUES ($1, $2, $3)",
      [body.title, body.price, body.description]
    );
    const serverRes = {
      message: "A book created",
    };
    res.status(200).json(serverRes);
  } catch (error) {
    const { name, table, constraint, detail } = error;
    const serverRes = {
      message: detail,
      error: { name, table, constraint },
    };
    res.status(500).json(serverRes);
  }
};

export default addBook;