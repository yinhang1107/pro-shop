import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 4;
  const startIndex = (page - 1) * pageSize;
  const total = await Product.countDocuments({});

  const { keyword } = req.query;

  const productName = new RegExp(keyword, "i");

  const products = await Product.find({ name: productName })
    .limit(pageSize)
    .skip(startIndex);

  res.json({ products, page, pages: Math.ceil(total / pageSize), pageSize });
};

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json("Product removed successfully.");
};

export const createProduct = async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  const product = new Product({
    user: req.user._id,
    name,
    image,
    brand,
    category,
    description,
    price,
    countInStock,
  });

  await product.save();

  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  product.name = name || product.name;
  product.image = image || product.image;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.description = description || product.description;
  product.price = price || product.price;
  product.countInStock = countInStock || product.countInStock;

  await product.save();

  res.status(200).json(product);
};

export const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Product already reviewed");
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);

  product.rating =
    product.reviews.reduce((acc, item) => acc + item.rating, 0) /
    product.reviews.length;

  product.numReviews = product.reviews.length;

  await product.save();

  res.status(201).json({ message: "Review added." });
};

export const getTopProducts = async (req, res) => {
  const topProducts = await Product.find().sort({ rating: -1 }).limit(3);

  res.status(200).json(topProducts);
};
