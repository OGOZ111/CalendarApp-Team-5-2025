import express from "express";
import { body } from "express-validator";
import verifyToken from "../middlewares/verifyToken";
import {
  register,
  login,
  logout,
  deleteUserAndData,
  getUser,
  premiumCheck,
  protectedCheck,
  generateImageForUser,
  createCheckoutSession,
  refreshToken,
} from "../controllers/authControllers";

const router = express.Router();

// Route for user registration using Firebase Auth and Realtime Database and Firestore  (with email verification)

router.post(
  "/register",
  [
    // Validate the request body
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 7 })
      .withMessage("Password must be at least 7 characters long"),
    body("displayName").not().isEmpty().withMessage("Display name is required"),
    body("status")
      .optional()
      .isIn(["free"])
      .withMessage("Invalid status value"),
  ],
  // Handled by controller
  register
);

// Route for user login using Firebase Auth and Realtime Database
router.post(
  "/login",
  [
    // Validate the request body
    body("idToken").not().isEmpty().withMessage("ID token is required"),
  ],
  // Handled by controller
  login
);

// Route for user logout
router.post(
  "/logout", // Handled by controller
  logout
);

// Route for deleting ALL user data
router.delete(
  "/users/:uid", // Handled by controller
  deleteUserAndData
);

// Route for getting user data from Firebase Auth and Realtime Database
router.get(
  "/users/:uid", // Handled by controller
  getUser
);

// Route for premium route that requires premium status to access it
router.get(
  "/premiumCheck",
  verifyToken,
  // Handled by controller
  premiumCheck
);

// Route for protected route that requires authentication to access it
router.get(
  "/protectedCheck",
  verifyToken,
  // Handled by controller
  protectedCheck
);

// Route for generating and storing Christmas images for the user
router.get(
  "/generateImage/:uid",
  verifyToken,
  // Handled by controller
  generateImageForUser
);

// Route for creating a Stripe Checkout session
router.post(
  "/create-checkout-session",
  // Handled by controller
  createCheckoutSession
);

// Route for refreshing the JWT token and setting a new cookie with the new JWT
router.post(
  "/refresh-token", // Handled by controller
  refreshToken
);

export default router;
