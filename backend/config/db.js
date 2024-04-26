import mongoose from "mongoose";

const db = mongoose.connect("mongodb://localhost:27017/motionBeat")
    .then(() => {
        console.log("Connection to DB established");     
    }) 
    .catch((err)=> {
        console.log("DB connection error");
        console.log(err);
    })

export default db; 