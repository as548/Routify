// created token and saving in cookie
const dotenv=require("dotenv");
dotenv.config({path:"backend/config/config.env"})
const sendToken=(user, statusCode,res)=>{
    const token=user.getJWTToken();

    //options for cookie
    // console.log('JWT_EXPIRE:', process.env.JWT_EXPIRE);
    // console.log('Expires:', new Date(Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000));
    const options={
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
            
        ),
        httpOnly:true,
    }

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    })
}

module.exports=sendToken;