const express=require("express")
const {registerUser, loginUser, logout, forgotPassword, resetPassword, updatePassword, getUserDetails, getAllUser, updateProfile, getSingleUser, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser,authorizedRoles } = require("../middleware/auth");


const router=express.Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/password/update").put(isAuthenticatedUser,updatePassword);

router.route("/me").get(isAuthenticatedUser,getUserDetails);

router.route("/me/update").put(isAuthenticatedUser,updateProfile);

router.route("/admin/users").get(isAuthenticatedUser,authorizedRoles("admin"),getAllUser);

router
.route("/admin/users/:id")
.get(isAuthenticatedUser,authorizedRoles("admin"),getSingleUser)
.delete(isAuthenticatedUser,authorizedRoles("admin"),deleteUser)

module.exports=router;