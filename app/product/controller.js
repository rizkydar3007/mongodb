const { ObjectId } = require("mongodb");
const db = require("../../config/mongodb");

const productController = {
  getAllProductsWithQuery: (req, res) => {
    const { name } = req.query;
    db.collection("product")
      .find({ name: { $regex: name, $options: "i" } })
      .toArray()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  },

  getDetailProduct: (req, res) => {
    const { id } = req.params;
    db.collection("product")
      .findOne({ _id: ObjectId(id) })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  },

  insertProduct: (req, res) => {
    const { name, price, stock, status } = req.body;
    db.collection("product")
      .insertOne({ name, price, stock, status })
      .then((result) =>
        res.send({
          message: "Successfully created!",
          result,
        })
      )
      .catch((error) => res.send(error));
  },

  updateProduct: (req, res) => {
    const { id } = req.params;
    const { name, price, stock, status } = req.body;
    db.collection("product")
      .updateOne({ _id: ObjectId(id) }, { $set: { name, price, stock, status } })
      .then((result) =>
        res.send({
          message: "Successfully updated!",
          result,
        })
      )
      .catch((error) => res.send(error));
  },

  deleteProduct: (req, res) => {
    const { id } = req.params;
    db.collection("product")
      .deleteOne({ _id: ObjectId(id) })
      .then((result) =>
        res.send({
          message: "Succesfully deleted!",
          result,
        })
      )
      .catch((error) => res.send(error));
  },
};

module.exports = productController;
