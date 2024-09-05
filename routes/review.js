const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync");
const ExpressError=require("../utils/ExpressError");
const {reviewSchema}=require("../schema");
const Review=require("../models/review"); 
const Listing=require("../models/listing");
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware");

const reviewController=require("../controllers/reviews");

//Post Review Route
router.post("/",validateReview,isLoggedIn,wrapAsync(reviewController.createReview));
  
  //Delete Review Route
  router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));
  
module.exports=router;