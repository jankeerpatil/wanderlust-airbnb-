// Import required modules
const express = require("express");
const router = express.Router(); // Create a new router object
const User = require("../models/user.js"); // Import User model
const wrapAsync = require("../utils/wrapAsync"); // Utility function to handle async errors
const passport = require("passport"); // Passport for authentication
const { saveRedirectUrl } = require("../middleware.js"); // Custom middleware to save return URL

const userController = require("../controllers/users.js"); // Import user-related controller functions

// Route for user signup
router.route("/signup")
  .get(userController.renderSignupForm) // Show signup form on GET request
  .post(wrapAsync(userController.signup)); // Handle signup logic on POST request (wrapped with error handler)

// Route for user login
router.route("/login")
  .get(userController.renderLoginForm) // Show login form on GET request
  .post(
    saveRedirectUrl, // Middleware to save the original URL user wanted to access
    passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), // Authenticate using local strategy
    userController.login // If successful, call login controller to finalize login
  );

// Route for user logout
router.get("/logout", userController.logout); // Logout the user and end session

// Export the router to use in main app
module.exports = router;
