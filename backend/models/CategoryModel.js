const mongoose = require("mongoose");

const categroySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "default category description" },
  image: { type: String, default: "/images/tablets-category.png" },
  attrs: [{ key: { type: String }, value: [{ type: String }] }],
});

categroySchema.index({ description: 1 });

const Category = mongoose.model("Category", categroySchema);

module.exports = Category;
