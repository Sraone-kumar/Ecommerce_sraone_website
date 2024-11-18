const Category = require("../models/CategoryModel");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: "asc" }).orFail();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const newCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    if (!category) {
      res.status(400).send("Category input is required");
    }

    const categoryExists = await Category.findOne({ name: category });

    if (categoryExists) {
      res.status(400).send("category already exists");
    } else {
      const categoryCreated = await Category.create({
        name: category,
      });
      res.status(201).send({ categoryCreated: categoryCreated });
    }
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  //   return res.send(req.params.category);
  try {
    if (req.params.category !== "choose category") {
      const categoryExists = await Category.findOneAndDelete({
        name: decodeURIComponent(req.params.category),
      }).orFail();

      res.json({ categoryDeleted: true });
    }
  } catch (error) {
    next(error);
  }
};

const saveAttr = async (req, res, next) => {
  const { key, val, categoryChoosen } = req.body;
  if (!key || !val || !categoryChoosen) {
    res.status(400).send("All inputs are required");
  }

  try {
    const category = categoryChoosen.split("/")[0];
    const categoryExists = await Category.findOne({ name: category }).orFail();
    if (categoryExists.attrs.length > 0) {
      //if key exists in the database then add a value to the key
      const isKey = true;
      categoryExists.map((item, index) => {
        if (item.key == key) {
          isKey = false;
          const copyAttrVals = [...categoryExists.attrs[index].value];
          copyAttrVals.push(val);
          const newAttrVals = [...new Set(copyAttrVals)];
          categoryExists.attrs[index].value = newAttrVals;
        }
      });
      if (isKey) {
        categoryExists.attrs.push({ key: key, value: [val] });
      }
    } else {
      categoryExists.attrs.push({ key: key, value: [val] });
    }

    await categoryExists.save();
    let cat = await Category.find({}).sort({ name: "asc" });

    res.status(201).json({ categoriesUpdated: cat });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories, newCategory, deleteCategory, saveAttr };
