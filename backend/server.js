const app=require("./app")
const connectDatabase=require("./config/database")


//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);
    process.exit(1);
})
//config
if(process.env.NODE_ENV!=="PRODUCTION"){

    require("dotenv").config({path:"backend/config/config.env"});
}
//connecting to database
connectDatabase()
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    })
})
