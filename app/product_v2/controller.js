const db = require("../../config/mongoose");
const Product = require("./model");

const productController = {
  getAllProductsWithQuery: (req, res) => {
    const { name } = req.query;
    Product.find({ name: { $regex: name, $options: "i" } })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  },
  getDetailProduct: (req, res) => {
    const { id } = req.params;
    Product.find({ _id: id })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  },
  insertProduct: (req, res) => {
    const { name, price, stock, status } = req.body;
    Product.create({ name, price, stock, status })
      .then((result) => res.send({ message: "Successfully created!", result }))
      .catch((error) => res.send(error));
  },
  updateProduct: (req, res) => {
    const { id } = req.params;
    const { name, price, stock, status } = req.body;
    Product.updateOne({ _id: id }, { $set: { name, price, stock, status } })
      .then((result) => res.send({ message: "Succesfully updated!", result }))
      .catch((error) => res.send(error));
  },
  deleteProduct: (req, res) => {
    const { id } = req.params;
    Product.deleteOne({ _id: id })
      .then((result) => res.send({ message: "Successfully deleted!", result }))
      .catch((error) => res.send(error));
  },
};

module.exports = productController;
