const express=require("express");
const { generateShortUrl, getAllUrls, urlAnalytics, deleteUrl, editUrl, handleUrlRedirection } = require("../controllers/urlController");
const { isAuthenticatedUser } = require("../middleware/auth");


const  router=express.Router();

router.route("/url/new").post(isAuthenticatedUser,generateShortUrl);
router.route("/urls/me").get(isAuthenticatedUser,getAllUrls);
router.route("/delete/:shortId").delete(isAuthenticatedUser,deleteUrl);
router.route("/edit/:id").put(isAuthenticatedUser,editUrl);
router.route("/:shortId").get(handleUrlRedirection);

module.exports=router;