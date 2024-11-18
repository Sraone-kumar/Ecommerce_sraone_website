const recordsPerPage = require("../config/pagination");
const Product = require("../models/ProductModel");
const imageValidate = require("../utils/imageValidate");

const getProducts = async (req, res, next) => {
  try {
    let query = {};
    let queryCondition = false;

    //filter products based on the prices
    let priceQueryCondition = {};
    if (req.query.price) {
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
      queryCondition = true;
    }

    //filter products based on rating
    let ratingQueryCondition = {};
    if (req.query.rating) {
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
      queryCondition = true;
    }

    //filter products based on multiple categories
    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      let a = categoryName.replaceAll(",", "/");
      const regEx = new RegExp("^" + a);
      categoryQueryCondition = { category: regEx };
      queryCondition = true;
    }

    //filter products based on individual category
    if (req.query.category) {
      let a = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item);
      });
      categoryQueryCondition = {
        category: { $in: a },
      };
      queryCondition = true;
    }

    //filter products based on attributes
    let attrsQueryCondition = [];
    if (req.query.attrs) {
      //input example: req.query.attrs=RAM-1TB-2TB-4TB,color-blue-red
      attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          const arr = item.split("-");
          acc.push({
            attrs: {
              $elemMatch: { key: arr.shift(), value: { $in: [...arr] } },
            },
          });
          // console.dir(acc, { depth: null });

          return acc;
        } else {
          return acc;
        }
      }, []);
      queryCondition = true;
    }

    //pagination
    const pageNum = Number(req.query.pageNum) || 1;

    //sort functionality
    let sort = {};

    const sortOption = req.query.sort || "";
    if (sortOption) {
      let sortOpt = sortOption.split("_");
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }

    //search products
    const searchQuery = req.params.searchQuery || "";
    let searchQueryCondition = {};

    let select = {};

    if (searchQuery) {
      queryCondition = true;
      searchQueryCondition = { $text: { $search: searchQuery } };
      select = {
        score: { $meta: "textScore" },
      };
      sort = { score: { $meta: "textScore" } };
    }

    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
          searchQueryCondition,
          ...attrsQueryCondition,
        ],
      };
    }

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .select(select)
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);

    res.json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("reviews")
      .orFail();

    res.json(product);
  } catch (error) {
    next(error);
  }
};

const getBestSellers = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      { $sort: { category: 1, sales: -1 } },
      {
        $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } },
      },
      { $match: { sales: { $gt: 0 } } },
      { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
      { $replaceWith: "$doc_with_max_sales" },
      { $limit: 3 },
    ]);

    res.json(products);
  } catch (error) {
    next(error);
  }
};

const adminGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .sort({ category: 1 })
      .select("name price category");

    return res.json(products);
  } catch (error) {
    next(error);
  }
};

const adminDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id).orFail();
    res.json({ message: "product removed" });
  } catch (error) {
    next(error);
  }
};

const adminCreateProduct = async (req, res, next) => {
  try {
    const product = new Product();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name;
    product.description = description;
    product.count = count;
    product.price = price;
    product.category = category;
    attributesTable.map((attr, idx) => {
      product.attrs.push(attr);
    });

    await product.save();

    res.json({ message: "product created", productId: product._id });
  } catch (error) {
    next(error);
  }
};

const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.price = price || product.price;
    product.category = category || product.category;
    if (attributesTable.length > 0) {
      product.attrs = [...attributesTable];
    }
    await product.save();
    res.json({ message: "product updated" });
  } catch (error) {
    next(error);
  }
};

const adminUpload = async (req, res, next) => {
  try {
    if (!req.files || !!req.files.images === false) {
      return res.status(400).send("No files were upload");
    }

    const validateResult = imageValidate(req.files.images);

    if (validateResult.error) {
      return res.status(400).send(validateResult.error);
    }

    const path = require("path");
    const { v4: uuidv4 } = require("uuid");
    const uploadDirectory = path.resolve(
      __dirname,
      "../../frontend",
      "public",
      "images",
      "products"
    );
    let imagesTable = [];

    let product = await Product.findById(req.query.productId).orFail();

    if (Array.isArray(req.files.images)) {
      imagesTable = req.files.images;
    } else {
      imagesTable.push(req.files.images);
    }

    for (let image of imagesTable) {
      const fileName = uuidv4() + path.extname(image.name);
      const uploadPath = uploadDirectory + "/" + fileName;

      product.images.push({ path: "images/products/" + fileName });
      image.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }

    await product.save();
    return res.send("Files uploaded");
  } catch (error) {
    next(error);
  }
};

const adminDeleteProductImage = async (req, res, next) => {
  try {
    const imagePath = decodeURIComponent(req.params.imagePath);

    const path = require("path");
    const finalPath = path.resolve("../frontend/public") + imagePath;

    const fs = require("fs");
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });

    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $pull: { images: { path: imagePath } } }
    ).orFail();

    res.end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getBestSellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUpload,
  adminDeleteProductImage,
};
