const ErrorHandler=require("../utils/errorHandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const URL=require("../models/urlModel")
const shortid=require("shortid");

exports.generateShortUrl=catchAsyncErrors(async(req,res,next)=>{
    const {longUrl}=req.body;
    if (!longUrl) {
        return next(new ErrorHandler("URL is required", 400));
    }

    const shortID=shortid();

    const url=await URL.create({
        shortId:shortID,
        redirectURL:longUrl,
        visitHistory:[],
        createdBy:req.user._id,
    });
    const baseURL = 'https://routify-ene3.vercel.app/';
    const shortUrl = `${baseURL}${shortID}`;

    res.status(201).json({
        success:true,
        shortUrl,
        url
    });

})
exports.editUrl=catchAsyncErrors(async(req,res,next)=>{
    
    const urlId = req.params.id;
    const { newShortId } = req.body; 

    const updatedUrl = await URL.findByIdAndUpdate(
        urlId,
        { shortId: newShortId },
        { new: true } // To return the updated document
    );
    if (!updatedUrl) {
        return next(new ErrorHandler("URL is required", 400));
    }
    res.status(200).json({ 
        success: true,
        data: updatedUrl 
    });
})

exports.getAllUrls = catchAsyncErrors(async (req, res, next) => {
    // Assuming the user's identifier is stored in req.user._id
    const userId = req.user._id;
  
    // Use find to get all URLs created by the logged-in user
    const userUrls = await URL.find({ createdBy: userId });
  
    res.status(200).json({
      success: true,
      userUrls,
    });
});



exports.deleteUrl= catchAsyncErrors(async(req,res,next)=>{
    const shortId=req.params.shortId;
    const result=await URL.findOneAndDelete({shortId});

    if(!result){
        return next(new ErrorHandler("Invalid URL", 400));
    }

    res.status(200).json({
        success:true,
        message:"Deleted Successfully!"
    })

});
exports.handleUrlRedirection =catchAsyncErrors(async (req, res, next) => {
    const { shortId } = req.params;
  
    try {
      // Find the original URL using the short ID
      const url = await URL.findOne({ shortId });
      const entry = await URL.findOneAndUpdate(
        {
          shortId,
        },
        {
          $push: {
            visitHistory: {
              timestamp: Date.now(),
            },
          },
        }
      );
      if (!url) {
        return res.status(404).json({
          success: false,
          message: 'URL not found',
        });
      }
   
      // Redirect to the original URL
      return res.redirect(url.redirectURL);
    } catch (error) {
      // Handle errors, e.g., log them and send an error response
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  });
