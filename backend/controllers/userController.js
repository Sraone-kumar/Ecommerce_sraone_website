const User = require("../models/UserModel");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");
const Review = require("../models/ReviewModel");
const Product = require("../models/ProductModel");
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;
    if (!(name && lastName && email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send("user exists");
    } else {
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        name,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
      });
      res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          {
            httpOnly: true,
            sameSite: "strict",
          }
        )
        .status(200)
        .json({
          success: "User created",
          userCreated: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password, keepMeSignedIn } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const user = await User.findOne({ email });

    if (user && comparePasswords(password, user.password)) {
      //to do: compare passwords

      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
      };

      if (keepMeSignedIn) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 };
      }

      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          cookieParams
        )
        .json({
          success: "user logged in",
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            keepMeSignedIn,
          },
        });
    } else {
      return res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.state = req.body.city;
    if (!comparePasswords(req.body.password, user.password)) {
      user.password = hashPassword(req.body.password);
    }

    await user.save();
    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const writeReview = async (req, res, next) => {
  try {
    const session = await Review.startSession();
    //get comment, rating from request.body;
    const { comment, rating } = req.body;
    if (!(comment && rating)) {
      return res.status(400).send("All inputs are required");
    }

    //create review id manually, need to save in product collection

    const ObjectId = require("mongodb").ObjectId;
    let reviewId = new ObjectId();
    session.startTransaction();
    const review = await Review.create(
      [
        {
          _id: reviewId._id,
          comment: comment,
          rating: Number(rating),
          user: {
            _id: req.user._id,
            name: req.user.name + " " + req.user.lastName,
          },
        },
      ],
      { session: session }
    );

    const product = await Product.findById(req.params.productId)
      .populate("reviews")
      .session(session);

    const alreadyReviewd = product.reviews.find(
      (r) => r.user._id.toString() === req.user._id.toString()
    );

    if (alreadyReviewd) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send("product already reviewed");
    }

    let prc = [...product.reviews];
    prc.push({ rating: rating });
    product.reviews.push(reviewId._id);

    if (product.reviews.length === 1) {
      product.rating = Number(rating);
      product.reviewsNumber = 1;
    } else {
      product.reviewsNumber = product.reviews.length;
      product.rating = Math.ceil(
        prc
          .map((item) => Number(item.rating))
          .reduce((accu, curr) => {
            return accu + curr;
          }, 0) / product.reviews.length
      );
    }

    await product.save();
    await session.commitTransaction();
    session.endSession();
    res.send({ success: "review created" });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("name lastName email isAdmin")
      .orFail();
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();

    user.name = req.body.name || user.name;

    user.lastName = req.body.lastName || user.lastName;

    user.email = req.body.email || user.email;

    user.isAdmin = req.body.isAdmin || user.isAdmin;

    await user.save();

    res.send("user updated");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id).orFail();
    res.send("user deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getUser,
  updateUser,
  deleteUser,
};
