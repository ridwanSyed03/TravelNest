 const express=require("express");
 const router=express.Router();
 const wrapAsync=require("../utils/wrapAsync");
 const ExpressError=require("../utils/ExpressError");
 const {listingSchema}=require("../schema");
 const Listing=require("../models/listing");
 const {validateListing,isLoggedIn ,isOwner}=require("../middleware");

 const listingController=require("../controllers/listings");

 router
   .route("/")
   .get(wrapAsync(listingController.index))
   .post(isLoggedIn,validateListing,wrapAsync(listingController.createListing));

  //New Route
  router.get("/new",isLoggedIn,listingController.renderNewForm);


  router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
  .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
  
  
//Edit Route
 router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm)
);

module.exports=router;